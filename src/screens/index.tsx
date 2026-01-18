import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import * as React from 'react';
import App from '../../App';
import BottomTabs from '@src/screens/BottomTabs';
import Home from './Home';
import CombineResult from './CombineResult';
import Webviewer from './Webviewer';
import Find from './Find';
import Search from './Search';
import My from './My';

export type RootStacksParams = {
  BottomTabs: undefined;
  Login: undefined;
  App: undefined;
  Home: undefined;
  CombineResult: undefined;
  Webviewer: {url: string; title?: string};
  Find: undefined;
  Search: undefined;
  My: undefined;
};

const RootStack = createNativeStackNavigator<RootStacksParams>();

export type RootStacksProp = NativeStackNavigationProp<RootStacksParams>;
export const navigationRef = createNavigationContainerRef<RootStacksParams>();

export default function Screens() {
  // const navigator = useNavigationContainerRef();
  // useFlipper(navigator);
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator
        id="Screens"
        screenOptions={{
          animation: 'slide_from_right',
          animationDuration: 618,
          headerShown: false,
        }}>
        <RootStack.Screen name="BottomTabs" component={BottomTabs} />
        <RootStack.Screen name="Home" component={Home} />
        <RootStack.Screen name="App" component={App} />
        <RootStack.Screen name="CombineResult" component={CombineResult} />
        <RootStack.Screen name="Webviewer" component={Webviewer} />
        <RootStack.Screen name="Find" component={Find} />
        <RootStack.Screen name="Search" component={Search} />
        <RootStack.Screen name="My" component={My} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
