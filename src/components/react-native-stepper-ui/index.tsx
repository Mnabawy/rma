import React, {FC, useState, ReactElement} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  ScrollView,
  Dimensions,
  StyleSheet,
} from 'react-native';

import {COLORS} from '../../utils/colors';
// import {HomeStackHeader} from './'
import HomeStackHeader from '../../screens/HomePhase/HomeStackHeader';
import Icon from 'react-native-vector-icons/AntDesign';

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
  navigation: {};
  route: {params?: {title?: string}};
}

const search = (keyName: number, myArray: number[]): boolean => {
  let value = false;
  myArray.map(val => {
    if (val === keyName) {
      value = true;
    }
  });
  return value;
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
    navigation,
    route,
  } = props;
  const [step, setStep] = useState<number[]>([0]);
  const pushData = (val: number) => {
    setStep(prev => [...prev, val]);
  };

  const removeData = () => {
    setStep(prev => {
      prev.pop();
      return prev;
    });
  };

  // const {title} = route.params;
  return (
    <>
      {/* <HomeStackHeader title={title} navigation={navigation} dotsMenu /> */}
      <View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{}}>
          {content[active]}
        </ScrollView>
        <View
          style={[
            wrapperStyle,
            {
              marginVertical: 0,
              width: '100%',
              marginHorizontal: 10,
              //  width:"100%",
            },
          ]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              shadowOffset: {height: 5, width: 0},
              // backgroundColor:'red',
              // borderWidth:1,
              // height:60
              // height:100<
              // marginVertical:20
            }}>
            {content.map((_, i) => {
              return (
                <React.Fragment key={i}>
                  {i !== 0 && (
                    <View
                      style={{
                        flex: 1,
                        height: 1,
                        opacity: 1,
                        backgroundColor: COLORS.yellow, // color for the line between step icons
                        // marginHorizontal: 10,
                      }}
                    />
                  )}

                  <View
                    style={[
                      {
                        backgroundColor: COLORS.yellow, // color for the line between step icons
                        // backgroundColor: '#1976d2',
                        width: 30,
                        height: 30,
                        borderRadius: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        opacity: search(i, step) ? 1 : 0.3,
                      },
                      stepStyle,
                    ]}>
                    {search(i, step) ? (
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

            {showButton && (
              <View
                style={{
                  // borderWidth:1,
                  flexDirection: 'row',
                  marginHorizontal: 40,
                  // marginVertical:30
                  alignSelf: 'flex-end',
                  // backgroundColor: COLORS.primary,
                  // height:0
                }}>
                {/* {active !== 0 && (
                  <TouchableOpacity
                    style={[
                      {
                        bottom: Dimensions.get('screen').height - 180,
                        right: Dimensions.get('screen').width - 100,
                        position: 'absolute',
                        padding: 10,
                        borderRadius: 4,
                        // alignSelf: 'flex-end',
                        // marginRight: 10,
                        // marginVertical:40
                      },
                      buttonStyle,
                    ]}
                    onPress={() => {
                      removeData();
                      onBack();
                    }}>
                    <Icon name="arrowleft" size={22} color={COLORS.darkBlue} />
                  </TouchableOpacity>
                )} */}
                {content.length - 1 !== active && (
                  <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => {
                      pushData(active + 1);
                      onNext();
                      console.log('active', active);
                    }}>
                    {/* <View> */}
                    <Text style={[{color: 'white'}, buttonTextStyle]}>
                      {active === 0 ? 'Book' : 'Next'}
                    </Text>
                    {/* </View> */}
                  </TouchableOpacity>
                )}
                {content.length - 1 === active && (
                  <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => onFinish()}>
                    <Text style={[{color: 'white'}, buttonTextStyle]}>
                      Send
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        </View>
      </View>
    </>
  );
};

export default Stepper;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 50,
    // borderWidth: 1,
    // borderColor: COLORS.primary,
  },
});
