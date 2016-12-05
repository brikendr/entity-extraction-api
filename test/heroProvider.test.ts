import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require("chai-http");

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET /api/heroes', () => {

    it('responds with JSON array', () => {
        return chai.request(app).get('/api/heroes/getHeroes')
            .then(res => {
                expect(res.status).to.equal(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('array');
            });
    });

    it('should include Narco', () => {
        return chai.request(app).get('/api/heroes/getHeroes')
            .then(res => {
                let Narco = res.body.find((hero: any) => hero.name === 'Narco');
                expect(Narco).to.exist;
                expect(Narco).to.have.all.keys([
                    'id',
                    'name'
                ]);
            });
    });

});