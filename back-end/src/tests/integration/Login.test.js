const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../api/app');
const { User } = require('../../database/models');
const { client, userInfo, wrongUser } = require('../mocks/User.mock');
const { expect } = chai;

chai.use(chaiHttp);

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;

describe('Testes da rota "/login"', function () {
  let chaiHttpResponse;

  afterEach(function () {
    sinon.restore();
  });

  it('verifica se é possível um usuário logar com sucesso', async function () {
    sinon.stub(User, 'findOne').resolves(client);

    chaiHttpResponse = await chai.request(app).post('/login').send(userInfo);

    expect(chaiHttpResponse.status).to.be.equal(HTTP_OK_STATUS);
    expect(chaiHttpResponse.body).to.have.key(['email', 'name', 'role', 'token']);
  });

  it('verifica se não é possível realizar o login com um usuário que não existe', async function () {
    chaiHttpResponse = await chai.request(app).post('/login').send(wrongUser);

    expect(chaiHttpResponse.status).to.be.equal(HTTP_NOT_FOUND_STATUS);
    expect(chaiHttpResponse.body.message).to.be.equal('Not Found');
  });
});