import {Option} from '@src/constants/t';
import {useCaches} from '@src/stores';
import {useMemo} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';

interface MyProps {
  tag: Option;
  optionsKey: string;
  onPress: () => void;
  color: string;
  backgroundColor: string;
}

const MultiCheckedTag: React.FC<MyProps> = props => {
  const {tag, color, backgroundColor, onPress, optionsKey} = props;
  const {theme, options} = useCaches();

  const checked = useMemo(() => {
    return options[optionsKey].includes(tag.name);
  }, [tag, optionsKey, options]);

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
            {width: 16, height: 16},
            {tintColor: checked ? color : '#666'},
          ]}
        />
      ) : null}
      <Text style={[{color: checked ? color : '#999', fontSize: 13}]}>
        {`${tag?.emoji || ''} ${tag.label || tag.name}`}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tag: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: 'row',
  },
});
export default MultiCheckedTag;
