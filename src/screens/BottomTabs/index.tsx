import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {useFocusEffect} from '@react-navigation/native';
import {RootStacksProp} from '@src/screens';
import Home from '@src/screens/Home';
import {useCaches} from '@src/stores';
import React, {useCallback} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Search from '../Search';
import My from '../My';

const Tab = createBottomTabNavigator();
interface MyProps {
  navigation?: RootStacksProp;
}

const BottomTabs = (props: MyProps) => {
  const {theme} = useCaches();
  const {navigation} = props;

  const screens = [
    {
      name: 'Wancan',
      component: Home,
      icon: require('./assets/menu_wancan.png'),
      label: '做饭',
    },
    {
      name: 'Caipu',
      component: Search,
      icon: require('./assets/menu_caipu.png'),
      label: '菜谱',
    },
    {
      name: 'My',
      component: My,
      icon: require('./assets/menu_my.png'),
      label: '我的',
    },
  ];

  useFocusEffect(
    useCallback(() => {
      // setIsShowNewModal(true);
      return () => {};
    }, []),
  );

  return (
    <View style={{flex: 1}}>
      <Tab.Navigator id={undefined} screenOptions={{}}>
        {screens.map((it, i) => (
          <Tab.Screen
            name={it.name}
            key={i}
            component={it.component}
            options={{
              headerShown: false,
              tabBarLabel: it.label,
              tabBarActiveTintColor: theme,
              tabBarBackground: () => (
                <View style={{backgroundColor: '#fff', flex: 1}} />
              ),
              tabBarIcon: ({color}) => (
                <Image
                  source={it.icon}
                  style={{height: 24, width: 24, tintColor: color}}
                />
              ),
            }}
          />
        ))}
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({});
export default BottomTabs;
