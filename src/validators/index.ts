import Web3 from 'web3';
const web3 = new Web3('');

export const createRequiredValidator = (message?: string) => (value: any) => {
  if (value instanceof Array) {
    return value.length ? undefined : message || 'Required input';
  }
  return value ? undefined : message || 'Required input';
};

export const createNumberValidator = (message?: string) => (value: string) => {
  return value && isNaN(Number(value.replace(/[,.]/g, ''))) ? 'Invalid number format' : undefined;
};

export const createAddressValidator = (message?: string) => (value: string) => {
  return value && web3.utils.isAddress(value) ? undefined : 'Invalid address format';
};
