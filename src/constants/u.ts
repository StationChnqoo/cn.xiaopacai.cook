import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export function fs(size: number) {
  if (width >= 430) return size + 2; // iPhone12 Plus/Pro Max
  if (width >= 390) return size + 1; // iPhone12/Pro
  return size; // SE
}

export const h5 = (path: string) => {
  const host = __DEV__
    ? // ? 'http://localhost:3000/#'
      `https://cdn.xiaopacai.cn/h5/index.html#`
    : `https://cdn.xiaopacai.cn/h5/index.html#`;
  return `${host}${path}`;
};
