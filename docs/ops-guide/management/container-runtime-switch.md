---
title: 容器 Runtime 切换
descrition: 该章节文档介绍如何切换 应用上云平台 的容器运行时
keywords:
- 切换容器运行时
- 应用上云平台 切换容器运行时
---
## 概述

在安装 应用上云平台 过程中，会识别你的 k8s 集群的底层容器运行时( `Docker` 或 `Containerd` )，将以此运行时作为 应用上云平台 所使用容器运行时，当集群环境同时拥有 `Docker` 和 `Containerd`两种容器运行时的时候，默认会使用 `Docker` 作为 应用上云平台 的容器运行时。 本文将指引你同时存在两种容器运行时时如何切换容器运行时。

## 前提

同时存在 Docker 和 Containerd 两种容器运行时，且希望指定 应用上云平台 所使用的容器运行时。

## 切换流程

### 识别逻辑

1. 检查 `operator` 容器中是否含有 `CONTAINER_RUNTIME` 环境变量，校验环境变量 `CONTAINER_RUNTIME` 的值是否为 `containerd`,是的话将会选择 `containerd` 作为 应用上云平台 容器运行时。不是的话则选择 `docker` 作为 应用上云平台 器运行时。
2. 没有 `CONTAINER_RUNTIME` 环境变量则检查 /run 目录下是否有 `docker.sock` 文件，如果有选择 `docker` 作为 应用上云平台 容器运行时，没有则使用 `containerd` 作为 应用上云平台 容器运行时。

### 已安装平台切换容器运行时

删除 DaemonSet 资源 `rbd-node` 和 `rbd-chaos` 让 `operator` 重新创建   
修改 Deployment 资源 `rainbond-operator`

```bash
kubectl delete ds rbd-node -nrbd-system
kubectl delete ds rbd-chaos -nrbd-system
kubectl edit deployment rainbond-operator -n rbd-system
```

找到 `image` 和  `imagePullPolicy`, 在其中间的部位添加上控制容器运行时的环境变量。  
value 值填写你想使用的容器运行时（ docker , containerd ）

```bash
image: registry.cn-hangzhou.aliyuncs.com/xxx/rainbond-operator:xxx
env:
- name: CONTAINER_RUNTIME
  value: "containerd"
imagePullPolicy: IfNotPresent
```

修改完成后 operator 会重新创建 node 和 chaos , 此时可以通过查看 node 和 chaos 的 yaml文件来检查是否更换成功。

```bash
kubectl get ds rbd-chaos -n rbd-system -oyaml
kubectl get ds rbd-node -n rbd-system -oyaml
```

使用 docker 容器运行时的话，chaos 和 node 的 args 里会有如下一条参数, containerd 则没有如下参数。

```bash
- --container-runtime=docker
```