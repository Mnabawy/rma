import {t} from 'i18next';
import React, {useState} from 'react';
import {Button, Image, Text, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Input from '../input/input';
import Icon from 'react-native-vector-icons/Fontisto';
import {COLORS} from '../../utils';

export default DatePickerComponent = ({
  label,
  value,
  onChange,
  placeholder,
}) => {
  var month = value?.getUTCMonth() + 1; //months from 1-12
  console.log('month', month);
  var day = value?.getUTCDate();
  var year = value?.getUTCFullYear();

  const date = `${day}-${month}-${year}`;

  const [open, setOpen] = useState(false);

  const placeholderDate = new Date(placeholder);

  let datePlaceholder =
    placeholderDate.getDate().toString() +
    '-' +
    placeholderDate.getMonth().toString() +
    '-' +
    placeholderDate.getFullYear().toString();

  return (
    <TouchableOpacity onPress={() => setOpen(value => !value)}>
      <Input
        label={label}
        placeholder={
          datePlaceholder ? datePlaceholder.toString() : 'dd/mm/yyyy'
        }
        // style={{height:70}}
        value={date?.toString()}
        icon={
          <TouchableOpacity
            onPress={() => setOpen(value => !value)}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              name="date"
              size={22}
              style={{fontWeight: 'bold'}}
              color={COLORS.black}
            />
          </TouchableOpacity>
        }
      />
      <DatePicker
        theme="light"
        modal
        open={open}
        date={value}
        mode="date"
        onConfirm={onChange}
        onCancel={() => {
          setOpen(false);
        }}></DatePicker>
    </TouchableOpacity>
  );
};
