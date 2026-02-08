import {Option} from './t';

/**
 * 素菜
 */
export const VegetableOptions: Option[] = [
  {
    name: '土豆',
    emoji: '🥔',
  },
  {
    name: '胡萝卜',
    emoji: '🥕',
  },
  {
    name: '花菜',
    emoji: '🥦',
  },
  {
    name: '白萝卜',
    emoji: '🥣',
  },
  {
    name: '西葫芦',
    emoji: '🥒',
  },
  {
    name: '番茄',
    emoji: '🍅',
    alias: '西红柿',
  },
  {
    name: '芹菜',
    emoji: '🥬',
  },
  {
    name: '黄瓜',
    emoji: '🥒',
  },
  {
    name: '洋葱',
    emoji: '🧅',
  },
  {
    name: '莴笋',
    emoji: '🎍',
  },
  {
    name: '菌菇',
    emoji: '🍄',
  },
  {
    name: '茄子',
    emoji: '🍆',
  },
  {
    name: '豆腐',
    emoji: '🍲',
  },
  {
    name: '包菜',
    emoji: '🥗',
  },
  {
    name: '白菜',
    emoji: '🥬',
  },
  {
    name: '木耳',
    emoji: '🍄',
  },
  {
    name: '青椒',
    emoji: '🌶️',
  },
];

/**
 * 荤菜
 */
export const MeatOptions: Option[] = [
  {
    name: '午餐肉',
    emoji: '🥓',
  },
  {
    name: '香肠',
    emoji: '🌭',
  },
  {
    name: '腊肠',
    emoji: '🌭',
  },
  {
    name: '鸡肉',
    emoji: '🐤',
  },
  {
    name: '猪肉',
    emoji: '🐷',
  },
  {
    name: '鸡蛋',
    emoji: '🥚',
  },
  {
    name: '虾',
    emoji: '🦐',
  },
  {
    name: '牛肉',
    emoji: '🐮',
  },
  {
    name: '骨头',
    emoji: '🦴',
  },
  {
    name: '鱼',
    emoji: '🐟',
  },
];

/**
 * 主食
 */
export const StapleOptions: Option[] = [
  {
    name: '面食',
    emoji: '🍝',
  },
  {
    name: '面包',
    emoji: '🍞',
  },
  {
    name: '米',
    emoji: '🍚',
  },
  {
    name: '方便面',
    emoji: '🍜',
  },
];

export const ToolOptions: Option[] = [
  {
    name: '烤箱',
    icon: require('@src/assets/images/tools/kaoxiang.png'),
  },
  {
    name: '空气炸锅',
    icon: require('@src/assets/images/tools/kongqizhaguo.png'),
  },
  {
    name: '微波炉',
    icon: require('@src/assets/images/tools/weibolu.png'),
  },
  {
    name: '电饭煲',
    emoji: '',
    icon: require('@src/assets/images/tools/dianfanbao.png'),
  },
  {
    label: '一口能炒又能煮的大锅',
    name: '一口大锅',
    icon: require('@src/assets/images/tools/daguo.png'),
  },
];

export const ModeOptions: Option[] = [
  {
    name: '模糊匹配',
    emoji: '🔍',
  },
  {
    name: '严格匹配',
    emoji: '✅',
  },
  {
    name: '生存模式',
    emoji: '🛡️',
  },
];
