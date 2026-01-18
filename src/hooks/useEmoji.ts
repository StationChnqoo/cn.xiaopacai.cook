import {
  MeatOptions,
  ToolOptions,
  VegetableOptions,
} from '@src/constants/options';
import {Receipt} from '@src/constants/t';

export const useEmoji = (data: Receipt) => {
  let emojis = [...VegetableOptions, ...MeatOptions];
  let emoji = emojis
    .filter(it => data.stuff?.includes(it.name))
    .map(it => it.emoji)
    .join('');
  let tools = ToolOptions.find(it => it.name === data.tools)?.name;
  return {emoji, tools};
};
