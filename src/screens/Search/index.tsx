import {RouteProp} from '@react-navigation/native';
import Datas from '@src/assets/datas/receipts';
import CommonItem from '@src/components/CommonItem';
import Flex from '@src/components/Flex';
import {useBilibiliLink} from '@src/hooks/useLink';
import {useCaches} from '@src/stores';
import _ from 'lodash';
import {useMemo, useState} from 'react';
import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStacksParams, RootStacksProp} from '..';

interface MyProps {
  navigation: RootStacksProp;
  route?: RouteProp<RootStacksParams, 'Search'>;
}

const Search: React.FC<MyProps> = props => {
  const {navigation, route} = props;
  const insets = useSafeAreaInsets();
  const {theme, options, setOptions, collections, setCollections} = useCaches();
  const [keywords, setKeywords] = useState('');
  const datas = _.cloneDeep(Datas);

  const receipts = useMemo(() => {
    return datas.filter(it => JSON.stringify(it).includes(keywords));
  }, [keywords]);

  return (
    <View style={styles.view}>
      <View style={{height: insets.top, backgroundColor: '#fff'}} />
      <View style={styles.group}>
        <Text style={{fontSize: 16, fontWeight: '500', color: '#333'}}>
          搜索
        </Text>
        <View style={{height: 5}} />
        <Text style={{fontSize: 14, color: '#999'}}>
        约{receipts.length}道菜
        </Text>
        <View style={{height: 5}} />
        <Flex horizontal>
          <TextInput
            style={styles.input}
            underlineColorAndroid={'transparent'}
            placeholder="请输入关键词"
            value={keywords}
            onChangeText={setKeywords}
          />
        </Flex>
      </View>
      <FlatList
        data={receipts}
        extraData={collections}
        initialNumToRender={10}
        renderItem={info => (
          <CommonItem
            item={info.item}
            onPress={() => {
              navigation.navigate('Webviewer', {
                url: useBilibiliLink(info.item.bv),
                title: '详情',
              });
            }}
          />
        )}
        ItemSeparatorComponent={() => (
          <View style={{height: 1, backgroundColor: '#eee'}} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#f0f0f0',
    flex: 1,
  },
  input: {
    height: 32,
    padding: 0,
    flex: 1,
    fontSize: 16,
    color: '#333',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  group: {
    paddingTop: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    // alignItems: 'center',
  },
});

export default Search;
