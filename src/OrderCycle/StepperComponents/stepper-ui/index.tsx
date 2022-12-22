import React, {FC, useState, ReactElement} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  ScrollView,
} from 'react-native';
import {useTranslation} from 'react-i18next';

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
  stepsArr: [];
  steps: number;
  stepNumber: number;
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
  const {i18n} = useTranslation();
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
    steps,
  } = props;
  const [step, setStep] = useState<number[]>([stepNumber]);

  const stepsArr = [];

  for (let i = 1; i <= steps; i++) {
    stepsArr.push(i);
  }

  return (
    <View
      style={[
        wrapperStyle,
        {direction: i18n.language === 'en' ? 'ltr' : 'rtl'},
      ]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {stepsArr.map((_, i) => {
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
                    width: 30,
                    height: 30,
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
                    {i + 1}
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
