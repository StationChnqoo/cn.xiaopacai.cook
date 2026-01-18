import {TinyMenuIds, TinyMenus} from '@src/assets/datas/menus';
import Flex from '@src/components/Flex';
import {useCaches} from '@src/stores';
import {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface MyProps {}

const ThemeSetting: React.FC<MyProps> = props => {
  const {theme, setTheme} = useCaches();
  const Themes = [
    {label: '食欲橙', value: '#dc7000'},
    {label: '健康绿', value: '#4CAF50'},
    {label: '辣椒红', value: '#f12334'},
  ];
  return (
    <View style={styles.group}>
      <Text style={{fontSize: 16, color: '#333', fontWeight: '500'}}>
        主题设置
      </Text>
      <Flex justify="space-between" horizontal style={{gap: 10}}>
        {Themes.map((item, index) => {
          return (
            <TouchableOpacity
              style={{alignItems: 'center'}}
              activeOpacity={0.8}
              key={index}
              onPress={() => {
                setTheme(item.value);
              }}>
              <Flex horizontal>
                <View
                  style={{
                    height: 16,
                    width: 16,
                    borderRadius: 8,
                    backgroundColor: item.value == theme ? item.value : '#eee',
                  }}
                />
                <View style={{width: 5}} />
                <Text
                  style={{
                    color: item.value,
                    fontSize: 14,
                  }}>
                  {item.label}
                </Text>
              </Flex>
            </TouchableOpacity>
          );
        })}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',Ç
  },
});

export default ThemeSetting;
