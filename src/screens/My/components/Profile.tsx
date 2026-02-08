import {useFocusEffect} from '@react-navigation/native';
import {TinyMenuIds, TinyMenus} from '@src/assets/datas/menus';
import Flex from '@src/components/Flex';
import {useCaches} from '@src/stores';
import {fs} from '@src/constants/u';
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
      <Flex horizontal>
        <Image
          source={require('@src/assets/images/logo.png')}
          style={{width: 196, height: 72}}
          resizeMode="stretch"
        />
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
