import {Receipt} from '@src/constants/t';
import {useEmoji} from '@src/hooks/useEmoji';
import {useCaches} from '@src/stores';
import { fs } from '@src/constants/u';
import _ from 'lodash';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface MyProps {
  item: Receipt;
  onPress?: () => void;
}

const CommonItem: React.FC<MyProps> = props => {
  const {item, onPress} = props;
  const insets = useSafeAreaInsets();
  const {theme, options, setOptions, collections, setCollections} = useCaches();

  const {emoji, tools} = useEmoji(item);
  let itemString = JSON.stringify(item);
  let _collections = _.cloneDeep(collections);
  let collectIndex = _collections.findIndex(
    it => JSON.stringify(it) == itemString,
  );
  let collected = collectIndex >= 0;
  return (
    <TouchableOpacity style={styles.item} activeOpacity={0.8} onPress={onPress}>
      <View style={{flex: 1}}>
        <Text style={{color: '#333', fontSize: fs(14), fontWeight: '500'}}>
          {item.name}
        </Text>
        <View style={{height: 5}} />
        <Text style={{color: '#333', fontSize: fs(14)}} numberOfLines={1}>
          {emoji}
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        hitSlop={12}
        onPress={() => {
          if (collected) {
            _collections = _collections.filter(
              it => JSON.stringify(it) != itemString,
            );
          } else {
            _collections.push(item);
          }
          setCollections(_collections);
        }}>
        <Image
          source={
            collected
              ? require('@src/assets/images/common/star_yes.png')
              : require('@src/assets/images/common/star_no.png')
          }
          style={{width: 20, height: 20}}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#eee',
    flex: 1,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CommonItem;
