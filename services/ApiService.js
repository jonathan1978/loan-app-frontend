import AsyncStorage from '@react-native-async-storage/async-storage';
import { CONFIG } from '../config';

export async function isLogined() {
  return !! await AsyncStorage.getItem('isLogined');
}
export async function Login(email, password) {
  const res = await fetch(CONFIG.API + '/login', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  const rs = await res.json();
  if (rs.error) {
    throw new Error(rs.error);
  }
  await AsyncStorage.setItem('isLogined', '1');
  return rs;
}
export async function Logout() {
  const res = await fetch(CONFIG.API + '/logout', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  const rs = await res.json();
  if (rs.error) {
    throw new Error(rs.error);
  }
  await AsyncStorage.setItem('isLogined', '0');
  return rs;
}
export async function ListCustomers() {
  const res = await fetch(CONFIG.API + '/customers', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  const rs = await res.json();
  if (rs.error) {
    throw new Error(rs.error);
  }
  console.log(rs);
  return rs;
}
export async function CustomerInfo(custName) {
  if (custName) {
    throw new TypeError('Invalid Customer Name');
  }
  const res = await fetch(CONFIG.API + `/customers/${custName}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  const rs = await res.json();
  if (rs.error) {
    throw new Error(rs.error);
  }
  console.log(rs);
  return rs;
}
