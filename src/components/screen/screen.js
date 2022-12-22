// import React, { useRef } from 'react';
// import PropTypes from 'prop-types';
// import { KeyboardAvoidingView, RefreshControl, ScrollView, StatusBar, View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Layout } from '@ui-kitten/components';
// import styles from './styles';
// import { TopNavigator } from '../topNavigator/topNavigator';
// import { AuthNavigator } from '../authNavigator/authNavigator';
// import { COLORS } from '../../common';
// import { heightPercentageToDP } from 'react-native-responsive-screen';

// const ScreenWithoutScrolling = ({
//   statusBar,
//   statusBackGround = 'white',
//   style,
//   hasNav,
//   navCofig,
//   onPress,
//   children,
// }) => {
//   return (
//     <>
//       <StatusBar
//         // hidden={hasNav == "Auth"}
//         barStyle={statusBar}
//         backgroundColor={statusBackGround}
//       />
//       <View style={{ backgroundColor: '#fff', flex: 1 }}>
//         <SafeAreaView style={styles.container}>
//           {hasNav && hasNav == 'Auth' ? (
//             <AuthNavigator {...navCofig} onPress={onPress} />
//           ) : (
//             hasNav == true && <TopNavigator {...navCofig} onPress={onPress} />
//           )}
//           <Layout style={[styles.innerFixed, style]}>{children}</Layout>
//         </SafeAreaView>
//       </View>
//     </>
//   );
// };

// const ScreenWithScrolling = ({
//   statusBar,
//   statusBackGround,
//   style,
//   hasNav,
//   navCofig,
//   onPress,
//   children,
//   _onRefresh,
// }) => {
//   const ref = useRef();
//   const handleScroll = event => {
//     console.log(event.nativeEvent.contentOffset.y);
//     // ref.current.scrollTo({ x: 0, y: event.nativeEvent.contentOffset.y+50, animated: false })
//   };
//   return (
//     <>
//       <StatusBar
//         // hidden={hasNav == "Auth"}
//         barStyle={statusBar}
//         backgroundColor={statusBackGround}
//       />
//       <View style={{ backgroundColor: '#fff', flex: 1 }}>
//         <SafeAreaView style={styles.container}>
//           <Layout style={styles.container}>
//             {hasNav && hasNav == 'Auth' ? (
//               <AuthNavigator {...navCofig} onPress={onPress} />
//             ) : (
//               hasNav == true && <TopNavigator {...navCofig} onPress={onPress} />
//             )}
//             <KeyboardAvoidingView
//               style={{ flex: 1 }}
//               // contentContainerStyle={{flex:1}}
//               keyboardVerticalOffset={
//                 Platform.OS === 'ios' ? heightPercentageToDP('6') : null
//               }
//               behavior={Platform.OS === 'ios' ? 'padding' : null}>
//               <ScrollView
//                 ref={ref}
//                 style={styles.container}
//                 // onScroll={handleScroll}
//                 refreshControl={
//                   <RefreshControl refreshing={false} onRefresh={_onRefresh} />
//                 }
//                 contentContainerStyle={[styles.innerScroll, style]}>
//                 {children}
//               </ScrollView>
//             </KeyboardAvoidingView>
//           </Layout>
//         </SafeAreaView>
//       </View>
//     </>
//   );
// };

// export const Screen = props => {
//   if (props.type === 'fixed') {
//     return <ScreenWithoutScrolling {...props} />;
//   }
//   return <ScreenWithScrolling {...props} />;
// };

// const propTypes = {
//   statusBar: PropTypes.string,
//   statusBackGround: PropTypes.string,
//   style: PropTypes.shape({}),
//   children: PropTypes.node.isRequired,
//   hasNav: PropTypes.bool,
//   navCofig: PropTypes.shape({}),
// };
// ScreenWithoutScrolling.propTypes = propTypes;
// ScreenWithScrolling.propTypes = propTypes;

// const defaultProps = {
//   statusBar: 'dark-content',
//   statusBackGround: COLORS.primary,
//   style: {},
//   hasNav: true,
//   navCofig: {},
// };
// ScreenWithoutScrolling.defaultProps = defaultProps;
// ScreenWithScrolling.defaultProps = defaultProps;

// Screen.propTypes = { type: PropTypes.string };
// Screen.defaultProps = { type: 'fixed' };
