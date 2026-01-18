import {DropdownMenus} from '@src/assets/datas/menus';
import {useCaches} from '@src/stores';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStacksProp} from '..';
import DropableMenuItem from './components/DropableMenuItem';
import Profile from './components/Profile';
import ResetSetting from './components/ResetSetting';
import ThemeSetting from './components/ThemeSetting';
import TinyMenuItems from './components/TinyMenuItems';

interface MyProps {
  navigation: RootStacksProp;
}

const My: React.FC<MyProps> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const {theme, options, setOptions, collections, setCollections} = useCaches();

  return (
    <View style={styles.view}>
      <View style={{height: insets.top, backgroundColor: '#fff'}} />
      <Profile onEdit={() => {}} />
      <View style={{height: 5}} />
      <TinyMenuItems onPress={id => {}} />
      <View style={{height: 5}} />
      <ThemeSetting />
      {/* <View style={{height: 1}} />
      <ResetSetting /> */}
      <ScrollView style={{flex: 1}}>
        <View style={{height: 5}} />
        {DropdownMenus.map((menu, index) => {
          return <DropableMenuItem item={menu} key={index} />;
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#f0f0f0',
    flex: 1,
  },
});

export default My;
