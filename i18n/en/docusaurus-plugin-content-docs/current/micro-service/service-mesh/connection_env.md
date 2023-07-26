---
title: Inter-service communication variable injection
description: This article explains variable passing when a service is directly dependent
keywords:
- 服务间通信变量注入
- Service Mesh 变量注入
---

通信变量是指使用其他组件提供服务时的必要配置变量，比如数据库的用户名密码和通信地址，API 服务的认证方式和通信地址等等。标准化的设计场景中，成形的业务代码依赖的服务类型不能改变，但是实际依赖的服务可以改变，这种设计需要依靠以环境变量的方式注入配置信息。在 [组件间通信](./regist_and_discover) 文中用例就是依靠标准的变量注入实现服务动态依赖。

在组件开发过程中，我们推荐开发者使用环境变量的方式来定义与其他组件通信的相关配置，例如 spring boot 使用以下方式配置 jdbc 地址：

```
spring.datasource.url=jdbc:mysql://${MYSQL_HOST:127.0.0.1}:${MYSQL_PORT:3306}/${MYSQL_DATABASE:test}
spring.datasource.username=${MYSQL_USER}
spring.datasource.password=${MYSQL_PASSWORD}
```

经过如上定义后，我们其实定了一个规范，这个业务组件需要一个 Mysql 组件，且通过以上变量进行定义相关配置。后续我们使用什么组件来提供这个服务其实就是解耦合的，我们可以定义一个 Mysql 组件来提供，也可以定义一个 Tidb 组件来提供，最关键的是这些组件可以提供上述需要的变量信息。因此通信变量注入是组件依赖通信场景中一个非常有用的机制。

### 前提条件

1. 创建两个组件 A、B，其中 A 依赖 B 且需要获取相关的配置信息
2. 已了解 Rainbond 组件间通信的机制 参考 [组件间通信文档](./regist_and_discover)

### 操作流程

1. <b>定义连接地址变量</b>： 在组件 B（假设其为 Mysql 服务）的管理面板的端口管理页面下，我们可以为每个端口定义别名，点击端口设置中 _使用别名_ 部分，在弹出窗口中可以设置端口的别名，例如设置为 MYSQL，设置后会自动生成连接地址的两个变量 MYSQL_HOST 和 MYSQL_PORT。

2. <b>定义其他连接变量</b>： 在组件 B 的管理面板依赖管理页面下，有连接信息变量的定义和管理，其定义管理方式与环境变量一致。我们经过步骤 1 后进入面板会发现已经存在两个变量，MYSQL_HOST 和 MYSQL_PORT。我们可以继续定义其他变量比如 MYSQL_USER、MYSQL_PASSWORD 等。

3. <b>定义的变量属于环境变量的一部分在当前组件生效</b>：一些连接变量变量对于组件本身也是有用的，比如 Mysql 定义 MYSQL_USER、MYSQL_PASSWORD 等变量会作为 Mysql 初始化启动时初始化数据的定义变量。因此 Rainbond 中组件定义的连接信息也会作为环境变量的形式在当前组件生效，组件连接信息和环境变量可以相互转移。

4. <b>定义的变量注入到依赖当前组件的组件环境中</b>：此时我们在拓扑图中拖拽使 A 依赖 B, 然后更新 A 组件，完成后我们可以在 A 组件的环境下查看发现已经存在 MYSQL 相关的环境变量。

### 常见问题

- 连接信息与环境变量的区别

组件的连接信息和环境变量对于组件本身来说效果一致，都会作为环境变量在自身运行环境和插件环境中生效。不同点在于连接信息会注入到依赖当前组件的其他组件中。相当于它是 Public 的。

- 连接信息必须定义吗？

我们建议根据实际常见合理的定义连接信息。