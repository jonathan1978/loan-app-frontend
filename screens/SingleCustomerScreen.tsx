import React from "react";
import { StyleSheet } from "react-native";
import {
  Button,
  Container,
  Text,
  List,
  Left,
  Body,
  ListItem,
  Icon,
  Form,
  Item,
  Input,
  Card,
  CardItem,
} from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Customer } from "./CustomersScreen";

export default class SingleCustomerScreen extends React.Component {
  props: any;
  state: {
    customer: Customer;
  } = {
    customer: null,
  };
  constructor(props) {
    super(props);
    this.props.navigation.setOptions({
      headerMode: "screen",
      cardStype: {
        backgroundColor: "#000",
      },
      headerTitle: ({ children, style }) => {
        const { customer } = this.state;
        return (
          <>
            <Text note style={{ fontSize: 12, fontWeight: "200" }}>
              Customer
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "500" }}>
              {customer.name}
            </Text>
            <Card>
              <CardItem>
                <Left>
                  <Body>
                    <Text note>Account</Text>
                    <Text style={{ fontSize: 18, fontWeight: "500" }}>xxxxxxxx345</Text>
                  </Body>
                </Left>
              </CardItem>
            </Card>
          </>
        );
      },
      headerStyle: {
        height: 200,
        alignItems: "start",
        justifyContent:'start',
        paddingBottom: 15
      },
      headerBackground: () => (
        <LinearGradient
          // Background Linear Gradient
          colors={["rgba(255,255,255,0.8)", "transparent"]}
          start={[0.5, 0]}
          end={[1, 1]}
        />
      ),
    });
  }
  componentDidMount() {
    // if (!this.props.route.params["customer"]) {
    //   this.props.navigation.goBack();
    // }
    this.setState({
      customer: this.props.route.params["customer"],
    });
  }
  render() {
    return (
      <Container
        style={{ paddingVertical: 10, paddingHorizontal: 10, paddingTop: 100 }}
      >
        <Form style={{ paddingHorizontal: 10 }}>
          <Item rounded>
            <Input placeholder="Search Customers"></Input>
            <Icon name="search"></Icon>
          </Item>
        </Form>
        <ScrollView></ScrollView>
      </Container>
    );
  }
}
