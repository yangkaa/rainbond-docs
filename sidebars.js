/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    {
      type: 'category',
      label: '用户端使用手册',
      link: {
        type: 'doc',
        id: 'use-manual/index'
      },
      items: [
        {
          type: 'category',
          label: '应用管理',
          link: {
            type: 'doc',
            id: 'use-manual/app-manage/index'
          },
          items: [
            {
              type: 'category',
              label: '应用总览',
              link: {
                type: 'doc',
                id: 'use-manual/app-manage/overview/index'
              },
              items: [
                'use-manual/app-manage/overview/app-topology',
                'use-manual/app-manage/overview/operation',
                'use-manual/app-manage/overview/auto-build',
              ]
            },
            'use-manual/app-manage/share-app',
            {
              type: 'doc',
              label: '网关管理',
              id: 'use-manual/app-manage/gateway',
            },
            {
              type: 'category',
              label: '应用升级',
              link: {
                type: 'doc',
                id: 'use-manual/app-manage/app-upgrade/index'
              },
              items: [
                'use-manual/app-manage/app-upgrade/upgrade-app',
              ]
            },
            {
              type: 'doc',
              label: '资源管理',
              id: 'k8s_resources/index',
            },
            'use-manual/app-manage/app-bak',
            'use-manual/app-manage/config-group',
          ]
        },
        {
          type: 'category',
          label: '网关管理',
          link: {
            type: 'doc',
            id: 'use-manual/team-manage/gateway/index'
          },
          items: [
            {
              type: 'category',
              label: '访问策略管理',
              link: {
                type: 'doc',
                id: 'use-manual/team-manage/gateway/rules/index'
              },
              items: [
                'use-manual/team-manage/gateway/rules/domain',
                'use-manual/team-manage/gateway/rules/tcpip',
              ]
            },
            'use-manual/team-manage/gateway/certs/index',
          ]
        },
        {
          type: 'category',
          label: '插件管理',
          link: {
            type: 'doc',
            id: 'use-manual/team-manage/plugin-manage/index'
          },
          items: [
            'use-manual/team-manage/plugin-manage/plugin-design-develop',
            'use-manual/team-manage/plugin-manage/new-plugin',
            'use-manual/team-manage/plugin-manage/tcm-plugin',
          ]
        },
        {
          type: 'doc',
          label: '组件库',
          id: 'component_library/index',
        },
        'use-manual/team-manage/apply_record',
        'use-manual/team-manage/putaway',
        'use-manual/team-manage/team_manage',
        // {
        //   type: 'category',
        //   label: '部署服务组件',
        //   link: {
        //     type: 'doc',
        //     id: 'use-manual/component-create/index'
        //   },
        //   items: [
        //     'use-manual/component-create/creation-process',
        //     {
        //       type: 'category',
        //       label: '基于源代码创建组件',
        //       link: {
        //         type: 'doc',
        //         id: 'use-manual/component-create/language-support/index'
        //       },
        //       items: [
        //         {
        //           type: 'category',
        //           label: 'Java语言参考',
        //           link: {
        //             type: 'doc',
        //             id: 'use-manual/component-create/language-support/java/index'
        //           },
        //           items: [
        //             'use-manual/component-create/language-support/java/java-maven',
        //             'use-manual/component-create/language-support/java/java-multi-module-build',
        //             'use-manual/component-create/language-support/java/java-jar',
        //             'use-manual/component-create/language-support/java/java-war',
        //             'use-manual/component-create/language-support/java/java-gradle',
        //             'use-manual/component-create/language-support/java/java-maven-de',
        //             'use-manual/component-create/language-support/java/tomcat-redis-session',
        //             'use-manual/component-create/language-support/java/webapp-runner'
        //           ]
        //         },
        //         'use-manual/component-create/language-support/dockefile',
        //         'use-manual/component-create/language-support/python',
        //         'use-manual/component-create/language-support/php',
        //         'use-manual/component-create/language-support/netcore',
        //         'use-manual/component-create/language-support/golang',
        //         'use-manual/component-create/language-support/html',
        //         'use-manual/component-create/language-support/nodejs',
        //         'use-manual/component-create/language-support/nodejs-static',
        //         'use-manual/component-create/language-support/slugignore',
        //         'use-manual/component-create/language-support/procfile',
        //         'use-manual/component-create/language-support/rainbondfile',
        //         'use-manual/component-create/language-support/envs'
        //       ]
        //     },
        //     {
        //       type: 'category',
        //       label: '基于Docker镜像创建组件',
        //       link: {
        //         type: 'doc',
        //         id: 'use-manual/component-create/image-support/index'
        //       },
        //       items: [
        //         'use-manual/component-create/image-support/docker-compose',
        //         'use-manual/component-create/image-support/image'
        //       ]
        //     },
        //     {
        //       type: 'category',
        //       label: '接入外部服务作为第三方组件',
        //       link: {
        //         type: 'doc',
        //         id: 'use-manual/component-create/thirdparty-service/index'
        //       },
        //       items: [
        //         'use-manual/component-create/thirdparty-service/thirdparty-define',
        //         'use-manual/component-create/thirdparty-service/thirdparty-design',
        //         'use-manual/component-create/thirdparty-service/thirdparty-create'
        //       ]
        //     },
        //     {
        //       type: 'category',
        //       label: '本地文件创建组件',
        //       link: {
        //         type: 'doc',
        //         id: 'use-manual/component-create/package-support/index'
        //       },
        //       items: [
        //         'use-manual/component-create/package-support/jar-war',
        //       ]
        //     },
        //     'kubernetes-native-guide/helm/export-chart',
        //   ]
        // },
        // {
        //   type: 'category',
        //   label: '组件管理',
        //   link: {
        //     type: 'doc',
        //     id: 'use-manual/component-manage/index'
        //   },
        //   items: [
        //     {
        //       type: 'category',
        //       label: '组件总览',
        //       link: {
        //         type: 'doc',
        //         id: 'use-manual/component-manage/overview/index'
        //       },
        //       items: [
        //         'use-manual/component-manage/overview/basic-operation',
        //         'use-manual/component-manage/overview/service-properties',
        //       ]
        //     },
        //     {
        //       type: 'category',
        //       label: '组件监控',
        //       link: {
        //         type: 'doc',
        //         id: 'use-manual/component-manage/monitor/index'
        //       },
        //       items: [
        //         'use-manual/component-manage/monitor/service-monitor',
        //         'use-manual/component-manage/monitor/custom-monitor',
        //       ]
        //     },
        //     'use-manual/component-manage/service-log',
        //     {
        //       type: 'category',
        //       label: '组件伸缩',
        //       link: {
        //         type: 'doc',
        //         id: 'use-manual/component-manage/automatic-telescoping/index'
        //       },
        //       items: [
        //         'use-manual/component-manage/automatic-telescoping/service-auto-scaling'
        //       ]
        //     },
        //     {
        //       type: 'category',
        //       label: '组件环境配置',
        //       link: {
        //         type: 'doc',
        //         id: 'use-manual/component-manage/env/index'
        //       },
        //       items: [
        //         'use-manual/component-manage/env/advanced-env'
        //       ]
        //     },
        //     {
        //       type: 'category',
        //       label: '组件存储',
        //       link: {
        //         type: 'doc',
        //         id: 'use-manual/component-manage/custom-volume/index'
        //       },
        //       items: [
        //         'use-manual/component-manage/custom-volume/service-volume-custom'
        //       ]
        //     },
        //     'use-manual/component-manage/service-port-domain',
        //     'use-manual/component-manage/service-plugins',
        //     {
        //       type: 'category',
        //       label: '组件构建源',
        //       link: {
        //         type: 'doc',
        //         id: 'use-manual/component-manage/build-source/index'
        //       },
        //       items: [
        //         'use-manual/component-manage/build-source/change_source_type'
        //       ]
        //     },
        //     'use-manual/component-manage/other/index'
        //   ]
        // },
        {
          type: 'category',
          label: '团队管理',
          link: {
            type: 'doc',
            id: 'use-manual/team-manage/index'
          },
          items: [
          ]
        },
        // {
        //   type: 'category',
        //   label: '应用商店',
        //   link: {
        //     type: 'doc',
        //     id: 'use-manual/app-store-manage/index'
        //   },
        //   items: [
        //     'use-manual/app-store-manage/install-app',
        //     'use-manual/app-store-manage/share-app',
        //     'use-manual/app-store-manage/export-non-container-package',
        //   ]
        // },
      ]
    },
    {
      type: 'category',
      label: '管理端使用手册',
      link: {
        type: 'doc',
        id: 'admin-manual/index'
      },
      items: [
        'admin-manual/app-market',
        'admin-manual/team',
        'admin-manual/cluster',
        'admin-manual/user',
        'admin-manual/review',
        'admin-manual/log',
        {
          type: 'category',
          label: '企业设置',
          link: {
            type: 'doc',
            id: 'admin-manual/enterprise/index'
          },
          items: [
            'admin-manual/enterprise/basic-settings',
            'admin-manual/enterprise/admin-manage',
            'admin-manual/enterprise/default-quota',
            'admin-manual/enterprise/custom-config',
            'admin-manual/enterprise/component-version',
            'admin-manual/enterprise/tag-manage',
            'admin-manual/enterprise/quota-apply'
          ]
        }
      ]
    },
    {
      type: 'category',
      label: '运维手册',
      link: {
        type: 'doc',
        id: 'ops-guide/index'
      },
      items: [
        {
          type: 'category',
          label: '平台组件概述',
          link: {
            type: 'doc',
            id: 'ops-guide/component/index'
          },
          items: [
            'ops-guide/component/rainbond-operator',
            'ops-guide/component/rbd-hub',
          ]
        },
        {
          type: 'category',
          label: '高级运维',
          link: {
            type: 'doc',
            id: 'ops-guide/management/index'
          },
          items: [
            'ops-guide/management/resource-cleanup',
            'ops-guide/management/data-migration',
            'ops-guide/management/container-runtime-switch',
            'ops-guide/management/change-gateway',
            'ops-guide/management/buildkit-args',
            'ops-guide/management/custom-shared-storage',
            'ops-guide/management/switch-registry',
            'ops-guide/management/reset-admin-password',
          ]
        },
        {
          type: 'category',
          label: 'CLI 命令行',
          link: {
            type: 'doc',
            id: 'ops-guide/tools/index'
          },
          items: [
            'ops-guide/tools/grctl',
          ]
        },
        {
          type: 'category',
          label: '扩展',
          link: {
            type: 'doc',
            id: 'expand/index'
          },
          items: [
            'expand/practices/app-dev/connect-api',
            'expand/practices/app-dev/auto-schema',
            'expand/practices/app-dev/data-initialization',
          ]
        },
      ]
    },
    {
      type: 'category',
      label: '常见问题',
      link: {
        type: 'doc',
        id: 'troubleshooting/index'
      },
      items: [
        {
          type: 'category',
          label: '安装问题',
          link: {
            type: 'doc',
            id: 'troubleshooting/installation/index'
          },
          items: [
            'troubleshooting/installation/helm',
          ]
        },
        {
          type: 'category',
          label: '使用问题',
          link: {
            type: 'doc',
            id: 'troubleshooting/use/index'
          },
          items: [
            'troubleshooting/use/build',
            'troubleshooting/use/run',
            'troubleshooting/use/gateway',
            'troubleshooting/use/cluster-connect',
            'troubleshooting/use/console-exception',
            'troubleshooting/use/cluster-component',
            'troubleshooting/use/other',
          ]
        },
      ],
    },
  ],
  api: [
    'api/Intro',
    {
      type: 'category',
      label: '企业API',
      items: [
        {
          type: 'autogenerated',
          dirName: 'api/enterprise'
        }
      ]
    },
    {
      type: 'category',
      label: '团队API',
      items: [
        {
          type: 'autogenerated',
          dirName: 'api/team',
        },
      ]
    },
    {
      type: 'category',
      label: '集群API',
      items: [
        {
          type: 'autogenerated',
          dirName: 'api/region',
        },
      ]
    },
    {
      type: 'category',
      label: '应用API',
      items: [
        {
          type: 'autogenerated',
          dirName: 'api/application',
        },
      ]
    },
    {
      type: 'category',
      label: '网关API',
      items: [
        {
          type: 'autogenerated',
          dirName: 'api/gateway',
        },
      ]
    },
    {
      type: 'category',
      label: '用户API',
      items: [
        {
          type: 'autogenerated',
          dirName: 'api/user',
        },
      ]
    },
  ],
};

module.exports = sidebars;
