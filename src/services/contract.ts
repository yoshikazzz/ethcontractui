// tslint:disable:no-string-literal

import Web3 from 'web3';

import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../config';

export type Content = {
  author: string,
  title: string,
  totalSupply: number,
  price: number,
  contentPath: string,
  contentHash: string,
  thumbnail: string
};

class Contract {
  private get web3() {
    const web3: any = window['web3'];
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

  public async getStoreContents() {
    return this.getContents([
      '0xfc8916b97093d54a65d063c3633becdefc8916b97093d54a65d063c3633becde',
      '0x3a8a3662c8af560c2526643971a69e9d3a8a3662c8af560c2526643971a69e9d',
      '0x2441e0deeab01aa432ea47c2f27ff0f82441e0deeab01aa432ea47c2f27ff0f8',
      '0xca222726e9f2a2fa2cca07ae020c69f9ca222726e9f2a2fa2cca07ae020c69f9',
      '0x7a5ed087a0763c1fde7b994894ee156f7a5ed087a0763c1fde7b994894ee156f',
    ]);
  }

  public async purchaseContent(contentHash: string, value: number) {
    const web3: Web3 = new Web3('');
    web3.setProvider(this.web3.currentProvider);
    const contract = new web3.eth.Contract(CONTRACT_ABI);
    contract.options.address = CONTRACT_ADDRESS;
    const transaction = contract.methods.purchase(contentHash);
    const txConfig = {
      from: this.web3.eth.defaultAccount,
      to: CONTRACT_ADDRESS,
      value: web3.utils.toWei(value.toString(), 'ether'),
      gas: web3.utils.toHex('300000'),
    };
    const tx: string = await transaction.send(txConfig);
    console.log(tx);
    return tx;
  }

  public async getMyBooks() {
    const web3: Web3 = new Web3('');
    web3.setProvider(this.web3.currentProvider);
    const contract = new web3.eth.Contract(CONTRACT_ABI);
    contract.options.address = CONTRACT_ADDRESS;
    const txConfig = {
      from: this.web3.eth.defaultAccount,
    };
    const numContents: string = await contract.methods.getNumContents().call({...txConfig});
    const contentHashs: string[] = [];
    for (let i = 0; i < parseInt(numContents, 10); i++) {
      const hash: string = await contract.methods.userContentByIndex(i).call({...txConfig});
      contentHashs.push(hash);
    }
    const contents = await this.getContents(contentHashs);
    return contents;
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

  private async getContents(contentHashs: string[]) {
    const web3: Web3 = new Web3('');
    web3.setProvider(this.web3.currentProvider);
    const contract = new web3.eth.Contract(CONTRACT_ABI);
    contract.options.address = CONTRACT_ADDRESS;

    const results: Content[] = [];
    for (let hash of contentHashs) {
      const content: Content = await contract.methods.contents(hash).call();
      const ipfsHashTest = /\/(\w+)$/.exec(content.contentPath);
      let ipfsHash = ipfsHashTest && ipfsHashTest.length >= 2 ? ipfsHashTest[1] : '';
      results.push({
        title: content.title,
        author: content.author,
        totalSupply: content.totalSupply,
        contentPath: content.contentPath,
        price: web3.utils.fromWei(content.price, 'ether'),
        contentHash: hash,
        thumbnail: `thumbnails/${ipfsHash}.png`,
      });
    }

    return results;
  }
}

export default new Contract();
