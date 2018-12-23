---
title: 应用市场
summary: 应用市场分享
toc: true
---

## 应用的创造与分享


应用市场定义了支持大型分布式的数字化业务系统的标准云原生应用模型、它可以包含1-N个服务组件，模型包含其中每个服务组件资源及配置，插件资源及配置，拓扑关系、部署关系等。精心制作完成即可一键发布、一键安装。
在Rainbond中，应用是Rainbond可管理的最小服务单元，用户可以将多个服务组成一个复杂的业务系统，这套业务系统可以对外提供服务，也可以分享给其他组织独立部署，你可以将整套业务系统打包成一个`云市应用`，并选择将该应用发布到`团队`、`公司`、`好雨公有云市`。分享后的应用可供团队、公司或云市的用户一键安装部署完整的服务体系，实现标准化得一键交付部署。分享到不同的范围，可见性也有所不同，具体可见范围如下：

* 团队：只有当前团队下的成员可见
* 公司：当前企业下的所有成员可见
* 好雨云市：连接好雨公有云市的所有企业及用户可见

我们将一个`应用`内完整的业务解决方案集成体整体打包成一个`云市应用`，发布成功后，其他用户在创建应用时可以选择`从应用市场安装`的方式`一键安装部署`完整的服务体系，实现标准化得一键交付部署。

####  1.1 应用发布流程

**选择要分享的应用，点击`发布到市场`。**

> 提示：发布应用时，组内所有服务的状态必须为运行中

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/1544492992679.jpg" width='100%' />

**完善应用信息**

> 填写应用基本信息

* 应用名：要发布的应用名称
* 版本：应用发布版本  (当同一应用多次发布时，如果版本号相同，则会覆盖已发布的该版本应用)
* 分享范围：发布的可见范围
* 应用说明：应用的简单描述
* 图标：应用LOGO

<img src="https://static.goodrain.com/images/docs/3.7/user-manual/share-2.jpg" width='100%' />

> 填写每个服务的配置信息

* 环境变量：编辑该服务默认的环境变量，勾选`可修改`，则其他用户安装此应用后可编辑这个环境的值，反之不可编辑。
* 伸缩规则：定义该服务可伸缩的最大最小节点数，及节点伸缩步长，最小安装内存限制。

<img src="https://static.goodrain.com/images/docs/3.7/user-manual/share-3.jpg" width='100%' />

**提交发布任务**

完善应用信息后，点击`提交`，向数据中心发起同步任务。由数据中心的`rbd-chaos`组件对应用中的每一个服务进行数据同步。如果是发布到`好雨公有云市`，数据中心会将应用所需的镜像或源码包同步到好雨公有仓库及FTP服务器存储，并将应用的模版数据保存到Console数据库并发送到好雨云市保存。如果是发布到`团队`或`公司`，则应用所需的镜像或源码包同步到本数据中心，并将应用的模版数据保存在Console数据库。

<img src="https://static.goodrain.com/images/docs/3.7/user-manual/share-4.jpg" width='100%' />

**确认发布**

当应用中的所有服务及插件全部完成同步后，点击`确认发布`，即可完成应用发布。发布成功后可在`创建应用`下的`从应用市场安装`中对应的范围下看到你发布的应用。

<img src="https://static.goodrain.com/images/docs/3.7/user-manual/share-5.jpg" width='100%' />



<img src="https://static.goodrain.com/images/docs/3.7/user-manual/share-6.jpg" width='100%' />


**上架应用**

如果想要可以在公有云市中找到发布的应用，那么需要在云市中上架该应用。上架后的应用可以被连接好雨公有云市的所有企业及用户看到。

- 登录[Goodrain](https://www.goodrain.com/)官网,进入 企业中心 > 应用市场 > 自有市场 > 分享应用管理。
> 登录的时候需要用该企业管理员的Rainbond账号登陆。

- 信息编辑。使用Markdown编写应用的详细介绍，完善应用`README`，让用户可以更好地去了解使用应用。

<img src="https://static.goodrain.com/images/docs/3.7/user-manual/market.gif" width='100%' />

- 设置价格。

<img src='/uploads/default/original/2X/3/3e0aa3de5b0b0970a171680fc624fe4c6e3377d6.jpg'>

- 上架。

<img src='/uploads/default/original/2X/5/5cdfffcd677910f5fea98215efeaeb8af7e2b935.gif'>
 
完成上架之后，我们就可以在云端中找到你上架的应用。

####  1.2 应用安装

应用下载同步是在互联网环境下的一种跨平台应用交付方式，通过此方式可以快速获取优秀的、成熟的通用解决方案，例如Mysql、TiDB等数据库方案，Gitlab、Jenkins等IT工具。也可以通过此方式交付商业业务系统给你的用户。当前Rainbond默认提供了与好雨云市的互联用例。

在Rainbond控制台中点击左侧导航栏进入`内部市场`，根据你的需求选择应用或插件，点击`云端同步`即可看到在好雨公有云市发布的应用。应用名称后有`(官方发布)`字样是我们好雨官方发布或推荐的应用。点击应用名称可查看应用的详细介绍。

选择要下载的应用或插件点击后方的`下载`将`好雨公有云市`应用或插件下载到你的`内部市场`中。下载完成后，方可在方可在 `从应用市场安装`直接一键安装本应用。如果是插件可在左侧导航栏`我的插件`中安装管理你的插件。

> 点击内部市场应用后方的`云端更新`，可将好雨云市中该应用的最新版本下载更新到你的内部市场。

<img src="https://static.goodrain.com/images/docs/3.7/user-manual/download.gif" width='100%' />


### 一、使用好雨公有云市在线交付

对于有在线环境的用户，可以直接使用好雨公有云市进行业务交付，将业务系统发布到好雨公有云市，用户可在公有云市直接下载一件安装整套业务系统。
具体的发布应用到公有市场和下载安装应用，请参考文章 <a href="./publish_and_install.html" target="_blank" >应用发布与安装</a>

### 二、使用导入导出离线交付

考虑到离线环境的应用交付，我们RainBond设计实现了应用到离线导入和导出功能。复杂的业务系统可以借助网络或离线应用包快速的在不同的环境中交付，安装速度和易用性远远超出传统的交付。除了标准Rainbond应用模型以外，同时还支持导出docker-compose模型脱离Rainbond平台便捷交付。

### 2.1 应用导出
 

为了让用户能够更好的管理自己的应用，快捷简单交付业务，我们为平台设计了应用导入导出功能，该功能允许用户通过简单的几次点击，就可以将内部市场的应用打包为一个压缩文件，并可以下载到本地。在导出的时候，支持两种格式，一种为`rainbond-app`格式，另一种为`docker-compose`格式。

> 云市同步的应用不支持导出compose文件，只支持导出`rainbond-app`格式。

#### 2.1.1 格式说明

1. `rainbond-app`：为了在多个云帮之间迁移应用而设计，即在A平台导出后，可以导入到B平台，但导出后的文件不能直接运行，导出的文件是一个zip格式的压缩包，其中包含了该应用的描述信息、每个组件的镜像或源码包等。

2. `docker-compose`：为了快速交付而设计，当我们把云帮上的应用交付给用户时，就需要让应用具备脱离平台可运行的能力，这样才能避免为了使用一个应用而不得不先部署平台的问题，`docker-compose`导出格式可以在安装有[docker](https://www.docker.com/)和[docker-compose](https://docs.docker.com/compose/)的环境中运行，假设我们现在导出了一个`docker-compose`文件且名为`web.tar`，那么执行以下命令运行它：

````
    tar -xf web.tar
    ./web/run.sh
````

​      使用这种可运行的格式有以下需要注意的事项：

* 依赖环境：应用的运行需要依赖[docker](https://www.docker.com/)和[docker-compose](https://docs.docker.com/compose/)，如果您的系统中没有安装它们，`run.sh`脚本将会自动为您安装，所以请保证您的系统能够连接互连网，否则请手动安装这两个工具。

* 端口是否可用，假如我们导出了一个WEB应用，如果它在启动时需要监听80端口，则物理机上的80端口必须是空闲状态，否则会因为端口冲突而导致应用启动失败。

 

#### 2.1.2 应用导出

应用导出是由数据中心`rbd-chaos`组件将应用所需的镜像或slug包与定义元数据一起压缩成一个zip或tar文件，将文件放到指定目录下供用户下载。
* 登录Rainbond，并进入`内部市场`页面。
* 找到想要导出的应用，并点击该应用版块上的`导出应用`

<img src="https://static.goodrain.com/images/docs/3.7/user-manual/export-1.jpg" width='100%' />

* 点击导出后，导出状态会显示为导出中

<img src="https://static.goodrain.com/images/docs/3.7/user-manual/export-2.jpg" width='100%' />

* 完成导出后，点击`下载`即可将文件下载到本地，导出的文件存放在数据中心下的/grdata/app/rainbond-app或/grdata/app/docker-compose下

<img src="https://static.goodrain.com/images/docs/3.7/user-manual/export-3.jpg" width='100%' />



#### 2.1.3 批量导出

云帮导出的应用包文件会很大，如果网络不好的情况下，我们建议您直接在对应的数据中心的服务器上进行操作。

每个应用在打包完成后，都会存储在某个数据中心的`/grdata/app`目录中，利用这一点，我们可以批量导出平台中的应用。

1. 登录云帮，并进入“内部市场”页面。

2. 找到想要导出的应用，并依次点击它们的导出按钮，等待平台打包完成即可。

3. 等待平台打包完成后，登录到数据中心对应的服务器，假设我们要把所有导出的应用包复制到`/mnt/sdc1/`目录中，执行以下命令：

   ```
       find /grdata/app -maxdepth 2 -name '*.zip' | xargs -I FF cp FF /mnt/sdc1/
   ```

 

### 2.2、应用导入

应用导入任务发起后，由数据中心的`rbd-chaos`组件将用户上传的RainbondAPP文件解压，保存定义的元数据及镜像或slug包，用于安装构建应用时使用。
对于导出的应用，您也可以通过`离线导入应用`功能将应用导入到内部市场。在Rainbod左侧导航栏进入`内部市场`，点击`离线导入应用`，上传你的RainbondAPP文件开始导入。

应用导入有以下两种方式：

1. 如果你的网络情况不乐观的情况下，我们建议您直接在对应的数据中心的服务器上进行操作。你可以将RainbondAPP文件复制到数据中心管理节点上我们提供的目录下
2. 如果网络情况较好，可以直接通过网络上传文件至数据中心指定目录下

开启`自动识别`，Rainbond自动识别已上传RainbondAPP文件，选中要导入的APP(支持批量导入)，点击`确认导入`向数据中心发送导入请求并开始导入应用。

具体操作如下：

<img src="https://static.goodrain.com/images/docs/3.7/user-manual/import.gif" width='100%' />



应用导入成功后，可在内部市场看到你导入的应用。

<img src="https://static.goodrain.com/images/docs/3.7/user-manual/import-1.jpg" width='100%' />


### 三、应用更新

对于从公有云市安装回来的应用，如果分享应用的用户对其分享到公有云市的应用有小版本更新（其应用下组件版本有更新），我们会在控制台对您的安装回来的应用进行更新提醒，如果您更新了内部应用市场应用后，我们会在您安装到本地控制台的应用进行应用升级提醒。
流程图如下：

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/3.7.1/app_upgrade.png" width='100%' />
 

具体流程如下：

1.安装公有云市应用，您可以从公有云市安装，亦可从内部应用市场安装，在创建应用中选择`从应用市场安装`，并搜索您想要安装的应用，安装即可。


<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/3.7.1/app_install.gif" width='100%' />


2.当其他用户对其分享到公有云市的应用进行小版本升级（即将其应用下的组件进行版本升级），您会在点击`云端同步`的时候显示出来，提示您当前应用是否可更新，如果可更新，您可以通过`云端更新`或`更新新版本`,即可对当前内部应用市场应用进行更新操作。


<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/3.7.1/app_update.gif" width='100%' />


3.当您对内部应用市场应用进行更新升级后，在您本地控制台安装的应用还未进行升级，在您查看服务详情时，我们会对您的服务进行查询是否可更新，如果可更新，在详情页会显示构建按钮，以便操作。


<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/1544507806029.jpg" width='100%' />


#### 3.1、判断依据(实现原理)

当用户将其租户下的一组应用进行打包分享的时候，我们会对其组内每个组件进行标识操作，对应用的小版本进行累加操作，并在公有云市进行存储，从公有云市同步到内部应用市场的时候，将该应用的数据及其下面的所有组件信息在内部应用市场中进行存储，通过其中小版本和内部应用市场存储的该应用的小版本进行判断该内部应用市场中的应用是否可更新，其中小版本在进行分享操作时，每次分享都会对其值进行累加，在同步到内部应用市场的时候在服务构建源中存储小版本以进行更新判断，并通过返回的应用数据中的字段进行唯一组件的判断，防止在存储依赖关系时关系紊乱；
从市场安装回来的应用判断更新依据是通过该组件版本与服务构建源中的组件版本进行比对，以此来判断该组件是否可更新。

内部应用市场的应用更新是将公有云市应用重新同步到内部市场中（即将云市应用的数据在内部市场更新）
本地控制台的应用更新是将内部市场的应用数据在本地更新，并向数据中心发送请求，拉取最新的镜像进行部署。

#### 3.2、版本定义
应用大版本：一组应用打包， 在分享的过程中，用户会手动输入一个版本号，即为该分享到公有云市应用的大版本，大版本的变化根据用户的改变而定，当用户再次分享该应用，并改变了大版本时，分享到公有云市场的应用和之前分享的不是同一个，例如：mysql的5.5.46；

应用小版本：该分享到公有云市的应用，会生成一个小版本保存到公有云市中，每次用户对该应用进行重新分享时，小版本会进行数值累加；

组件版本：一组应用下的每个组件，当其每次重新部署时，会生成一个部署版本，即为该组件的版本