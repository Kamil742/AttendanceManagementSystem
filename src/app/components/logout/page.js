import { keycloak } from '../utils/keycloak';

export default function Logout() {
  keycloak.logout({ redirectUri: window.location.origin });
}
