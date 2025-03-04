// function to convert hex => rgb => hsl
// then determine color schemes, return package

function setColors(hex, scheme) {

    // conversion portion start
    // hex to rgb
    let r = 0, g = 0, b = 0;
    if (hex.length == 4) {
        r = "0x" + hex[1] + hex[1];
        g = "0x" + hex[2] + hex[2];
        b = "0x" + hex[3] + hex[3];
    } else if (hex.length == 7) {
        r = "0x" + hex[1] + hex[2];
        g = "0x" + hex[3] + hex[4];
        b = "0x" + hex[5] + hex[6];
    }
    // rgb to hsl
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

    if (delta == 0)
        h = 0;

    else if (cmax == r)
        h = ((g - b) / delta) % 6;

    else if (cmax == g)
        h = (b - r) / delta + 2;

    else
        h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0)
        h += 360;

    // s + l
    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);



    const colorWheel = {
        textColor: l > 60 ? 'black' : 'white',
        primaryColor: hex,
        compColor: `hsl(${h + 180}, ${s}%, ${l}%)`,
        triadOne: `hsl(${h + 120}, ${s}%, ${l}%)`,
        triadTwo: `hsl(${h - 120}, ${s}%, ${l}%)`,
        analogOne: `hsl(${h + 30}, ${s}%, ${l}%)`,
        analogTwo: `hsl(${h - 30}, ${s}%, ${l}%)`,
        lightOne: `hsl(${h}, ${s}%, ${l + 12}%)`,
        lightTwo: `hsl(${h}, ${s}%, ${l + 24}%)`,
        darkOne: `hsl(${h}, ${s}%, ${l - 12}%)`,
        darkTwo: `hsl(${h}, ${s}%, ${l - 24}%)`,
        
    }
    console.log('color Wheel', colorWheel)
    return colorWheel
}


export default setColors