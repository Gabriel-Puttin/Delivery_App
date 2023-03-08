const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../api/app');
const { User } = require('../../database/models');
const { adminPayload, sellerPayload } = require('../mocks/JWT.mock');
const { allClients, allSellers, newClient, registerResponse, client, newClientAdmin } = require('../mocks/User.mock');
const { expect } = chai;
const { createToken } = require('../../auth');

chai.use(chaiHttp);

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_NO_CONTENT_STATUS = 204;
const HTTP_UNAUTHORIZED_STATUS = 401;
const HTTP_CONFLICT_STATUS = 409;

const sellerToken = createToken(sellerPayload);
const adminToken = createToken(adminPayload);

describe('Testes da rota "/users"', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('verifica se é possível buscar todas os usuários com sucesso', async function () {
    sinon.stub(User, 'findAll').resolves(allClients);

    const chaiHttpResponse = await chai.request(app).get('/users');

    expect(chaiHttpResponse.status).to.be.equal(HTTP_OK_STATUS);
    expect(chaiHttpResponse.body).to.deep.equal(allClients);
  });

  it('verifica se é possível buscar todos os vendedores com sucesso', async function () {
    sinon.stub(User, 'findAll').resolves(allSellers);

    const chaiHttpResponse = await chai.request(app).get('/users/sellers');

    expect(chaiHttpResponse.status).to.be.equal(HTTP_OK_STATUS);
    expect(chaiHttpResponse.body).to.deep.equal(allSellers);
  });

  it('verifica se é possível registrar um novo usuário com sucesso', async function () {
    sinon.stub(User, 'findOne')
      .onFirstCall().resolves(undefined)
      .onSecondCall().resolves(client);
    
    sinon.stub(User, 'create').resolves(registerResponse);

    const chaiHttpResponse = await chai.request(app).post('/users/register').send(newClient);

    expect(chaiHttpResponse.status).to.be.equal(HTTP_CREATED_STATUS);
    expect(chaiHttpResponse.body).to.have.key(['email', 'name', 'role', 'token']);
  });

  it('verifica se erro acontece ao registrar com email ja existente', async function () {
    sinon.stub(User, 'findOne').resolves(client);

    const chaiHttpResponse = await chai.request(app)
      .post('/users/register')
      .send(newClient);

    expect(chaiHttpResponse.status).to.be.equal(HTTP_CONFLICT_STATUS);
    expect(chaiHttpResponse.body).to.deep.equal({message:'Email already registered'});
  });

  it('verifica se é possível registrar um novo usuário como admin com sucesso', async function () {
    sinon.stub(User, 'findOne')
      .onFirstCall().resolves(undefined)
      .onSecondCall().resolves(client);
    
    sinon.stub(User, 'create').resolves(registerResponse);

    const chaiHttpResponse = await chai.request(app)
      .post('/users/admin/register')
      .send(newClientAdmin)
      .set('Authorization', adminToken);

    expect(chaiHttpResponse.status).to.be.equal(HTTP_CREATED_STATUS);
  });

  it('verifica se erro acontece ao registrar na rota de admin com role inválido', async function () {
    const chaiHttpResponse = await chai.request(app)
      .post('/users/admin/register')
      .send(newClientAdmin)
      .set('Authorization', sellerToken);

    expect(chaiHttpResponse.status).to.be.equal(HTTP_UNAUTHORIZED_STATUS);
    expect(chaiHttpResponse.body).to.deep.equal({message:'Unauthorized'});
  });

  it('verifica se erro acontece ao registrar na rota de admin sem token', async function () {
    const chaiHttpResponse = await chai.request(app)
      .post('/users/admin/register')
      .send(newClientAdmin);

    expect(chaiHttpResponse.status).to.be.equal(HTTP_UNAUTHORIZED_STATUS);
    expect(chaiHttpResponse.body).to.deep.equal({message:'Token must be a valid token'});
  });

  it('verifica se erro acontece ao registrar na rota de admin com token inválido', async function () {
    const chaiHttpResponse = await chai.request(app)
      .post('/users/admin/register')
      .send(newClientAdmin)
      .set('Authorization', 'invalidToken');

    expect(chaiHttpResponse.status).to.be.equal(HTTP_UNAUTHORIZED_STATUS);
    expect(chaiHttpResponse.body).to.deep.equal({message:'Token must be a valid token'});
  });

  it('verifica se é possível deletar um usuário com sucesso', async function () {
    sinon.stub(User, 'destroy').resolves([ 0 ]);

    chaiHttpResponse = await chai.request(app).delete('/users/1');

    expect(chaiHttpResponse.status).to.be.equal(HTTP_NO_CONTENT_STATUS);
  });
});