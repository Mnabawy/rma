import React from 'react';
import {TouchableOpacity} from 'react-native';
import Text from '../../../../components/text/Text';
import {COLORS} from '../../../../utils';

const TabButton = ({title, onPress, active, style}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          width: 100,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 10,
          paddingVertical: 15,
          borderBottomColor: active ? COLORS.black : COLORS.garay,
          borderBottomWidth: 4,
        },
        style,
      ]}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

export default TabButton;
