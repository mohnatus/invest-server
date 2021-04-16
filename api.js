// https://github.com/TinkoffCreditSystems/invest-openapi-js-sdk

const OpenAPI = require('@tinkoff/invest-openapi-js-sdk');
const token = require('./data/token');
const account = require('./data/account.js');

const apiURL = 'https://api-invest.tinkoff.ru/openapi';
const socketURL = 'wss://api-invest.tinkoff.ru/openapi/md/v1/md-openapi/ws';

const api = new OpenAPI({ apiURL, secretToken: token, socketURL });

if (account) {
  api.setCurrentAccountId(account);
}

module.exports.getPortfolio = () => {
  return api.portfolio();
};
