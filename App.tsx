import React from "react";
import * as Font from "expo-font";
import "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

import { AppLoading } from "expo";
import { isLogined } from "./services/ApiService";
import LoginScreen from "./screens/LoginScreen";
import CustomersScreen from "./screens/CustomersScreen";
import SingleCustomerScreen from "./screens/SingleCustomerScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Root } from "native-base";
import { StatusBar } from "react-native";
const Stack = createStackNavigator();

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
    initialRouteName: "Customers",
  };

  async componentDidMount() {
    try {
      await this.loadResources();
    } catch (e) {
      console.log(e);
    }
    const isLogin = await isLogined();
    console.log("is LOgined", isLogin);
    this.setState({
      isReady: true,
      initialRouteName: !isLogin ? "Login" : this.state.initialRouteName,
    });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return (
      <Root>
        <StatusBar
          backgroundColor="black"
          barStyle="light-content"
          translucent
        ></StatusBar>
        <NavigationContainer documentTitle={{ enabled: false }}>
          <Stack.Navigator
            initialRouteName={this.state.initialRouteName}
            screenOptions={{
              animationEnabled: true,
            }}
          >
            <Stack.Screen name="Customers" component={CustomersScreen} />
            <Stack.Screen
              name="SingleCustomer"
              component={SingleCustomerScreen}
            />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Root>
    );
  }
  /**
   *Loading assets (fonts and images)
   *
   * @memberof App
   */
  async loadResources() {
    return await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf"),
      ...Ionicons.font,
    });
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
