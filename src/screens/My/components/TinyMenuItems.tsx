import {TinyMenuIds, TinyMenus} from '@src/assets/datas/menus';
import Flex from '@src/components/Flex';
import {useCaches} from '@src/stores';
import { fs } from '@src/constants/u';
import {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface MyProps {
  onPress: (id: TinyMenuIds) => void;
}

const TinyMenuItems: React.FC<MyProps> = props => {
  const [more, setMore] = useState(true);
  const {onPress} = props;
  const {theme} = useCaches();

  return (
    <View style={styles.group}>
      {TinyMenus.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={{alignItems: 'center'}}
            activeOpacity={0.8}
            onPress={() => {
              onPress(item.value);
            }}>
            <Image
              source={item.src}
              style={{height: 32, width: 32, tintColor: theme}}
            />
            <View style={{height: 5}} />
            <Text style={{color: '#666', fontSize: fs(12)}}>{item.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {},
  group: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',Ç
  },
});

export default TinyMenuItems;
