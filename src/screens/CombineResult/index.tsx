import {RouteProp} from '@react-navigation/native';
import CommonItem from '@src/components/CommonItem';
import ToolBar from '@src/components/ToolBar';
import {useCook} from '@src/hooks/useCook';
import {useBilibiliLink} from '@src/hooks/useLink';
import {useCaches} from '@src/stores';
import {Alert, FlatList, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStacksParams, RootStacksProp} from '..';
import {useEffect} from 'react';

interface MyProps {
  navigation: RootStacksProp;
  route?: RouteProp<RootStacksParams, 'CombineResult'>;
}

const CombineResult: React.FC<MyProps> = props => {
  const {navigation, route} = props;
  const insets = useSafeAreaInsets();
  const {theme, options, setOptions, collections, setCollections} = useCaches();
  const {receipts} = useCook();

  useEffect(() => {
    return function () {};
  }, [receipts]);

  return (
    <View style={styles.view}>
      <ToolBar
        title={'菜谱'}
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <View style={{height: 1, backgroundColor: '#eee'}} />
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
  item: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CombineResult;
