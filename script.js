window.addEventListener("load", () => {
    document.getElementById("copy").addEventListener("click", () => {
        let temp = document.createElement("input");
        temp.className = "temp"
        document.body.appendChild(temp);

        temp.value = document.getElementById("copy").getAttribute("copy");

        temp.select();
        document.execCommand("copy");

        document.body.removeChild(temp);
    });

    const neonGradients = [
        "linear-gradient(45deg, #5BCEFF 0%, #FFA9B7 25%, #FFFFFF 50%, #FFA9B7 75%, #5BCEFF 100%)",
        "linear-gradient(45deg, #FF9BCD 0%, #FF53BE 25%, #8A00FF 50%, #665EFF 75%, #8CA6FF 100%)",
        "linear-gradient(45deg, #FF4D00 0%, #FF8D00 100%)",
        "linear-gradient(45deg, #FFFFFF 0%, #FF143C 100%)",
        "linear-gradient(45deg, #8706FF 0%, #FFB5E0 33.33%, #FFFFFF 66.67%, #76FFA4 100%)",
        "linear-gradient(45deg, #FF0000 0%, #FFFF00 16.67%, #00FF00 33.33%, #00FFFF 50%, #0000FF 66.67%, #FF00FF 83.33%, #FF0000 100%)"
    ];
    const neonSizes = ["2500%", "2500%", "1000%", "1000%", "2000%", "3500%"];

    let choice = Math.floor(Math.random()*neonGradients.length);
    document.documentElement.style.setProperty("--neon", neonGradients[choice]);
    document.documentElement.style.setProperty("--neon-size", neonSizes[choice]);

    const sky = ["#4EA4D9", "#1763A6"] //day
    //const sky = ["#032340", "#011526"] //night

    document.documentElement.style.setProperty("--sky", "linear-gradient(0deg, "+sky[0]+" 0%, "+sky[1]+" 100%)");

    let canvas = document.getElementById("canvas");
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;

    let wth, hgt

    if(canvas.width > canvas.height) {
        wth = canvas.width;
        hgt = canvas.height;
    } else {
        wth = canvas.height;
        hgt = canvas.width;
    }

    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');

        GenMountainLandscape(ctx, wth, hgt, sky);
    }
});

function GenMountainLandscape(ctx, wth, hgt, sky) {
    const grassColours = ["#267302", "#155902"];
    const fenceColour = "#50290A";
    const baseMtColours = ["#F2F2F2", "#474B56", "#35373E", ShadeColour(grassColours[1], "#000000", 2)];

    ctx.beginPath();
    ctx.arc(wth-(wth*0.1), hgt-(hgt*0.9), hgt*0.075, 0, Math.PI*2, true);

    let sunGradient = ctx.createRadialGradient(wth-(wth*0.1), hgt-(hgt*0.9), 1, wth-(wth*0.1), hgt-(hgt*0.9), 50);
    sunGradient.addColorStop(0, "#FCD440");
    sunGradient.addColorStop(0.75, "#FCD440");
    sunGradient.addColorStop(1, "transparent");
    
    ctx.fillStyle = sunGradient;
    ctx.fill();

    let plannedLayers = 5;
    
    for(let layer = 0; layer < plannedLayers; layer++) {
        let start = -Math.floor(Math.random()*((wth/3)-1)+1);
        let end = wth+Math.floor(Math.random()*((wth/3)-1)+1);
        let cursor = start;
        let layerFix = Math.round(wth*((plannedLayers-layer)/50))

        let mtColours = [];

        for(let i = 0; i < baseMtColours.length; i++) {
            mtColours.push(ShadeColour(baseMtColours[i], sky[1], layer+1));
        }

        while(cursor <= end) {
            let mtWidth = Math.floor(Math.random()*((wth/3)-(wth/4))+(wth/4));
            let mtHeight = (Math.round(mtWidth/Math.sqrt(3))*2)-layerFix;
            
            mtWidth = Math.round(mtWidth/2);
            if(mtWidth == 0) {
                mtWidth = 1;
            }

            let mtMiddle = Math.round(Math.floor(Math.random()*((mtWidth/2)*2)+1)-(mtWidth/2));

            ctx.beginPath();
            ctx.moveTo(cursor, hgt);
            ctx.lineTo(cursor, hgt-layerFix);
            ctx.lineTo(cursor+mtWidth, mtHeight-layerFix);
            ctx.lineTo(cursor+(mtWidth*2), hgt-layerFix);
            ctx.lineTo(cursor+(mtWidth*2), hgt);

            let gradientLight = ctx.createLinearGradient(cursor+mtWidth, mtHeight, cursor+mtWidth-mtMiddle, hgt);
            gradientLight.addColorStop(0, mtColours[0]);
            gradientLight.addColorStop(0.25, mtColours[1]);
            gradientLight.addColorStop(0.5, mtColours[2]);
            gradientLight.addColorStop(1, mtColours[3]);

            ctx.fillStyle = gradientLight;
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(cursor+mtWidth+mtMiddle, hgt);
            ctx.lineTo(cursor+mtWidth+mtMiddle, hgt-layerFix);
            ctx.lineTo(cursor+mtWidth, mtHeight-layerFix);
            ctx.lineTo(cursor+(mtWidth*2), hgt-layerFix);
            ctx.lineTo(cursor+(mtWidth*2), hgt);

            let gradientDark = ctx.createLinearGradient(cursor+mtWidth, mtHeight, cursor+mtWidth-mtMiddle, hgt);
            gradientDark.addColorStop(0, ShadeColour(mtColours[0], "#000000", 4));
            gradientDark.addColorStop(0.25, ShadeColour(mtColours[1], "#000000", 4));
            gradientDark.addColorStop(0.5, ShadeColour(mtColours[2], "#000000", 4));
            gradientDark.addColorStop(1, ShadeColour(mtColours[3], "#000000", 4));

            ctx.fillStyle = gradientDark;
            ctx.fill();

            cursor += mtWidth*2;
        }
    }

    let groundLevel = hgt-(hgt*0.1);
    
    let gradientGround = ctx.createLinearGradient(wth, groundLevel, 0, hgt);
    gradientGround.addColorStop(0, grassColours[0]);
    gradientGround.addColorStop(1, grassColours[1]);

    ctx.fillStyle = gradientGround;
    ctx.fillRect(0, groundLevel, wth, groundLevel);

    ctx.beginPath();
    ctx.moveTo(0, hgt);
    ctx.lineTo(0, groundLevel+(groundLevel*0.1));
    ctx.lineTo(wth, groundLevel+(groundLevel*0.09));
    ctx.lineTo(wth, hgt);
    ctx.lineTo(0, hgt);

    gradientGround = ctx.createLinearGradient(wth, hgt, wth/4, groundLevel+(groundLevel*0.09));
    gradientGround.addColorStop(0, baseMtColours[1]);
    gradientGround.addColorStop(1, baseMtColours[2]);

    ctx.fillStyle = gradientGround;
    ctx.fill();

    let start = -Math.floor(Math.random()*((wth/3)-1)+1);
    let end = wth+Math.floor(Math.random()*((wth/3)-1)+1);
    let cursor = start;

    let fenceLevel = hgt-(hgt*0.09);

    let gradientFence = ctx.createLinearGradient(wth, -fenceLevel*0.125, 0, fenceLevel);
    gradientFence.addColorStop(0, fenceColour);
    gradientFence.addColorStop(1, MixColours(fenceColour, "#000000"));

    ctx.fillStyle = gradientFence;
    
    while(cursor <= end) {
        ctx.fillRect(cursor, fenceLevel, wth/100, -fenceLevel*0.125);
        ctx.fillRect(cursor+(wth/200), fenceLevel-((fenceLevel*0.125)/2), wth/12.5, wth/200);
        ctx.fillRect(cursor+(wth/200), fenceLevel-((fenceLevel*0.125)*(3/4)), wth/12.5, wth/200);

        cursor += wth/12.5;
    }
}

function MixColours(colourHEX1, colourHEX2) {
    colourHEX1 = colourHEX1.slice(1);
    colourHEX2 = colourHEX2.slice(1);

    let colourRGB1 = parseInt(colourHEX1, 16);
    let colourRGB2 = parseInt(colourHEX2, 16);

    let r = Math.round((((colourRGB1 >> 16) & 0xFF)+((colourRGB2 >> 16) & 0xFF))/2);
    let g = Math.round((((colourRGB1 >> 8) & 0x00FF)+((colourRGB2 >> 8) & 0x00FF))/2);
    let b = Math.round((((colourRGB1) & 0x0000FF)+((colourRGB2) & 0x0000FF))/2);

    if(r.toString(16).length == 2) {
        r = r.toString(16)
    } else {
        r = "0"+r.toString(16)
    }

    if(g.toString(16).length == 2) {
        g = g.toString(16)
    } else {
        g = "0"+g.toString(16)
    }
    
    if(b.toString(16).length == 2) {
        b = b.toString(16)
    } else {
        b = "0"+b.toString(16)
    }

    return "#"+r+g+b.toUpperCase();
}

function ShadeColour(baseColourHEX, shadeColourHEX, mixAmount) {
    if(mixAmount == 0) {
        return baseColourHEX;
    }

    for(let timesMixed = 1; timesMixed <= mixAmount; timesMixed++) {
        shadeColourHEX = MixColours(baseColourHEX, shadeColourHEX);
    }

    return shadeColourHEX;
}
