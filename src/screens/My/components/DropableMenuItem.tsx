import Flex from '@src/components/Flex';
import {useCaches} from '@src/stores';
import { fs } from '@src/constants/u';
import {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface MyProps {
  item: any;
}

const DropableMenuItem: React.FC<MyProps> = props => {
  const [more, setMore] = useState(true);
  const {item} = props;
  const {theme} = useCaches();

  return (
    <View style={styles.group}>
      <Flex justify="space-between" horizontal>
        <Text style={{fontSize: fs(16), color: '#333', fontWeight: '500'}}>
          {item.title}
        </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          hitSlop={12}
          onPress={() => {
            setMore(!more);
          }}>
          <Image
            key={`${more}`}
            source={
              more
                ? require('@src/assets/images/common/arrow_up.png')
                : require('@src/assets/images/common/arrow_right.png')
            }
            style={{width: 16, height: 16, tintColor: theme}}
          />
        </TouchableOpacity>
      </Flex>
      {more ? (
        <Text style={{marginTop: 5, fontSize: fs(14), color: '#666'}}>
          {item.content}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {},
  group: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    marginBottom: 1,
    // alignItems: 'center',Ç
  },
});

export default DropableMenuItem;
