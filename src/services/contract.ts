// tslint:disable:no-string-literal

import Web3 from 'web3';

class Contract {
  private get web3() {
    const web3: any = global['web3'];
    return web3;
  }

  public async getAccount() {
    if (!this.web3) {
      throw new Error('Web3 is not injected');
    }
    return this.web3.eth.defaultAccount;
  }

  public async getBalance() {
    if (!this.web3) {
      throw new Error('Web3 is not injected');
    }
    const web3 = new Web3('');
    web3.setProvider(this.web3.currentProvider);

    const account = this.web3.eth.defaultAccount;
    if (!web3.utils.isAddress(account)) {
      return '';
    }
    const balance = await web3.eth.getBalance(account);
    return web3.utils.fromWei(balance, 'ether');
  }

  public getNetwork(): Promise<string> {
    return new Promise((done, fail) => {
      if (!this.web3) {
        return fail(new Error('Web3 is not injected'));
      }
      this.web3.version.getNetwork((err, res) => {
        if (err) {
          fail(err);
        } else {
          done(res);
        }
      });
    });
  }
}

export default new Contract();
