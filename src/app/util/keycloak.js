// util/keycloak.js

import Keycloak from 'keycloak-js';

export const initializeKeycloak = () => {

    const keycloak = new Keycloak({
        url: 'http://localhost:8080/',
        realm: 'next',
        clientId: 'Client-Test'
    });
    
  return new Promise((resolve, reject) => {
    keycloak
      .init({ onLoad: 'login-required' })
      .then((authenticated) => {
        if (authenticated) {
          console.log('User is authenticated');
          resolve();
        } else {
          console.log('User is not authenticated');
          reject('User not authenticated');
        }
      })
      .catch((error) => {
        console.error('Keycloak initialization failed:', error);
        reject(error);
      });
  });
};

export default initializeKeycloak;
