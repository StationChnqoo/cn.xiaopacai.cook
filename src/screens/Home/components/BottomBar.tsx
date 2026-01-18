import {useCook} from '@src/hooks/useCook';
import {useCaches} from '@src/stores';
import {useMemo} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface MyProps {
  onClear: () => void;
  onApply: () => void;
}

const BottomBar: React.FC<MyProps> = props => {
  const {theme, options} = useCaches();
  const {onClear, onApply} = props;
  const {receipts} = useCook();

  return (
    <View style={styles.view}>
      <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
        <Text style={{color: '#333', fontSize: 14}}>预计能做</Text>
        <Text style={[styles.count, {color: theme}]}>{receipts.length}</Text>
        <Text style={{color: '#333', fontSize: 14}}>道菜</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onClear}
          style={[styles.button, styles.border]}>
          <Text style={{color: theme, fontSize: 14}}>清除</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={receipts.length == 0}
          activeOpacity={0.8}
          onPress={onApply}
          style={[
            styles.button,
            styles.fill,
            {backgroundColor: theme, opacity: receipts.length == 0 ? 0.75 : 1},
          ]}>
          <Text style={{color: '#fff', fontSize: 14}}>开始下厨</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderRadius: 5,
  },
  border: {
    borderWidth: 1,
    borderColor: '#ccc',
  },
  fill: {
    borderWidth: 1,
    borderColor: 'transparent',
  },
  count: {
    fontSize: 24,
    fontWeight: '500',
    marginHorizontal: 4,
  },
});
export default BottomBar;
