import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CustomCheckBox from '../../../components/checkBox/CheckBox';

const data = require('./AdditionsDummyData.json');

// test purpese
// const DATA = [
//   {
//     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//     title: 'First Item',
//   },
//   {
//     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//     title: 'Second Item',
//   },
//   {
//     id: '58694a0f-3da1-471f-bd96-145571e29d72',
//     title: 'Third Item',
//   },
// ];

const Additions = () => {
  const [checked, setChecked] = useState(false);
  const [question, setQuestion] = useState('second');

  const renderItem = ({item}) => {
    console.log(item.options);
    return (
      <View>
        <Text
          style={{fontSize: 16, color: 'black', fontFamily: 'Poppins-Regular'}}>
          {item.ques}
        </Text>
        {item.options.map(que => {
          let question = {...que, checked: false};
          return (
            <View style={{marginVertical: -15}}>
              <CustomCheckBox
                checked={question.checked}
                onValueChange={newVal => setChecked(newVal)}
                text={question.text}
              />
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        height: Dimensions.get('screen').height,
        marginHorizontal: 10,
      }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={comment => comment.id}
      />
    </ScrollView>
  );
};

export default Additions;

const styles = StyleSheet.create({});
