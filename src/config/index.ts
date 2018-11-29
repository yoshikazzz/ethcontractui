export const API_LIST = {
  '1': 'https://api.etherscan.io/',
  '3': 'https://api-ropsten.etherscan.io/',
  '4': 'https://api-rinkeby.etherscan.io',
  '42': 'https://api-kovan.etherscan.io',
};

export const API_KEY = 'GDP1P4EWWTXJZUVNMKIQMZHZUUKMC21QCE';
export const APP_NAME = 'Eth-Contract-UI';

export const DEFAULT_GAS_PRICE = '21';
export const DEFAULT_GAS_LIMIT = '3000000';

export const PROJECT_NAME = 'Eth-Contract';

export const CONTRACT_ADDRESS = '0xACc46AC178fE7FF7B24d8C324D0D7d6eB540985C';

export const CONTRACT_ABI = [{
  constant: true,
  inputs: [],
  name: 'getNumContents',
  outputs: [{
    name: 'numContents',
    type: 'uint256'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: false,
  inputs: [],
  name: 'destruct',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  constant: true,
  inputs: [{
    name: '_index',
    type: 'uint256'
  }],
  name: 'userContentByIndex',
  outputs: [{
    name: 'contentHash',
    type: 'bytes32'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    name: '_to',
    type: 'address'
  }, {
    name: '_contentHash',
    type: 'bytes32'
  }],
  name: 'issue',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    name: '_contentHash',
    type: 'bytes32'
  }, {
    name: '_contentPath',
    type: 'string'
  }, {
    name: '_title',
    type: 'string'
  }, {
    name: '_price',
    type: 'uint256'
  }],
  name: 'publish',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    name: 'newOwner',
    type: 'address'
  }],
  name: 'transferOwnershipOfContract',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    name: '_to',
    type: 'address'
  }, {
    name: '_contentHash',
    type: 'bytes32'
  }],
  name: 'transferAuthorship',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    name: '_to',
    type: 'address'
  }, {
    name: '_contentHash',
    type: 'bytes32'
  }],
  name: 'transfer',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  constant: true,
  inputs: [],
  name: 'owner',
  outputs: [{
    name: '',
    type: 'address'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: true,
  inputs: [],
  name: 'getNumPublications',
  outputs: [{
    name: 'numContents',
    type: 'uint256'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: true,
  inputs: [{
    name: '',
    type: 'bytes32'
  }, {
    name: '',
    type: 'address'
  }],
  name: 'ownerships',
  outputs: [{
    name: '',
    type: 'bool'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    name: '_contentHash',
    type: 'bytes32'
  }],
  name: 'purchase',
  outputs: [],
  payable: true,
  stateMutability: 'payable',
  type: 'function'
}, {
  constant: true,
  inputs: [{
    name: '_index',
    type: 'uint256'
  }],
  name: 'authorContentByIndex',
  outputs: [{
    name: 'contentHash',
    type: 'bytes32'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: true,
  inputs: [{
    name: '',
    type: 'bytes32'
  }],
  name: 'contents',
  outputs: [{
    name: 'author',
    type: 'address'
  }, {
    name: 'title',
    type: 'string'
  }, {
    name: 'totalSupply',
    type: 'uint256'
  }, {
    name: 'price',
    type: 'uint256'
  }, {
    name: 'contentPath',
    type: 'string'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  inputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'constructor'
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: 'previousOwner',
    type: 'address'
  }, {
    indexed: true,
    name: 'newOwner',
    type: 'address'
  }],
  name: 'OwnershipTransferred',
  type: 'event'
}];
