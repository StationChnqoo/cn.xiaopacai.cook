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
};

export const useCaches = create<States>()(
  devtools(
    persist(
      set => ({
        ...initialState,
        setToken: token => set({token}),
        setTheme: theme => set({theme}),
        setOptions: options => set({options}),
        setCollections: collections => set({collections}),
        reset: () => set({...initialState}),
      }),
      {
        storage: createJSONStorage(() => mmkvStorage),
        name: 'useCaches.ts',
        /** 白名单 */
        partialize: state => ({
          token: state.token,
          collections: state.collections,
        }),
      },
    ),
  ),
);
