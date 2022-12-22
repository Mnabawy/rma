import React, {FC, useState, ReactElement} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  ScrollView,
} from 'react-native';

export interface StepperProps {
  active: number;
  content: ReactElement[];
  onNext: Function;
  onBack: Function;
  onFinish: Function;
  wrapperStyle?: ViewStyle;
  stepStyle?: ViewStyle;
  stepTextStyle?: TextStyle;
  buttonStyle?: ViewStyle;
  buttonTextStyle?: TextStyle;
  showButton?: boolean;
}

const search = (keyName: number): Number => {
  // let value = nu;
  // myArray.map((val) => {
  //   if (val === keyName) {
  //     value = true;
  //   }
  // });
  return keyName;
};

const Stepper: FC<StepperProps> = props => {
  const {
    active,
    content,
    onBack,
    onNext,
    onFinish,
    wrapperStyle,
    stepStyle,
    stepTextStyle,
    buttonStyle,
    buttonTextStyle,
    showButton = true,
    stepNumber,
  } = props;
  const [step, setStep] = useState<number[]>([stepNumber]);
  // const pushData = (val: number) => {
  //   setStep((prev) => [...prev, val]);
  // };

  // const removeData = () => {
  //   setStep((prev) => {
  //     prev.pop();
  //     return prev;
  //   });
  // };

  return (
    <View style={wrapperStyle}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {[1, 2, 3].map((_, i) => {
          return (
            <React.Fragment key={i}>
              {i !== 0 && (
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: '#EBC4A0',
                    opacity: 1,
                    // marginHorizontal: 10,
                  }}
                />
              )}
              <View
                style={[
                  {
                    backgroundColor: i === active ? '#C18956' : '#EBC4A0',
                    width: 20,
                    height: 20,
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: search(step) ? 1 : 0.3,
                  },
                  stepStyle,
                ]}>
                {search(step) ? (
                  <Text
                    style={[
                      {
                        color: 'white',
                      },
                      stepTextStyle,
                    ]}>
                    {''}
                  </Text>
                ) : (
                  <Text
                    style={[
                      {
                        color: 'white',
                      },
                      stepTextStyle,
                    ]}>
                    {i + 1}
                  </Text>
                )}
              </View>
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );
};

export default Stepper;
