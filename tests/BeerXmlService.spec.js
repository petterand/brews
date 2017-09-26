const fs = require('fs');
const expect = require('expect.js');

import BeerXmlService from '../web/services/BeerXmlService';
const expectedJson = require('./helpers/expectedBrewJson.js');
var beerxml;


beforeEach(() => {
   beerxml = fs.readFileSync('tests/helpers/coffee_brown.xml').toString();
});

describe('BeerXmlService', () => {
   describe('parse', () => {
      it('should return json', () => {
         return BeerXmlService.parse(beerxml).then((json) => {
            expect(json).to.eql(expectedJson);
         });
      });
   });
});