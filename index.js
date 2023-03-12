const sharp = require("sharp");
const fac = require('fast-average-color-node');
const fs = require("fs");

let filename = "tocompress";

async function getColor(top,left,image) {
    return (await fac.getAverageColor(image,{left,top,width:4,height:4})).hex;
}

(async ()=>{
    let top = 0;
    let left = 0;

    let sizedImage = await sharp(filename+".png").resize(480,360);
    let buffered = await sizedImage.toBuffer()
    alldata = [];
    for (let i = 0; i<90; i++) {
        left = 0;
        let data = [];
        for (let i2 = 0; i2<120; i2++) {
            data.push(await getColor(top,left,buffered));
            left += 4;
        }
        top += 4;
        alldata.push(data.join(" "));
        console.log(`[LINE ${i+1}] ${((i/90)*100).toFixed(0)}% done`)
    }
    fs.writeFileSync("./"+filename+".txt",alldata.join("\n"))
    console.log("100.00% done");
})()