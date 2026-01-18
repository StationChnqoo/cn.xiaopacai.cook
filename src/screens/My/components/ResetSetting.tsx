import {TinyMenuIds, TinyMenus} from '@src/assets/datas/menus';
import Flex from '@src/components/Flex';
import {useCaches} from '@src/stores';
import {useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface MyProps {}

const ResetSetting: React.FC<MyProps> = props => {
  const {theme, setTheme, setOptions, setCollections} = useCaches();

  return (
    <View style={styles.group}>
      <Text style={{fontSize: 16, color: '#333', fontWeight: '500'}}>
        重置所有设置
      </Text>
      <TouchableOpacity
        onPress={() => {
          Alert.alert('提示', '确定要重置所有设置吗？', [
            {text: '取消'},
            {
              text: '确定',
              onPress: () => {
                setTheme('#dc7000');
                setOptions({
                  meat: [],
                  vegetable: [],
                  staple: [],
                  tools: '',
                  mode: -1,
                });
                setCollections([]);
              },
            },
          ]);
        }}>
        <Text style={{color: theme, fontSize: 14}}>重置</Text>
      </TouchableOpacity>
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

export default ResetSetting;
