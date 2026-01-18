import {ImageRequireSource} from 'react-native';

export interface Option {
  name: string;
  label?: string;
  emoji?: string;
  alias?: string;
  icon?: ImageRequireSource;
}

export interface SelectedOption {
  vegetable: string[];
  meat: string[];
  staple: string[];
  tools?: string;
  mode?: number;
}

export interface Receipt {
  name: string;
  stuff: string;
  bv: string;
  difficulty: string;
  tags: string;
  methods: string;
  tools: string;
}
