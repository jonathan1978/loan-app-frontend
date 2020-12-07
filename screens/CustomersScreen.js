import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Button, Container, Content, Text } from 'native-base';
import { ListCustomers } from '../services/ApiService';

export default class CustomersScreen extends Component {
  componentDidMount() {
    ListCustomers().then(rs => {
      console.log(rs);
    });
  }
  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <List>
            <ListItem avatar>
              <Left>
                <Button>
                  <Text>K</Text>
                </Button>
              </Left>
              <Body>
                <Text>Kumar Pratik</Text>
                <Text note>Doing what you like will always keep you happy . .</Text>
              </Body>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
