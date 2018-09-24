import axios from 'axios';
// import { load, isExpired, remove } from '../storage/expiration-storage';

export interface NetWorkArgs {
  url: string;
  param?: any;
}
// const baseURL = '';

export interface NetworkResponse {
  status?: boolean;
  result?: string;
  message?: string;
  data?: any;
}

export interface NetWorkArgs {
  url: string;
  param?: any;
}

// const config = {
//   headers: {
//     'Content-type': 'application/json;charset=UTF-8',
//     'X-Requested-With': 'XMLHttpRequest',
//   },
// };
export default class Api {
  public config: any;

  public constructor() {
    this.get = this.get.bind(this);
    this.post = this.post.bind(this);
    this.put = this.put.bind(this);
    
  }

  public post(args: NetWorkArgs): Promise<NetworkResponse> {
    // console.log('Calling post with param: ' + JSON.stringify(args));
    return new Promise((done, fail) => {
      axios.post(`${args.url}`, args.param).then(response => {
        const result: NetworkResponse = response.data;
        // console.log('Result post with ' + JSON.stringify(result));
        done(result);
      }).catch(e => {
        console.log('Network post error: ' + e);
        fail(e);
      });
    });
  }

  public put(args: NetWorkArgs): Promise<NetworkResponse> {
    return new Promise((done, fail) => {
      axios.put(`${args.url}`, args.param).then(response => {
        const result: NetworkResponse = response.data;
        // console.log('Result PUT with ' + JSON.stringify(result));
        done(result);
      }).catch(e => {
        console.log('Network PUT error: ' + e);
        fail(e);
      });
    });
  }

  public get(args: NetWorkArgs): Promise<NetworkResponse> {
    // console.log('Calling get with param: ' + JSON.stringify(args));

    return new Promise((done, fail) => {
      axios.get(`${args.url}`).then(response => {
        const result: NetworkResponse = response.data;
        // console.log('Result get with ' + JSON.stringify(result));
        done(result);
      }).catch(e => {
        console.log('Network get error: ' + e);
        fail(e);
      });
    });
  }
}