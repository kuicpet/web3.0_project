// https://eth-ropsten.alchemyapi.io/v2/9zi-NQHE652V43t84tmcoZn9cqgjhwqP

require('@nomiclabs/hardhat-waffle')

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/9zi-NQHE652V43t84tmcoZn9cqgjhwqP',
      accounts: ['05aa7feab58d0ad7368f9b81096351ba996e56852f3746eff488f58fd53b1015']
    }
  }
}

