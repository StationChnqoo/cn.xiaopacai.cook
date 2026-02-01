export const DropdownMenus = [
  {
    title: '关于作者',
    content: ['小趴菜菜（cn.xiaopacai.cook）'].join('\n'),
  },
  {
    title: '特别鸣谢',
    content: [
      '1. 感谢@YunYouJun云游君作者，产品的移动端设计和数据来源均来自于其开源项目：https://github.com/YunYouJun/cook',
      '2. 感谢tableconvert.com提供CSV转JSON的支持',
    ].join('\n'),
  },
  {
    title: '隐私政策',
    content:
      '本应用不收集、不存储任何用户个人信息，所有数据均存储在本地设备中。如有涉及需要联网的功能，均采用匿名方式进行数据传输，确保用户隐私安全。',
  },
  {
    title: '更新记录',
    content: '2026-01-08 第一版完成',
  },
];

export enum TinyMenuIds {
  RestoreBuy,
  Upgrade,
  Service24,
  Advice,
  Apps,
}

export const TinyMenus = [
  // {
  //   value: TinyMenuIds.RestoreBuy,
  //   label: '恢复购买',
  //   src: require('@src/assets/images/my/vip.png'),
  // },
  {
    value: TinyMenuIds.Upgrade,
    label: '在线升级',
    src: require('@src/assets/images/my/upgrade.png'),
  },
  {
    value: TinyMenuIds.Service24,
    label: '在线客服',
    src: require('@src/assets/images/my/service24.png'),
  },
  {
    value: TinyMenuIds.RestoreBuy,
    label: '意见反馈',
    src: require('@src/assets/images/my/advice.png'),
  },
  {
    value: TinyMenuIds.Apps,
    label: '更多应用',
    src: require('@src/assets/images/my/apps.png'),
  },
];
