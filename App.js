import React from 'react';
import * as Font from 'expo-font';
import 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

import { AppLoading } from 'expo';
import { isLogined } from './services/ApiService';
import LoginScreen from './screens/LoginScreen';
import CustomersScreen from './screens/CustomersScreen';
import SingleCustomerScreen from './screens/SingleCustomerScreen';


/**
 *Initial function which runs as soon as the app starts.
 *
 * @export
 * @class App
 * @extends {React.Component}
 */
export default class App extends React.Component {
  state = {
    isReady: false,
    intialRouteName: 'Customers'
  };


  async componentWillMount() {
    await this.loadResources();
    const isLogin = await isLogined();
    this.setState({ isReady: true, initialRouteName: !isLogin ? 'Login' : this.state.initialRouteName });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    // const { resources, permissions } = this.state;
    // if (resources.loading || permissions.loading) {
    //   if (resources.loading) {
    //     return <AppLoading />;
    //   }
    //   if (permissions.loading) {
    //     return (
    //       <View style={styles.containerofPermissions}>
    //         <Text style={styles.permissionsDeniedText}>{permissions.message}</Text>
    //         <View style={styles.allowPermissionButtonContainer}>
    //           <Button primary style={styles.permissionsButton}
    //             onPress={this.getPermissions}>
    //             <Text style={styles.permissionsButtonText}> Allow Permissions </Text>
    //           </Button>
    //         </View>
    //       </View>
    //     );
    //   }
    // } else {
    /* {Platform.OS === 'ios' && <StatusBar barStyle="default" backgroundColor="#00101d" />} */
    /* {Platform.OS === 'android' && <StatusBar hidden={false} translucent={true} backgroundColor="#00101d" />} */
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={this.state.intialRouteName}>
          <Stack.Screen name="Customers" component={CustomersScreen} />
          <Stack.Screen name="SingleCustomer" component={SingleCustomerScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  /**
   *Loading assets (fonts and images)
   *
   * @memberof App
   */
  loadResources = async () => {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    })
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },

//   permissionsDeniedText: {
//     fontSize: 20,
//     color: '#333',
//   },

//   allowPermissionButtonContainer: {
//     marginTop: 5
//   },

//   permissionsButtonText: {
//     fontSize: 18,
//     color: '#fff',
//   },

//   permissionsButton: {
//     padding: 5,
//   },

//   containerofPermissions: {
//     flex: 1,
//     backgroundColor: '#fff',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//   }
// });
