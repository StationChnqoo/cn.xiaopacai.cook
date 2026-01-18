import {Receipt} from '@src/constants/t';
import {use, useEffect, useMemo, useRef, useState} from 'react';
import Datas from '@src/assets/datas/receipts';
import {useCaches} from '@src/stores';
import _ from 'lodash';
const datas: Receipt[] = _.clone(Datas);

export const useCook = () => {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const {options} = useCaches();

  // 基本条件过滤
  const filterBaseReceipts = useMemo(() => {
    let filterTools = datas.filter(it => it.tools == options.tools);
    let filterStaples =
      options.staple.length == 0
        ? filterTools
        : filterTools.filter(it => {
            let staples = options.staple;
            return staples.some(s => it.stuff.includes(s));
          });
    return filterStaples;
  }, [options]);

  const filterCooksWithLoose = () => {
    // 模糊匹配
    // 所有含当前选中任意食材的菜谱
    let vm = [...options.vegetable, ...options.meat];
    return filterBaseReceipts.filter(it => {
      return _.intersection(it.stuff.split('、'), vm).length > 0;
    });
  };

  const filterCooksWithStrict = () => {
    // 严格匹配
    // 所有含当前选中所有食材的菜谱
    return filterBaseReceipts.filter(it => {
      let vm = [...options.vegetable, ...options.meat];
      // _.difference(a, b).length === 0 a是b的子集
      return _.difference(vm, it.stuff.split('、')).length == 0;
    });
  };

  const fileterCooksWithSurvival = () => {
    // 生存模式
    // 当前选中食材即可制作的所有菜谱
    return filterBaseReceipts.filter(it => {
      let vm = [...options.vegetable, ...options.meat];
      return _.difference(it.stuff.split('、'), vm).length == 0;
    });
  };

  useEffect(() => {
    if (
      options.mode >= 0 &&
      [options.vegetable.length, options.meat.length].some(v => v > 0)
    ) {
      let handlers = {
        [0]: filterCooksWithLoose,
        [1]: filterCooksWithStrict,
        [2]: fileterCooksWithSurvival,
      };
      let handler = handlers[options.mode];
      setReceipts(handler());
    } else {
      setReceipts([]);
    }
  }, [options]);

  return {receipts};
};
