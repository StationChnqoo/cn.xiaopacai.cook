import {
  MeatOptions,
  ModeOptions,
  StapleOptions,
  ToolOptions,
  VegetableOptions,
} from '@src/constants/options';
import {useCook} from '@src/hooks/useCook';
import {useCaches} from '@src/stores';
import _ from 'lodash';
import {useMemo} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStacksProp} from '..';
import BottomBar from './components/BottomBar';
import MultiCheckedTag from './components/MultiCheckedTag';
import SingleCheckedTag from './components/SingleCheckedTag';
import { fs } from '@src/constants/u';

interface MyProps {
  navigation: RootStacksProp;
}

const Home: React.FC<MyProps> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const {theme, options, setOptions} = useCaches();
  const {receipts} = useCook();

  const onPressTag = (key: string, tag: string) => {
    let _options = _.cloneDeep(options);
    let list = _options[key];
    if (list.includes(tag)) {
      list = list.filter(it => it != tag);
    } else {
      list.push(tag);
    }
    _options[key] = list;
    setOptions(_options);
  };

  const onApply = () => {
    navigation.navigate('CombineResult');
  };

  const modeTips = useMemo(() => {
    let tips = {
      [0]: '展示所有含当前选中任意食材的菜谱',
      [1]: '展示所有含当前选中所有食材的菜谱',
      [2]: '展示当前选中食材即可制作的所有菜谱',
    };
    return tips?.[options.mode] || '请选择模式';
  }, [options.mode]);

  return (
    <View style={styles.view}>
      <View style={{height: insets.top, backgroundColor: '#fff'}} />
      <ScrollView style={{flex: 1}} bounces={false}>
        <View style={styles.group}>
          <Text style={styles.title}>🥘 选一下食材</Text>
          <View style={{height: 15}} />
          <Text style={styles.subTitle}>🥬 菜菜们</Text>
          <View style={{height: 5}} />
          <View style={styles.tags}>
            {VegetableOptions.map((it, index) => (
              <MultiCheckedTag
                key={index}
                optionsKey="vegetable"
                tag={it}
                color="#4caf50"
                backgroundColor="#e5fce8"
                onPress={() => {
                  onPressTag('vegetable', it.name);
                }}
              />
            ))}
          </View>
          <View style={{height: 20}} />
          <Text style={styles.subTitle}>🥩 肉肉们</Text>
          <View style={{height: 5}} />
          <View style={styles.tags}>
            {MeatOptions.map((it, index) => (
              <MultiCheckedTag
                key={index}
                optionsKey="meat"
                tag={it}
                color="#f44336"
                backgroundColor="#fdecea"
                onPress={() => {
                  onPressTag('meat', it.name);
                }}
              />
            ))}
          </View>
          <View style={{height: 20}} />
          <Text style={styles.subTitle}>
            🍚 主食也要一起下锅吗？（不选也行）
          </Text>
          <View style={{height: 5}} />
          <View style={styles.tags}>
            {StapleOptions.map((it, index) => (
              <MultiCheckedTag
                key={index}
                optionsKey="staple"
                tag={it}
                color="#ff9800"
                backgroundColor="#fff4e5"
                onPress={() => {
                  onPressTag('staple', it.name);
                }}
              />
            ))}
          </View>
        </View>
        <View style={{height: 10}} />
        <View style={styles.group}>
          <Text style={styles.title}>🍳 选一下厨具</Text>
          <View style={{height: 15}} />
          <View style={styles.tags}>
            {ToolOptions.map((it, index) => (
              <SingleCheckedTag
                key={index}
                checked={options.tools == it.name}
                tag={it}
                color="#2196f3"
                backgroundColor="#e5f1fd"
                onPress={() => {
                  setOptions({...options, tools: it.name});
                }}
              />
            ))}
          </View>
        </View>
        <View style={{height: 10}} />
        <View style={styles.group}>
          <Text style={styles.title}>🍲 来看看组合出的菜谱吧</Text>
          <View style={{height: 15}} />
          <Text style={{color: '#999', fontSize: fs(12)}}>{modeTips}</Text>
          <View style={{height: 10}} />
          <View style={styles.tags}>
            {ModeOptions.map((it, index) => (
              <SingleCheckedTag
                key={index}
                checked={options.mode == index}
                tag={it}
                color="#9c27b0"
                backgroundColor="#f3e5f5"
                onPress={() => {
                  setOptions({...options, mode: index});
                }}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={{height: 1, backgroundColor: '#eee'}} />
      <BottomBar
        onClear={() => {
          setOptions({
            vegetable: [],
            meat: [],
            staple: [],
            tools: '',
            mode: -1,
          });
        }}
        onApply={onApply}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#f0f0f0',
    flex: 1,
  },
  group: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    // alignItems: 'center',
  },
  title: {
    fontSize: fs(16),
    fontWeight: '500',
  },
  subTitle: {
    fontSize: fs(14),
    fontWeight: '500',
    marginBottom: 8,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});

export default Home;
