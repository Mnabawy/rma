import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';

const CustomProgress = ({progress, width, color, borderWidth}) => {
  return (
    <Progress.Bar
      progress={progress}
      width={width}
      color={color}
      borderWidth={borderWidth}
    />
  );
};

export default CustomProgress;

const styles = StyleSheet.create({});
