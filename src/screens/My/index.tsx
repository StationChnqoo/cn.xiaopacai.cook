import Flex from '@src/components/Flex';
import {Receipt} from '@src/constants/t';
import {fs, h5} from '@src/constants/u';
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
import MoreButton from '@src/components/MoreButton';

interface MyProps {
  navigation: RootStacksProp;
}

const My: React.FC<MyProps> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const {theme, options, setOptions, collections, setCollections, receipts} =
    useCaches();
  const [count, setCount] = useState(10);
  const [refreshing, setRefreshing] = useState(0);
  const [datas, setDatas] = useState<Receipt[]>([]);

  useEffect(() => {
    let result = [];
    for (let i = 0; i < count; i++) {
      let index = Math.floor(Math.random() * receipts.length);
      result.push(receipts[index]);
    }
    setDatas(result);
  }, [refreshing, count, receipts]);

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
        }}
        onLongPress={() => {
          Alert.alert('提示', '确认删除此收藏吗？', [
            {
              text: '确认',
              onPress: () => {
                const newCollections = collections.filter(
                  (_, i) => i !== index,
                );
                setCollections(newCollections);
              },
            },
            {
              text: '取消',
            },
          ]);
        }}>
        <Text
          style={{
            color: theme,
            fontSize: fs(14),
          }}>{`${emoji} ${item.name}`}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.view}>
      <View style={{height: insets.top, backgroundColor: '#fff'}} />
      <ScrollView style={{flex: 1}} bounces={false}>
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
              <Text style={{color: '#fff', fontSize: fs(14)}}>换一组</Text>
            </TouchableOpacity>
          </Flex>
          <View style={{height: 10}} />
          <View style={styles.tags}>{datas.map(renderItem)}</View>
        </View>
        <View style={{height: 2}} />
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
      <View style={{height: 1, backgroundColor: '#eee'}} />

      <Flex horizontal justify="space-between" style={styles.settingItem}>
        <Text style={{color: '#333', fontSize: fs(16)}}>用户协议</Text>
        <MoreButton
          label=""
          onPress={() => {
            navigation.navigate('Webviewer', {
              title: '用户协议',
              url: h5(`/testMarkdown?src=./docs/icook/terms-of-service.md`),
            });
          }}
        />
      </Flex>
      <View style={{height: 1, backgroundColor: '#eee'}} />
      <Flex horizontal justify="space-between" style={styles.settingItem}>
        <Text style={{color: '#333', fontSize: fs(16)}}>隐私政策</Text>
        <MoreButton
          label=""
          onPress={() => {
            navigation.navigate('Webviewer', {
              title: '隐私政策',
              url: h5(`/testMarkdown?src=./docs/icook/privacy-policy.md`),
            });
          }}
        />
      </Flex>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#f0f0f0',
    flex: 1,
  },
  settingItem: {
    padding: 15,
    backgroundColor: '#fff',
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
    height: 32,
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

export default My;
