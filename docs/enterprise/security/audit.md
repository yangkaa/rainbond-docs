---
title: 操作审计
description: 介绍平台上如何进行操作审计和登录审计。
---

操作审计是一种关键的安全功能，旨在记录和监控系统中发生的用户操作和登录活动。通过阅读本文档，用户将了解操作审计的定义和目的，认识到操作审计的重要性和优势，并掌握如何使用操作审计功能进行监控、追溯和保护系统的关键操作和登录活动。

## 主要功能

通过记录用户在企业平台上的操作和登录活动，操作审计可以提供以下好处：

1. 追溯能力：操作审计日志记录用户行为和操作详情，有助于追溯和分析特定操作的发生和相关参与者。

2. 异常检测：操作审计可以用于监控潜在的未经授权访问、异常活动或安全威胁，及时采取相应的安全措施。

3. 合规性要求：对于许多行业，操作审计是满足合规性要求的必要措施之一，以确保数据的安全和隐私。

目前 Rainbond 支持记录用户的操作日志和登录日志，以下篇幅将详细介绍这两部分功能。

### 操作日志

![description](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/enterprise-app/audit/operate_log.jpg)

操作日志记录功能旨在记录用户在 Rainbond 上的操作活动，包括但不限于以下内容：

- 用户行为：记录用户执行的具体操作，如组件创建、编辑、删除、网关策略的编辑以及各类平台配置的更改行为。

- 操作详情：展示用户操作前后配置变化详情。误操作后可快速找回历史配置。

- 操作时间：记录操作发生的日期和时间，精确到秒级。

- 操作类型：标识操作的类型，例如企业管理、团队管理、应用管理、组件管理、本地组件库管理等。

### 登录日志

![description](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/enterprise-app/audit/login_log.jpg)

登录日志旨在记录用户登录的功能用于跟踪和记录用户登录企业平台的活动，包括以下信息：

- 登录时间：记录用户登录的日期和时间。

- 登录 IP ：记录用户登录时使用的IP地址。

- 登录设备：记录用户登录时使用的设备或客户端信息，如操作系统、浏览器等。

- 活跃时长：记录用户某次登录的实际使用时长。

## 使用手册

### 管理操作日志

平台操作审计目前仅有企业管理员和团队管理员可见，其中企业管理员可以看到平台所有的操作日志和登录日志。团队管理员可以看到该团队下的操作日志。

**企业管理员：**

1. 点击 `平台管理`，选择左侧边栏 `日志/审计`，可以看到 `操作日志`。

2. 点击 `操作日志`，可以查看到操作用户、操作类型、操作时间、操作内容以及操作详情等信息。

3. 此时可以根据日期范围、用户、操作类型等条件进行筛选，也可以直接根据操作内容进行筛选。对于组件类型的操作，用户可以直接跳转到对应组件或对应应用。对于配置更改等操作，则可以直接在操作详情，查看到历史版本和当前版本配置。

**团队管理员：**

1. 进入团队视图，点击 `管理`。

2. 在 `动态` 这个 Tab 页中，可以看到该团队下应用或组件的操作日志及详情。

### 管理登录日志

1. 点击 `平台管理`，选择左侧边栏 `日志/审计`，可以看到 `登录日志`。

2. 点击 `登录日志`，可以查看到用户、客户端IP、登录时间、登录设备以及活跃时长等信息。

3. 此时可以根据日期范围、用户等条件进行筛选。

### 最佳实践

在使用操作审计功能时，参考以下建议可以帮助您更好的使用该功能，确保操作活动的安全性和合规性。

- 精细化权限控制：在使用操作审计功能时，精细化权限控制是非常重要的。根据用户的角色和职责，分配适当的权限级别可以有效地限制用户的访问范围和操作权限。通过细分权限及对权限进行定期审查和更新，确保权限的及时回收和调整，从而保证平台的安全性。

- 定期审查操作审计日志：定期审查操作审计日志是保证操作活动安全性和合规性的关键步骤。通过对日志的定期审查，可以及时检测和发现异常操作或潜在的违规行为。审查操作审计日志时，需要关注操作的类型、时间、执行者以及操作的目的和结果。如果发现任何异常行为或违规操作，必须立即采取适当的措施进行调查和应对。

- 定期评估操作审计功能：定期评估操作审计功能的有效性和完整性是确保其持续性和有效性的关键。通过定期评估，可以确定操作审计功能是否满足组织的需求和合规要求。评估包括检查日志记录的完整性、准确性和可追溯性，确保日志未被篡改或删除。同时，还需要评估操作审计功能是否涵盖了关键操作和事件，并能够提供足够的信息用于安全审计和合规性验证。根据评估结果，必要时进行调整和改进操作审计功能，以确保其始终处于良好的运行状态。