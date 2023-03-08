const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../api/app');
const { Product } = require('../../database/models');
const products = require('../mocks/Products.mock');
const { expect } = chai;

chai.use(chaiHttp);

const HTTP_OK_STATUS = 200;

describe('Testes da rota "/products"', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('verifica se é possível buscar todos os produtos com sucesso', async function () {
    sinon.stub(Product, 'findAll').resolves(products);

    const chaiHttpResponse = await chai.request(app).get('/products');

    expect(chaiHttpResponse.status).to.be.equal(HTTP_OK_STATUS);
    expect(chaiHttpResponse.body).to.deep.equal(products);
  });
});