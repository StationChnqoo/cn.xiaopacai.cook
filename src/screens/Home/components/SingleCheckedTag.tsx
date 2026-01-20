import {Option} from '@src/constants/t';
import {useCaches} from '@src/stores';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';

interface MyProps {
  tag: Option;
  checked: boolean;
  onPress: () => void;
  color: string;
  backgroundColor: string;
}

const SingleCheckedTag: React.FC<MyProps> = props => {
  const {tag, color, backgroundColor, onPress, checked} = props;
  const {theme, options} = useCaches();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.tag,
        checked
          ? {backgroundColor, borderColor: color}
          : {backgroundColor: '#eee', borderColor: '#ddd'},
      ]}>
      {tag?.icon ? (
        <Image
          source={tag.icon}
          style={[
            {width: 16, height: 16, marginRight: 5},
            {tintColor: checked ? color : '#666'},
          ]}
        />
      ) : null}
      <Text style={[{color: checked ? color : '#999', fontSize: 14}]}>
        {`${tag.label || tag.name}`}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tag: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: 'row',
  },
});
export default SingleCheckedTag;
