import React from "react";
import { StyleSheet, Image } from "react-native";
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
  View,
  Right,
  Grid,
  Col,
} from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Customer } from "./CustomersScreen";
import { AppLoading } from "expo";
import MapView, { Marker } from "react-native-maps";

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
      cardStype: {},
      headerTitleContainerStyle: {
        padding: 0,
      },
      headerTintColor: "white",
      headerBackTitleStyle: {
        alignSelf: "flex-start",
      },
      headerTitleStyle: {
        color: "white",
        left: -15,
        marginLeft: 15,
      },
      headerStyle: {
        backgroundColor: "#000000",
        height: 175,
      },
      headerTitle: ({ children, style }) => {
        const { customer } = this.state;
        return (
          <>
            <Text note style={{ fontSize: 12, fontWeight: "200" }}>
              Customer
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "500",
                color: "white",
                textTransform: "capitalize",
              }}
            >
              {customer.name}
            </Text>
            <Card>
              <CardItem>
                <Left>
                  <Body>
                    <Text note>Account</Text>
                    <Text style={{ fontSize: 18, fontWeight: "500" }}>
                      xxxxxxxx345
                    </Text>
                  </Body>
                </Left>
              </CardItem>
            </Card>
          </>
        );
      },
      // headerBackground: () => (
      //   <View style={{ backgroundColor: "black" }}>
      //     <LinearGradient
      //       // Background Linear Gradient
      //       colors={["rgba(255,255,255,0.1)", "transparent", "transparent"]}
      //       start={[0.5, 0]}
      //       end={[1, 1]}
      //     />
      //   </View>
      // ),
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
  getLoadProgress(customer: Customer) {
    return `${(customer.loan_repaid / customer.loan_amount) * 100}%`;
  }
  render() {
    const { customer } = this.state;
    if (!customer) {
      return <AppLoading></AppLoading>;
    }
    return (
      <Container
        style={{
          flex: 1,
          paddingVertical: 10,
          paddingHorizontal: 10,
          justifyContent: "flex-start",
          alignItems: "stretch",
        }}
      >
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 10,
            height: 50,
            marginLeft: -10,
            marginTop: -10,
            marginRight: -10,
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          {!!customer.arrears && (
            <>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: !customer.arrears
                      ? "rgba(0, 128, 0, 0.63)"
                      : "rgba(255, 0, 0, 0.63)",
                  }}
                >
                  Outstanding Arrears Balance
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    color: !customer.arrears
                      ? "rgba(0, 128, 0, 0.63)"
                      : "rgba(255, 0, 0, 0.63)",
                  }}
                >
                  $ {customer.arrears}
                </Text>
              </View>
              <View>
                <Text>🙁</Text>
              </View>
            </>
          )}
          {!customer.arrears && (
            <>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    color: !customer.arrears
                      ? "rgba(0, 128, 0, 0.63)"
                      : "rgba(255, 0, 0, 0.63)",
                  }}
                >
                  No Outstanding Arrears Balance
                </Text>
              </View>
              <View>
                <Text>🙂</Text>
              </View>
            </>
          )}
          {/* <Text>
            {!!customer.arrears && "🙁"}
            {!!customer.prepayment && "🙂"}
          </Text> */}
        </View>
        <ScrollView>
          <Card>
            <CardItem>
              <Left style={{ flex: 1 }}>
                <Text>Total Loan Left</Text>
              </Left>
              <Right>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "green",
                  }}
                >
                  $ {customer.loan_amount - customer.loan_repaid}
                </Text>
              </Right>
            </CardItem>
            <CardItem style={{ paddingTop: 0 }}>
              <Body>
                <View
                  style={{
                    borderRadius: 5,
                    height: 10,
                    flex: 1,
                    width: "100%",
                    overflow: "hidden",
                    backgroundColor: "#e1e1e1",
                  }}
                >
                  <View
                    style={{
                      borderRadius: 5,
                      height: "100%",
                      width: this.getLoadProgress(customer),
                      backgroundColor: "green",
                    }}
                  ></View>
                </View>
              </Body>
            </CardItem>
            <CardItem style={{ paddingTop: 0 }}>
              <Body>
                <Button block style={{ backgroundColor: "black" }}>
                  <Text>Make Payment</Text>
                </Button>
              </Body>
            </CardItem>
          </Card>
          <Grid style={{ flexWrap: "wrap" }}>
            <Col
              style={{
                padding: 5,
                marginBottom: 0,
                height: 100,
                width: "50%",
              }}
            >
              <Card>
                <CardItem
                  style={{
                    flexWrap: "wrap",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <Text note>Loan Arrears</Text>
                  <Text>${customer.arrears}</Text>
                </CardItem>
              </Card>
            </Col>
            <Col
              style={{
                padding: 5,
                paddingBottom: 0,
                marginBottom: 0,
                height: 100,
                width: "50%",
              }}
            >
              <Card>
                <CardItem
                  style={{
                    flexWrap: "wrap",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <Text note>Loan Prepayment</Text>
                  <Text>${customer.prepayment}</Text>
                </CardItem>
              </Card>
            </Col>
            <Col
              style={{
                padding: 5,
                paddingTop: 0,
                height: 100,
                width: "50%",
              }}
            >
              <Card>
                <CardItem
                  style={{
                    flexWrap: "wrap",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <Text note>Load Paid</Text>
                  <Text>${customer.loan_repaid}</Text>
                </CardItem>
              </Card>
            </Col>
            <Col
              style={{
                padding: 5,
                paddingTop: 0,
                height: 100,
                width: "50%",
              }}
            >
              <Card>
                <CardItem
                  style={{
                    flexWrap: "wrap",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <Text note>Load Total</Text>
                  <Text>${customer.loan_amount}</Text>
                </CardItem>
              </Card>
            </Col>
          </Grid>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              paddingVertical: 5,
            }}
          >
            Location
          </Text>
          <Card>
            <CardItem header>
              <Grid>
                <Col style={{ width: 32 }}>
                  <Image
                    source={require("../assets/location.png")}
                    style={{
                      width: 24,
                      height: 24,
                    }}
                  />
                </Col>
                <Col>
                  <Text>{customer.coordinates}</Text>
                  <Text note style={{ textTransform: "capitalize" }}>
                    {customer.city}, {customer.location}, {customer.region}
                  </Text>
                </Col>
              </Grid>
            </CardItem>
            <CardItem cardBody>
              <MapView style={styles.mapStyle}>
                <Marker coordinate={{ latitude: 5.6037, longitude: -0.187 }} />
              </MapView>
            </CardItem>
          </Card>
        </ScrollView>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  mapStyle: {
    flex: 1,
    height: 200,
  },
});
