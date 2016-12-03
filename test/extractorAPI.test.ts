import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require("chai-http");

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET /api/extractor/tag', function() {
    this.timeout(100000);
    it('responds with JSON array', function(){
        return chai.request(app).post('/api/extractor/tag')
            .query({textContent: "Microsoft was founded by Bill Gates and has its headquarters in California."})
            .end(res => {
                expect(res.status).to.equal(200);
            });
    });

    it('should include organization, location and person', function(){
        return chai.request(app).post('/api/extractor/tag')
            .query({textContent: "Microsoft was founded by Bill Gates and has its headquarters in California."})
            .then(res => {
                expect(res).to.have.property('outputJSON')
                expect(res).to.have.deep.property('outputJSON.Organization', 'Microsoft');
                expect(res).to.have.deep.property('outputJSON.Location', 'California');
                expect(res).to.have.deep.property('outputJSON.Person', 'Bill Gates');
            });
    });
});