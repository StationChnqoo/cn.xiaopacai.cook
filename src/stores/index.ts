import {create} from 'zustand';
import {createJSONStorage, devtools, persist} from 'zustand/middleware';

import {MMKV} from 'react-native-mmkv';
import {StateStorage} from 'zustand/middleware';
import _ from 'lodash';
import {Receipt, SelectedOption} from '@src/constants/t';

// const mmkv = new MMKV({
//   id: 'useMMKV',
//   encryptionKey: 'net.cctv3.iCloud',
// });

const mmkv = new MMKV();
const mmkvStorage: StateStorage = {
  setItem: (key, value) => mmkv.set(key, value),
  getItem: key => mmkv.getString(key) || null,
  removeItem: key => mmkv.delete(key),
};

interface States {
  theme: string;
  setTheme: (t: string) => void;
  token: string;
  setToken: (t: string) => void;
  reset: () => void;
  options: SelectedOption;
  setOptions: (options: SelectedOption) => void;
  collections: Receipt[];
  setCollections: (collections: Receipt[]) => void;
  receipts: Receipt[];
  setReceipts: (receipts: Receipt[]) => void;
  fetchReceipts: () => Promise<void>;
}

const initialState = {
  token: '',
  theme: '#dc7000',
  options: {
    vegetable: [],
    meat: [],
    staple: [],
    tools: '',
    mode: -1,
  },
  collections: [],
  receipts: [],
};

const RECEIPTS_URL = 'https://cdn.xiaopacai.cn/apps/cn.xiaopacai.icook/receipts.json';

export const useCaches = create<States>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        setToken: token => set({token}),
        setTheme: theme => set({theme}),
        setOptions: options => set({options}),
        setCollections: collections => set({collections}),
        setReceipts: receipts => set({receipts}),
        reset: () => set({...initialState}),
        fetchReceipts: async () => {
          try {
            const response = await fetch(RECEIPTS_URL);
            const receipts: Receipt[] = await response.json();
            set({receipts});
          } catch (error) {
            console.error('Failed to fetch receipts:', error);
          }
        },
      }),
      {
        storage: createJSONStorage(() => mmkvStorage),
        name: 'useCaches.ts',
        /** 白名单 */
        partialize: state => ({
          token: state.token,
          collections: state.collections,
          receipts: state.receipts,
        }),
      },
    ),
  ),
);
