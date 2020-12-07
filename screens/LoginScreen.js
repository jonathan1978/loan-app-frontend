import React, { Component } from 'react';
import { StyleSheet, Keyboard, Image } from 'react-native';
import { Text, Item, Input, Spinner, Toast, Icon } from 'native-base';
import { Login as L } from '../services/ApiService';
import Internet from '../services/InternetService';
import Colors from '../constants/Colors';

export default class LoginScreen extends Component {

  state = {
    email: undefined,
    password: undefined,
    isLoading: false
  }

  enterCredentials = (text, type) => {
    this.setState({
      [type]: text
    });
  }

  renderToast = (message, type = 'danger') => {
    return (
      Toast.show({
        text: message,
        position: 'bottom',
        type,
        duration: 2000
      })
    );
  }

  login() {
    Keyboard.dismiss();

    const { email, password } = this.state;

    if (!email || !password) {
      this.renderToast('Please enter email and password');
      return;
    }

    if (!this.validateEmail(email)) {
      this.renderToast('Please enter valid email.');
      return;
    }

    L(email, password).then(() => {
      this.props.navigation.navigate('Customers');
    })
      .catch(e => {
        this.renderToast(e.message);
      })
      .finally(() => {
        this.setState({
          isLoading: false
        });
      })
  }

  checkInternetAndLogin = async () => {
    let isConnection = await Internet.isOffline();
    if (isConnection) {
      this.login();
    }
    else {
      this.renderToast('Device offline');
    }
  }

  validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }



  render() {
    const { isLoading, email } = this.state;
    const isValidEmail = this.validateEmail(email);
    return (
      <Container>
        <Header />
        <Content>
          <Image
            source={require('../assets/logo.svg')}
            style={{ width: 40, height: 40 }} />
          <Form>
            <Item floatingLabel error={!isValidEmail} success={isValidEmail}>
              <Label>Your email</Label>
              <Input keyboardType='email-address' onChangeText={(text) => this.enterCredentials(text, 'email')} />
              <Icon name={isValidEmail ? 'checkmark-circle' : 'close-circle'} />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input secureTextEntry={true} onChangeText={(text) => this.enterCredentials(text, 'password')} />
            </Item>
            <Item>
              <Button disabled={isLoading} primary block onPress={this.checkInternetAndLogin}><Text> Primary </Text></Button>
              {isLoading && <Spinner color={Colors.primary} />}
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }

}
