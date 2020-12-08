import React, { Component } from "react";
import { StyleSheet, Image } from "react-native";
import {
  Button,
  Container,
  Text,
  List,
  Left,
  Body,
  ListItem,
  Form,
  Item,
  Input,
} from "native-base";
import { ListCustomers, Logout } from "../services/ApiService";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { AppLoading } from "expo";
export class Customer {
  "arrears": number;
  "city": string;
  "contact": string;
  "coordinates": string;
  "id": number;
  "loan_amount": number;
  "loan_repaid": number;
  "location": string;
  "name": string;
  "prepayment": number;
  "region": string;
}
export default class CustomersScreen extends Component {
  props: any;
  state: {
    customers: Customer[];
    isLoading: boolean;
  } = {
    customers: [],
    isLoading: true,
  };
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.props.navigation.setOptions({
      headerTransparent: true,
      headerMode: "screen",
      headerTitle: ({ children, style }) => {
        return (
          <Text style={{ ...style, fontSize: 30, fontWeight: "bold" }}>
            {children}
          </Text>
        );
      },
      headerStyle: {
        height: 100,
      },
      headerRight: ({}) => {
        return (
          <Button transparent onPress={this.logout.bind(this)}>
            <Image
              source={require("../assets/logout.png")}
              style={{
                width: 24,
                height: 24,
                marginRight: 5
              }}
            />
            {/* <Ionicons name="log-out-outline" size={24} color="black" /> */}
          </Button>
        );
      },
    });
  }
  componentDidMount() {
    ListCustomers()
      .then((rs: { [x: string]: any }) => {
        this.setState({
          customers: rs["data"],
        });
      })
      .catch((r: any) => {
        console.error(r);
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  }
  logout() {
    Logout().then(() => {
      this.props.navigation.navigate("Login");
    });
  }
  showCustomer(c: Customer) {
    this.props.navigation.navigate("SingleCustomer", {
      customer: c,
    });
  }
  renderCustomers() {
    const { customers } = this.state;
    console.log(customers);
    return customers.map((c) => {
      return (
        <ListItem avatar key={c.id} onPressOut={() => this.showCustomer(c)}>
          <Left>
            <Button
              rounded
              touchSoundDisabled
              style={{
                width: 48,
                height: 48,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 15 }}>
                {c.name ? c.name.charAt(0) : ""}
              </Text>
            </Button>
          </Left>
          <Body>
            <Text style={{ textTransform: "capitalize" }}>{c.name}</Text>
            <Text style={{ fontWeight: "bold" }}>$ {c.loan_amount}</Text>
            <Text note style={{ textTransform: "capitalize" }}>
              {c.city}, {c.location}, {c.region}
            </Text>
          </Body>
          {/* <Right>
            <Text note>3:43 pm</Text>
          </Right> */}
        </ListItem>
      );
    });
  }
  render() {
    return (
      <Container
        style={{ paddingVertical: 10, paddingHorizontal: 10, paddingTop: 100 }}
      >
        <Form style={{ paddingHorizontal: 10 }}>
          <Item rounded style={{paddingHorizontal: 10}}>
            <Input placeholder="Search Customers"></Input>
            <Image
              source={require("../assets/search.png")}
              style={{
                width: 24,
                height: 24,
              }}
            />
          </Item>
        </Form>
        <ScrollView>
          {this.state.isLoading ? (
            <AppLoading />
          ) : (
            <List>{this.renderCustomers()}</List>
          )}
        </ScrollView>
      </Container>
    );
  }
}
