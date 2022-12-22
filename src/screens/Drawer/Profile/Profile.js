import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../../utils';
import Cart from './Cart';
import {t} from 'i18next';
import TouchableText from '../../../components/TouchableText/TouchableText';
import Map from '../../Map/Map';
import ChangePassword from '../EditProfile/ChangePassword';
import {useSelector} from 'react-redux';
const Profile = ({navigation}) => {
  const [visible, setVisible] = useState(false);

  const user = useSelector(state => state.auth.userData);
  console.log('user', user);

  return (
    <>
      <ChangePassword
        setVisible={setVisible}
        code={user?.code}
        phone_number={user?.phone_number}
        visible={visible}
        onPress={() => setVisible(value => !value)}
      />
      <StatusBar backgroundColor={COLORS.grayBg} barStyle="dark-content" />
      {/* <View style={{flex:1}}> */}
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={{paddingBottom: 200, backgroundColor: 'white'}}>
          <View
            style={{
              backgroundColor: COLORS.grayBg,
              height: '12%',
              borderBottomRightRadius: 15,
              borderBottomLeftRadius: 15,
            }}></View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              backgroundColor: COLORS.white,
              paddingHorizontal: 15,
            }}>
            <View
              style={{alignSelf: 'center', top: -65, marginHorizontal: '25%'}}>
              {user.picture ? (
                <Image
                  source={{uri: user.picture}}
                  style={{width: 104, height: 104, borderRadius: 50}}
                />
              ) : (
                <Image
                  style={{width: 104, height: 104, borderRadius: 50}}
                  source={require('../../../../assets/ProfileImage.png')}
                />
              )}
            </View>
            <View style={{top: -20}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('EditProfile')}>
                <Image
                  source={require('../../../../assets/editProfileIcon.png')}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              backgroundColor: COLORS.white,
              flex: 1,
              paddingHorizontal: 10,
              marginTop: -50,
            }}>
            <Cart
              headerStyle={{fontSize: 20, color: COLORS.black}}
              dataStyle={{fontSize: 14}}
              style={{alignItems: 'center'}}
              title={`${user?.name} ${user?.last_name}`}
              data={user.email}
              borderBottom
            />
            <Cart
              title={t('name')}
              data={`${user?.name} ${user?.last_name}`}
              borderBottom
            />
            <Cart
              title={t('phoneNumber')}
              data={`${user?.phone_number}`}
              borderBottom
            />
            <Cart title={t('email')} data={user.email} borderBottom />
            <Cart
              title={t('location')}
              data={`${
                user?.location_description
                  ? user?.location_description?.slice(0, 60)
                  : 'test Location'
              }`}
            />
            <View style={{width: '100%'}}>
              <Image
                style={{width: '100%'}}
                source={require('../../../../assets/MapPhoto.png')}
              />
            </View>
            <View style={{alignItems: 'center', marginTop: 15}}>
              <TouchableText
                text={t('changePassowrd')}
                onPress={() => setVisible(true)}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* </View> */}
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({});
