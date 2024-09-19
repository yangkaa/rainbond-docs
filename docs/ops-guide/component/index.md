---
title: 平台组件架构
description: 本文主要介绍完整部署应用上云平台所需要的所有服务组件，帮助用户了解应用上云平台技术栈与组件架构。
keywords: 
- 应用上云平台 平台组件架构
---

本文主要介绍完整部署应用上云平台所需要的所有服务组件，帮助用户了解 应用上云平台 技术栈与组件架构。

目前版本，系统组件生命周期由 `Kubernetes` 和 `应用上云平台-Operator` 共同维护和管理。

应用上云平台 由 Console(控制台) + Region(集群端) + Kubernetes(RKE) 组成。

## Docker

使用 应用上云平台 脚本安装的 Docker 默认版本为 `20.10.9`

## Kubernetes (RKE)
使用 应用上云平台 基于主机安装的 Kubernetes 版本为 `v1.23.10` ，更多详情请参阅 [RKE](https://docs.rancher.cn/rke/) 文档。

## 应用上云平台
### Console 控制台组件概述

控制台部署目前有 2 种部署方式：

1. Allinone，以 Docker Run 方式运行在服务器上。 
2. Helm 部署，以 POD 运行在 Kubernetes 中。

### Region 集群端组件概述

介绍 应用上云平台 各个组件的版本信息以及组件的作用。

以下是部署在 Kubernetes 集群中的，以 POD 运行，通过 `kubectl get pod -n rbd-system` 命令可以查看。

|组件|版本|说明|控制器类型|
|---|-----|---------------|---|
|[rainbond-operator](./rainbond-operator)|5.x|维护 应用上云平台 组件的配置与运行状态|Deployment|
|rbd-api|5.x|API服务，提供 Region 端接口|Deployment|
|rbd-chaos|5.x|应用构建服务，提供源码，Docker镜像等方式创建应用|Daemonset|
|rbd-db|8.0|数据库服务，支持MySQL `5.6` `5.7` `8.0`|Statefulset|
|rbd-etcd|3.3.18|`etcd`存储集群的元数据信息，集群状态和网络配置|Statefulset|
|rbd-eventlog|5.x|事件处理与日志汇聚服务|Statefulset|
|rbd-gateway|5.x|应用的全局网关|Daemonset|
|[rbd-hub](./rbd-hub)|v2.6.2|基于 [Docker Registry ](https://docs.docker.com/registry/)封装，提供镜像存储服务|Deployment|
|rbd-mq|5.x|消息队列服务|Deployment|
|nfs-provisioner|v2.2.1|NFS 存储服务|Statefulset|
|rbd-node|5.x|集群监控与控制|Daemonset|
|rbd-resource-proxy|1.19|源码构建仓库服务|Deployment|
|rbd-webcli|5.x|提供应用以 Web 方式进入容器命令行|Deployment|
|rbd-worker|5.x|应用操作与服务处理|Deployment|
