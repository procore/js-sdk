import 'isomorphic-fetch'
import _hostname from './hostname'

export interface TokenConfig {
  id: string;
  secret: string;
  code: string;
  uri: string;
  hostname?: string; // TODO: This does not seem to be used in code.
}

function token({ id, secret, code, uri }: TokenConfig, hostname: string = _hostname): Promise<any> {
  return fetch(
    `${hostname}/oauth/token?grant_type=authorization_code&code=${code}&client_id=${id}&client_secret=${secret}&redirect_uri=${uri}`,
    { method: 'POST' })
    .then(res => res.json());
}

export default token
