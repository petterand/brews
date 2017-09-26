const Utils = {
    srmToCss: srmToCss
};

export default Utils;

function srmToCss(srm) {
    let r = Math.round(Math.min(255, Math.max(0, 255 * Math.pow(0.975, srm))));
    let g = Math.round(Math.min(255, Math.max(0, 245 * Math.pow(0.88, srm))));
    let b = Math.round(Math.min(255, Math.max(0, 220 * Math.pow(0.7, srm))));

    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}