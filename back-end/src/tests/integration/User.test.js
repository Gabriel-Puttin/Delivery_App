const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../api/app');
const { User } = require('../../database/models');
const { payload, payload2 } = require('../mocks/JWT.mock');
const { allClients, allSellers, newClient, registerResponse } = require('../mocks/User.mock');
const { expect } = chai;
const { createToken } = require('../../auth');

chai.use(chaiHttp);

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_NO_CONTENT_STATUS = 204;

describe('Testes da rota "/users"', function () {
  let chaiHttpResponse;

  afterEach(function () {
    sinon.restore();
  });

  it('verifica se é possível buscar todas os usuários com sucesso', async function () {
    sinon.stub(User, 'findAll').resolves(allClients);

    chaiHttpResponse = await chai.request(app).get('/users');

    expect(chaiHttpResponse.status).to.be.equal(HTTP_OK_STATUS);
    expect(chaiHttpResponse.body).to.deep.equal(allClients);
  });

  it('verifica se é possível buscar todos os vendedores com sucesso', async function () {
    sinon.stub(User, 'findAll').resolves(allSellers);

    chaiHttpResponse = await chai.request(app).get('/users/sellers');

    expect(chaiHttpResponse.status).to.be.equal(HTTP_OK_STATUS);
    expect(chaiHttpResponse.body).to.deep.equal(allSellers);
  });

  // it('verifica se é possível registrar um novo usuário com sucesso', async function () {
  //   sinon.stub(User, 'create').resolves(registerResponse);

  //   chaiHttpResponse = await chai.request(app).post('/users/register').send(newClient);

  //   expect(chaiHttpResponse.status).to.be.equal(HTTP_CREATED_STATUS);
  //   expect(chaiHttpResponse.body).to.deep.equal(registerResponse);
  // });

  it('verifica se é possível deletar um usuário com sucesso', async function () {
    sinon.stub(User, 'destroy').resolves([ 0 ]);

    chaiHttpResponse = await chai.request(app).delete('/users/1');

    expect(chaiHttpResponse.status).to.be.equal(HTTP_NO_CONTENT_STATUS);
  });
});