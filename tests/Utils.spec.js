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
      it('should round 4.499971 to 4.5', () => {
         expect(Utils.round10(4.499971, -1)).to.equal(4.5);
      });
   });

   describe('minutesToDays', () => {
      it('should return correct number of days', () => {
         expect(Utils.minutesToDays(10080)).to.equal(7);
      });
   });

   describe('kgToGram', () => {
      it('should return correct number of grams if below 1', () => {
         expect(Utils.kgToGram(0.25)).to.equal(250);
      });
      it('should return kg if number is above 1', () => {
         expect(Utils.kgToGram(1.25)).to.equal(1.25);
      });
   });
});