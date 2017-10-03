const expect = require('expect.js');
import Utils from '../web/services/Utils';

describe('Utils', () => {
   describe('srmToHex', () => {
      it('should return #E58500', () => {
         var srm = "9.2080309619282";
         var rgb = Utils.srmToHex(srm);
         expect(rgb).to.equal('#E58500');
      });
   });
});