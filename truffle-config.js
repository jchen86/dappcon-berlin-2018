module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  mocha: {
    reporter: 'eth-gas-reporter',
    reporterOptions: {
      currency: 'EUR',
      gasPrice: 21
    }
  },
  compilers: {
    solc: {
      version: 'native'
    }
  }
};
