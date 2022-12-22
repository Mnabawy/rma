import React, {useState} from 'react';
import {Text, View} from 'react-native';

import Stepper from 'react-native-stepper-ui';
import ServiceDetailsComponent from './ServiceDetailsComponent';

const CustomStepper = ({navigation, route}) => {
  const MyComponent = props => {
    return (
      <View>
        <Text>{props.title}</Text>
      </View>
    );
  };

  const content = [
      <MyComponent title="Component 2" />,
      <MyComponent title="Component 3" />,
      <ServiceDetailsComponent navigation={navigation} route={route} />,
  ];

  const [active, setActive] = useState(0);

  return (
    <>
      <Stepper
        active={active}
        content={content}
        onBack={() => setActive(p => p - 1)}
        onFinish={() => alert('Finish')}
        onNext={() => setActive(p => p + 1)}
      />
    </>
  );
};

export default CustomStepper;
