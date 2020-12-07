import { NetInfo } from 'react-native';

function isOffline() {
  return new Promise((resolve, reject) => {
    NetInfo.getConnectionInfo()
      .then((connectionInfo) => {
        connectionInfo.type === 'none' ? resolve(false) : resolve(true);
      })
      .catch(reject);
  });
}

export default {
  isOffline
}