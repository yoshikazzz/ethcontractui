import {
  PromiseCancelable,
} from '../types';
export const networkToString = (id: string): string => {
  let network = 'Unknown';
  switch (id) {
    case '1':
      network = 'Mainnet';
      break;
    case '3':
      network = 'Ropsten';
      break;
    case '4':
      network = 'Rinkeby';
      break;
    case '42':
      network = 'Kovan';
      break;
    default:
      break;
  }
  return network;
};

export const normalizeNumber = (value: string, previousValue?: string) => value ? parseInt(value.replace(/[,.]/g, ''), 10).toLocaleString() : '';

export const makeCancelable = <T>(promise: Promise<T>): PromiseCancelable<T> => {
  let canceled = false;

  const wrappedPromise = new Promise<T>((resolve, reject) => {
    promise.then(
      val => canceled ? reject({isCanceled: true}) : resolve(val),
      error => canceled ? reject({isCanceled: true}) : reject(error)
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      canceled = true;
    },
  };
};
