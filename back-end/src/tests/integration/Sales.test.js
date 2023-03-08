const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../api/app');
const { Sale, SalesProduct } = require('../../database/models');
const { sales, salesById, postSaleBody } = require('../mocks/Sales.mock');
const { customerPayload, sellerPayload } = require('../mocks/JWT.mock');
const { expect } = chai;
const { createToken } = require('../../auth');

chai.use(chaiHttp);

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
// const HTTP_UNAUTHORIZED_STATUS = 401;

const customerToken = createToken(customerPayload);
const sellerToken = createToken(sellerPayload);
// const invalidToken = 'invalidToken';

describe('Testes da rota "/sales"', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('verifica se é possível buscar todas as vendas com sucesso da pessoa cliente', async function () {
    sinon.stub(Sale, 'findAll').resolves(sales);

    const chaiHttpResponse = await chai.request(app).get('/sales').set('Authorization', customerToken);

    expect(chaiHttpResponse.status).to.be.equal(HTTP_OK_STATUS);
    expect(chaiHttpResponse.body).to.deep.equal(sales);
  });

  
  it('verifica se é possível buscar todas as vendas com sucesso da pessoa vendedora', async function () {
    sinon.stub(Sale, 'findAll').resolves(sales);
    
    const chaiHttpResponse = await chai.request(app).get('/sales').set('Authorization', sellerToken);
    
    expect(chaiHttpResponse.status).to.be.equal(HTTP_OK_STATUS);
    expect(chaiHttpResponse.body).to.deep.equal(sales);
  });

  it('verifica se é possível buscar apenas uma venda com sucesso', async function () {
    sinon.stub(Sale, 'findByPk').resolves(salesById);

    const chaiHttpResponse = await chai.request(app).get('/sales/2').set('Authorization', customerToken);

    expect(chaiHttpResponse.status).to.be.equal(HTTP_OK_STATUS);
    expect(chaiHttpResponse.body).to.deep.equal(salesById);
  });

  it('verifica se é possível registrar uma nova venda com sucesso', async function () {
    sinon.stub(Sale, 'create').resolves({ null: 3 });
    sinon.stub(SalesProduct, 'create').resolves();

    const chaiHttpResponse = await chai.request(app).post('/sales').send(postSaleBody).set('Authorization', customerToken);

    expect(chaiHttpResponse.status).to.be.equal(HTTP_CREATED_STATUS);
    expect(chaiHttpResponse.body).to.deep.equal({ null: 3, id: 3 });
  });

  it('verifica se é possível atualizar o status de uma venda com sucesso', async function () {
    sinon.stub(Sale, 'update').resolves(undefined);

    const chaiHttpResponse = await chai.request(app).patch('/sales/1').send({ status: 'Em Trânsito' }).set('Authorization', customerToken);

    expect(chaiHttpResponse.status).to.be.equal(HTTP_OK_STATUS);
    expect(chaiHttpResponse.body.message).to.be.equal("Status updated");
  });
});