export type inputItem = {
  name: string,
  type: string,
};
export type outputItem = {
  name: string,
  type: string,
};

export type abiItem = {
  constant?: boolean,
  inputs?: Array<inputItem>,
  outputs?: Array<outputItem>,
  payable?: boolean,
  stateMutability?: string,
  type?: string,
  name?: string,
  anonymous?: boolean,
};

export type abiList = Array<abiItem>;
