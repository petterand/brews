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

   describe('round10', () => {
      it('should round 0.499999 to 0.5', () => {
         expect(Utils.round10(0.499999, -1)).to.equal(0.5);
      });
   })
});