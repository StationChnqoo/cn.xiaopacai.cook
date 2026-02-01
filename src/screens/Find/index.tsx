import Datas from '@src/assets/datas/receipts';
import Flex from '@src/components/Flex';
import {Receipt} from '@src/constants/t';
import { fs } from '@src/constants/u';
import {useEmoji} from '@src/hooks/useEmoji';
import {useBilibiliLink} from '@src/hooks/useLink';
import {useCaches} from '@src/stores';
import {useEffect, useState} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStacksProp} from '..';

interface MyProps {
  navigation: RootStacksProp;
}

const Find: React.FC<MyProps> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const {theme, options, setOptions, collections, setCollections} = useCaches();
  const [count, setCount] = useState(10);
  const [refreshing, setRefreshing] = useState(0);
  const [datas, setDatas] = useState<Receipt[]>([]);

  useEffect(() => {
    let result = [];
    for (let i = 0; i < count; i++) {
      let index = Math.floor(Math.random() * Datas.length);
      result.push(Datas[index]);
    }
    setDatas(result);
  }, [refreshing, count]);

  const onStep = (n: number) => {
    if (count + n <= 0) {
      Alert.alert('提示', '最少还得剩一道菜😂', [{text: '我知道了'}]);
    } else if (count + n > 108) {
      Alert.alert('提示', '慈溪老佛爷也吃不了108道菜啊 😂', [
        {text: '我知道了'},
      ]);
    } else {
      setCount(count + n);
    }
  };

  const onClear = () => {
    Alert.alert('提示', '确认清空收藏吗？', [
      {
        text: '确认',
        onPress: () => {
          setCollections([]);
        },
      },
      {
        text: '取消',
      },
    ]);
  };

  const renderItem = (item: Receipt, index: number) => {
    const {emoji, tools} = useEmoji(item);
    let itemString = JSON.stringify(item);

    return (
      <TouchableOpacity
        key={index}
        style={[styles.tag, {borderColor: theme}]}
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate('Webviewer', {
            title: '详情',
            url: useBilibiliLink(item?.bv),
          });
        }}>
        <Text
          style={{color: theme, fontSize: fs(14)}}>{`${emoji} ${item.name}`}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.view}>
      <View style={{height: insets.top, backgroundColor: '#fff'}} />
      <ScrollView style={{flex: 1}}>
        <View style={styles.group}>
          <Text style={{fontSize: fs(16), fontWeight: '500', color: '#333'}}>
            今天吃什么？
          </Text>
          <View style={{height: 10}} />
          <Flex horizontal justify="space-between">
            <Flex horizontal>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.stepButton, {backgroundColor: theme}]}
                onPress={() => {
                  onStep(-1);
                }}>
                <Text style={{color: '#fff', fontSize: fs(14)}}>-</Text>
              </TouchableOpacity>
              <Text style={styles.count}>{count}</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.stepButton, {backgroundColor: theme}]}
                onPress={() => {
                  onStep(1);
                }}>
                <Text style={{color: '#fff', fontSize: fs(14)}}>+</Text>
              </TouchableOpacity>
            </Flex>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.randomButton, {backgroundColor: theme}]}
              onPress={() => {
                setRefreshing(Math.random());
              }}>
              <Text style={{color: '#fff', fontSize: fs(14)}}>刷新</Text>
            </TouchableOpacity>
          </Flex>
          <View style={{height: 10}} />
          <View style={styles.tags}>{datas.map(renderItem)}</View>
        </View>
        <View style={{height: 10}} />
        <View style={styles.group}>
          <Flex horizontal justify="space-between">
            <Text style={{fontSize: fs(16), fontWeight: '500', color: '#333'}}>
              收藏
            </Text>
            <TouchableOpacity activeOpacity={0.8} onPress={onClear}>
              <Text style={{color: '#ff5252', fontSize: fs(14)}}>清除</Text>
            </TouchableOpacity>
          </Flex>
          <View style={{height: 5}} />
          <Text style={{fontSize: fs(14), color: '#999'}}>
            一共收藏了{collections.length}道菜
          </Text>
          {collections.length > 0 ? (
            <View style={[styles.tags, {marginTop: 10}]}>
              {collections.map(renderItem)}
            </View>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#f0f0f0',
    flex: 1,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  randomButton: {
    paddingHorizontal: 16,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  tags: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  count: {
    width: 36,
    fontSize: fs(16),
    color: '#333',
    textAlign: 'center',
  },
  group: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    // alignItems: 'center',Ç
  },
  stepButton: {
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default Find;
