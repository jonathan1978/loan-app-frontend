import React, { Component } from "react";
import { StyleSheet, Keyboard, Image, View } from "react-native";
import {
  Text,
  Item,
  Input,
  Spinner,
  Toast,
  Container,
  Header,
  Content,
  Form,
  Label,
  Button,
} from "native-base";
import { Login as L } from "../services/ApiService";

export default class LoginScreen extends Component {
  props: any;
  constructor(props) {
    super(props);
    this.props = this.props as any;
    this.props.navigation.setOptions({
      headerMode: "none",
      headerShown: false,
    });
  }
  state = {
    email: undefined,
    password: undefined,
    isLoading: false,
  };

  enterCredentials = (text, type) => {
    this.setState({
      [type]: text,
    });
  };

  renderToast = (message, type: any = "danger") => {
    Toast.show({
      text: message,
      position: "bottom",
      type,
      duration: 2000,
      buttonText: "Ok",
    });
  };

  login = () => {
    // Keyboard.dismiss();

    const { email, password } = this.state;

    if (!email || !password) {
      this.renderToast("Please enter email and password");
      return;
    }

    if (!this.validateEmail(email)) {
      this.renderToast("Please enter valid email.");
      return;
    }

    L(email, password)
      .then(() => {
        this.props.navigation.navigate("Customers");
      })
      .catch((e) => {
        this.renderToast(e.message);
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  };

  validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  render() {
    const { isLoading, email } = this.state;
    const isValidEmail = this.validateEmail(email);

    return (
      <Container style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
        {/* <Header /> */}
        {/* <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text>Home Screen</Text>
        </View> */}
        {/* <Content style={{ backgroundColor: 'green'}}> */}

        <Image
          source={require("../assets/logo.png")}
          style={{
            width: 80,
            height: 80,
            marginTop: 80,
            marginBottom: 25,
            justifyContent: "center",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
        <Form style={{}}>
          {/* <Item stackedLabel error={!isValidEmail} success={isValidEmail}>
            <Label>Your email</Label>
            <Input  keyboardType='email-address' onChangeText={(text) => this.enterCredentials(text, 'email')} />
            <Icon name={isValidEmail ? 'checkmark-circle' : 'close-circle'} />
          </Item> */}
          <Item stackedLabel>
            <Label>Your email</Label>
            <Input
              keyboardType="email-address"
              onChangeText={(text) => this.enterCredentials(text, "email")}
            />
            {/* <Icon name={isValidEmail ? 'checkmark-circle' : 'close-circle'} /> */}
          </Item>
          <Item stackedLabel>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              onChangeText={(text) => this.enterCredentials(text, "password")}
            />
          </Item>
          <Button
            style={styles.submit}
            disabled={isLoading}
            primary
            block
            onPress={this.login}
          >
            <Image
              source={require("../assets/login-w.png")}
              style={{ width: 24, height: 24 }}
            />
            <Text> Log in </Text>
          </Button>
          {isLoading && <Spinner />}
        </Form>
        {/* </Content> */}
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
  },
  submit: {
    marginTop: 40,
    backgroundColor: 'black'
  },
});
