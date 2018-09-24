
import Api from './api';
import { API_KEY, API_LIST } from '../config/';

class Dashboard extends Api {
  public constructor() {
    super();
    this.getABI = this.getABI.bind(this);
  }

  public async getABI(args: {network: string, address: string}) {
    const url = API_LIST[args.network];
    if (!url) {
      return undefined;
    } else {
      const api = `${url}/api?module=contract&action=getabi&address=${args.address}&apikey=${API_KEY}`;
      const result = await this.get({ url: api });
      const abi = result.result;
      if (!abi) {
        return [];
      } else {
        return JSON.parse(abi);
      }
    }
  }
}

export default new Dashboard();
