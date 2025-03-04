// function to convert hex => hsl and then assign HSL to css variable
function setColors(H, setPalettePrime) {

  // set your variable for css
  if (setPalettePrime) {
    // console.log('palettePrime Identified')
    setPalettePrime(H)
  }

  // conversion portion start
  // hex to rgb
  let r = 0, g = 0, b = 0;
  if (H.length == 4) {
    r = "0x" + H[1] + H[1];
    g = "0x" + H[2] + H[2];
    b = "0x" + H[3] + H[3];
  } else if (H.length == 7) {
    r = "0x" + H[1] + H[2];
    g = "0x" + H[3] + H[4];
    b = "0x" + H[5] + H[6];
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

  document.documentElement.style.setProperty(`--primary-color-h`, h);
  document.documentElement.style.setProperty(`--primary-color-s`, s + '%');
  document.documentElement.style.setProperty(`--primary-color-l`, l + '%');
}


export default setColors