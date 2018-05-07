const Utils = {
   srmToHex: srmToHex,
   round10: round10,
   minutesToDays: minutesToDays,
   kgToGram: kgToGram
};

export default Utils;

function srmToHex(srm) {
   var SRM_HEX = ["#FFE699", "#FFD878", "#FFCA5A", "#FFBF42", "#FBB123", "#F8A600", "#F39C00", "#EA8F00", "#E58500", "#DE7C00", "#D77200", "#CF6900", "#CB6200", "#C35900", "#BB5100", "#B54C00", "#B04500", "#A63E00", "#A13700", "#9B3200", "#952D00", "#8E2900", "#882300", "#821E00", "#7B1A00", "#771900", "#701400", "#6A0E00", "#660D00", "#5E0B00", "#5A0A02", "#600903", "#520907", "#4C0505", "#470606", "#440607", "#3F0708", "#3B0607", "#3A070B", "#36080A", "#000000"];
   srm = parseFloat(srm).toFixed(0);

   if (srm > 41) {
      return SRM_HEX[SRM_HEX.length - 1];
   } else {
      return SRM_HEX[srm - 1];
   }
}

function round10(value, exp) {
   if (typeof exp === 'undefined' || +exp === 0) {
      return Math.round(value);
   }
   value = +value;
   exp = +exp;
   // If the value is not a number or the exp is not an integer...
   if (value === null || isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
   }
   // If the value is negative...
   if (value < 0) {
      return -decimalAdjust(-value, exp);
   }
   // Shift
   value = value.toString().split('e');

   value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
   // Shift back
   value = value.toString().split('e');
   return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));

}


function minutesToDays(min) {
   return min / (60 * 24);
}

function kgToGram(weight) {
   if (weight > 1) {
      return weight;
   }
   return weight * 1000;
}