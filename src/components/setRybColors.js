// Function to convert Hex to RGB
function hexToRgb(hex) {
    // Remove '#' if it's included
    hex = hex.replace('#', '');
    // Convert hex to RGB components
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return { r, g, b };
}

// Function to convert RGB to RYB
function rgbToRyB(r, g, b) {
    // Convert RGB to RYB. This is an approximation using basic color theory.
    // First, compute the "yellow" component, which is a mixture of red and green
    const y = Math.min(r, g);
    // The blue component in RYB is similar to the blue in RGB.
    const bRy = b;
    // Red component in RYB is based on the remaining red value after mixing with yellow
    const rRy = r - y;
    return { r: rRy, y, b: bRy };
}



// Smoother, non-linear interpolation function
function smoothInterpolate(a, b, t) {
    return a + t * (b - a) * (3 - 2 * t);  // Cosine-like smooth interpolation
}

// Adjusting the complementary logic with smoother interpolation
function getComplementaryRyB(rybColor) {
    let compR, compY, compB;
    if (rybColor.r >= rybColor.y && rybColor.r >= rybColor.b) {
        // Red's complement is Green: Use smooth interpolation between Red and Green
        compR = 0;
        compY = smoothInterpolate(rybColor.b, rybColor.y, 0.5);  // Blend blue and yellow for green
        compB = smoothInterpolate(rybColor.y, rybColor.b, 0.5);  // Blend yellow and blue for green
    } else if (rybColor.y >= rybColor.r && rybColor.y >= rybColor.b) {
        // Yellow's complement is Purple: Blend Red and Blue for purple
        compR = smoothInterpolate(rybColor.b, rybColor.r, 0.5);  // Blend blue and red for purple
        compY = 0;
        compB = smoothInterpolate(rybColor.r, rybColor.b, 0.5);  // Blend red and blue for purple
    } else {
        // Blue's complement is Orange: Blend Red and Yellow for orange
        compR = smoothInterpolate(rybColor.y, rybColor.r, 0.5);  // Blend yellow and red for orange
        compY = smoothInterpolate(rybColor.r, rybColor.y, 0.5);  // Blend red and yellow for orange
        compB = 0;
    }
    return { r: compR, y: compY, b: compB };
}



// ryb value to rgb
function rybToRgb(rRy, y, bRy) {
    const r = Math.min(255, Math.max(0, rRy + y));  // Ensure r is in the range 0-255
    const g = Math.min(255, Math.max(0, y));        // Ensure g is in the range 0-255
    const b = Math.min(255, Math.max(0, bRy));      // Ensure b is in the range 0-255
    return { r, g, b };
}

// rgb value to hsl
function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    let h = 0;
    let s = 0;
    let l = (max + min) / 2;

    // If there is no color difference, the color is achromatic (grayscale)
    if (delta !== 0) {
        s = delta / (1 - Math.abs(2 * l - 1));

        if (max === r) {
            h = ((g - b) / delta) % 6;
        } else if (max === g) {
            h = (b - r) / delta + 2;
        } else {
            h = (r - g) / delta + 4;
        }

        h *= 60;
        if (h < 0) h += 360;
    }

    // Ensure saturation and lightness are clamped between 0 and 100
    s = Math.min(100, Math.max(0, s * 100));
    l = Math.min(100, Math.max(0, l * 100));

    return { h, s, l };
}






export default function setRybColors(hex) {

    // convrt hex to rgb
    const rgbColor = hexToRgb(hex)
    console.log('rgb color', rgbColor)

    // convert rgb to RYB
    const rybColor = rgbToRyB(rgbColor.r, rgbColor.g, rgbColor.b)
    console.log('RYB color', rybColor)

    // find complimentary color
    const compRyb = getComplementaryRyB(rybColor);
    console.log('compRyb', compRyb)


    // convert ryb to rgb
    const compRgb = rybToRgb(compRyb.r, compRyb.y, compRyb.b)
    console.log('compRgb', compRgb)

    // convert rgb to hsl
    const compHsl = rgbToHsl(compRgb.r, compRgb.g, compRgb.b)
    console.log('compHsl', compHsl)

    const hslString = `hsl(${compHsl.h}, ${compHsl.s}%, ${compHsl.l}%)`;

    return hslString
}