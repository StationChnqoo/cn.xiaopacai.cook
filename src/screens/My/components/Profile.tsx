import {useFocusEffect} from '@react-navigation/native';
import {TinyMenuIds, TinyMenus} from '@src/assets/datas/menus';
import Flex from '@src/components/Flex';
import {useCaches} from '@src/stores';
import { fs } from '@src/constants/u';
import {useCallback, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface MyProps {
  onEdit: () => void;
}

const Profile: React.FC<MyProps> = props => {
  const [more, setMore] = useState(true);
  const {onEdit} = props;
  const {theme} = useCaches();

  const [hello, setHello] = useState('早上好');

  useFocusEffect(
    useCallback(() => {
      const hour = new Date().getHours();
      setHello(hour < 12 ? '早上好' : hour < 18 ? '下午好' : '晚上好');
    }, []),
  );

  return (
    <View style={styles.group}>
      <Text style={{color: '#333', fontSize: fs(16), fontWeight: '500'}}>
        {hello}
      </Text>
      <View style={{height: 5}} />
      <Flex horizontal justify="space-between">
        <Text style={{color: '#666', fontSize: fs(14)}}>用户123456</Text>
        <Text
          style={{color: theme, fontSize: fs(14)}}
          onPress={() => {
            onEdit();
          }}>
          编辑个人资料
        </Text>
      </Flex>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {},
  group: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    // alignItems: 'center',Ç
  },
});

export default Profile;
