const jimp = require("jimp")
const fs = require("fs");

let filename = "tacodiva";

async function getColor(top, left, image) {
    let rgba = Math.floor(image.getPixelColor(left, top));
    let alpha = ((rgba >> 0) & 0xFF) / 255.0;
    let newColor =
        Math.floor(((rgba >> 8) & 0xFF) * alpha) << 0 |
        Math.floor(((rgba >> 16) & 0xFF) * alpha) << 8 |
        Math.floor(((rgba >> 24) & 0xFF) * alpha) << 16;
    return "#" + newColor.toString(16).padStart(6, '0').substring(0, 6);
}
(async ()=>{
    let top = 0;
    let left = 0;

    let sizedImage = (await jimp.read("./"+filename+".png")).resize(480,360);
    alldata = [];
    for (let i = 0; i<90; i++) {
        left = 0;
        let data = [];
        for (let i2 = 0; i2<120; i2++) {
            data.push(await getColor(top,left,sizedImage));
            left += 4;
        }
        top += 4;
        alldata.push(data.join(" "));
        console.log(`[LINE ${i+1}] ${((i/90)*100).toFixed(0)}% done`)
    }
    fs.writeFileSync("./"+filename+".txt",alldata.join("\n"))
    console.log("100.00% done");
})()