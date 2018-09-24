
import Api from './api';

class Config extends Api {
  public constructor() {
    super();
  }

  public getConfig = async () => {
      const url = 'config.json';
      const result = await this.get({ url });
      return result;
  }

  public getScaffoldConfig = async () => {
    const url = 'scaffold.json';
    const result = await this.get({ url });
    return result;
  }
}

export default new Config();
