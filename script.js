window.addEventListener("load", () => main());

const neonGradients = [
    "linear-gradient(45deg, #5BCEFF 0%, #FFA9B7 25%, #FFFFFF 50%, #FFA9B7 75%, #5BCEFF 100%)",
    "linear-gradient(45deg, #FF9BCD 0%, #FF53BE 25%, #8A00FF 50%, #665EFF 75%, #8CA6FF 100%)",
    "linear-gradient(45deg, #FF4D00 0%, #FF8D00 100%)",
    "linear-gradient(45deg, #FFFFFF 0%, #FF143C 100%)",
    "linear-gradient(45deg, #8706FF 0%, #FFB5E0 33.33%, #FFFFFF 66.67%, #76FFA4 100%)",
    "linear-gradient(45deg, #FF0000 0%, #FFFF00 16.67%, #00FF00 33.33%, #00FFFF 50%, #0000FF 66.67%, #FF00FF 83.33%, #FF0000 100%)"
]; //Text colour shift gradient
const neonSizes = ["2500%", "2500%", "1000%", "1000%", "2000%", "3500%"]; //Text colour shift size

function main() {
    document.getElementById("copydic").addEventListener("click", () => CopyOnClick("copydic")); //Making some links copy to clipbord instead of opening a link
    document.getElementById("copyeml").addEventListener("click", () => CopyOnClick("copyeml"));

    let choice = Math.floor(Math.random()*neonGradients.length); //Get a random one and apply it
    document.documentElement.style.setProperty("--neon", neonGradients[choice]);
    document.documentElement.style.setProperty("--neon-size", neonSizes[choice]);

    let canvas = document.getElementById("canvas"); //Get the canvas and set it's resolution to be client resolution
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;

    let wth, hgt, fix

    if(canvas.width > canvas.height) {
        wth = canvas.width;
        hgt = canvas.height;
        fix = 0;
    } else { //Fix the variables if device is in portrait orientation
        wth = canvas.height;
        hgt = canvas.width;
        fix = (canvas.width*(canvas.height/canvas.width))-canvas.width;
    }

    if (canvas.getContext) { //Draw the background
        let ctx = canvas.getContext('2d');

        GenLandscape(ctx, wth, hgt, fix);
    }
}

function CopyOnClick(name) {
    if (!navigator.clipboard) { //Temporarly leaving support for the deprecated way
        let temp = document.createElement("input"); //Create temporary invisible for the user input element
        temp.className = "temp"
        document.body.appendChild(temp);

        temp.value = document.getElementById(name).getAttribute("copy"); //Set it's value to what we need to copy

        temp.select(); //Select and copy it's content
        document.execCommand("copy");

        document.body.removeChild(temp); //Cleanup
    } else {
        navigator.clipboard.writeText(document.getElementById(name).getAttribute("copy"));
    }
}

function GenLandscape(ctx, wth, hgt, fix) {
    let now = new Date();

    let sky, day;

    if(now.getHours() > 5  && now.getHours() < 18) { //Client time of day to website time of day
        sky = ["#4EA4D9", "#1763A6"];
        document.documentElement.style.setProperty("--glow", "10px");
        day = true;
    } else {
        sky = ["#032340", "#011526"];
        document.documentElement.style.setProperty("--glow", "20px");
        day = false;
    }

    document.documentElement.style.setProperty("--sky", "linear-gradient(0deg, "+sky[0]+" 0%, "+sky[1]+" 100%)");

    GenSunMoon(ctx, hgt, day);
    GenMountainLandscape(ctx, wth, hgt, sky, fix, day);
}

function GenSunMoon(ctx, hgt, day) {
    ctx.beginPath(); //Draw a sun
    ctx.arc(canvas.width-(canvas.width*0.1), hgt-(hgt*0.9), hgt*0.075, 0, Math.PI*2, true);

    let sunGradient = ctx.createRadialGradient(canvas.width-(canvas.width*0.1), hgt-(hgt*0.9), 1, canvas.width-(canvas.width*0.1), hgt-(hgt*0.9), 50); //Create sun gradient

    if(day) {
        sunGradient.addColorStop(0, "#FCD440");
        sunGradient.addColorStop(0.75, "#FCD440");
    } else {
        sunGradient.addColorStop(0, "#DDDDDD");
        sunGradient.addColorStop(0.9, "#DDDDDD");
    }

    sunGradient.addColorStop(1, "transparent");
    
    ctx.fillStyle = sunGradient; //Fill the sun with the gradient
    ctx.fill();
}

function GenMountainLandscape(ctx, wth, hgt, sky, fix, day) {
    let grassColours = ["#267302", "#155902"]; //Landscape colour palette
    let fenceColour = "#50290A";
    let baseMtColours = ["#F2F2F2", "#474B56", "#35373E", ShadeColour(grassColours[1], "#000000", 2)];

    if(!day) {
        grassColours.forEach((colour, index) => {
            grassColours[index] = MixColours(colour, sky[1])
        });

        fenceColour = MixColours(fenceColour, sky[1]);

        baseMtColours.forEach((colour, index) => {
            baseMtColours[index] = MixColours(colour, sky[1])
        });
    }

    let plannedLayers = 25; //Amount of mountain layers
    
    for(let layer = 0; layer < plannedLayers; layer++) {
        let start = -Math.floor(Math.random()*((wth/3)-1)+1); //Start of the mountain layer
        let end = wth+Math.floor(Math.random()*((wth/3)-1)+1); //End of the mountain layer
        let cursor = start; //Set the cursor to start
        let layerFix = Math.round(wth*(((layer+1)/((layer+1)*100)))); //Height fix for the given layer

        let mtColours = []; //Colours of the mountains for the current layer

        for(let i = 0; i < baseMtColours.length; i++) {
            mtColours.push(ShadeColour(baseMtColours[i], sky[1], layer+1));
        }

        while(cursor <= end) { //Draw the mountain layer
            let mtWidth = Math.floor(Math.random()*((wth/3)-(wth/4))+(wth/4))-(layer+1)/10; //Width of the current mountain
            let mtHeight = (Math.round(mtWidth/Math.sqrt(3)))-layerFix; //Height of the current mountain
            
            mtWidth = Math.round(mtWidth/2);
            if(mtWidth == 0) {
                mtWidth = 1;
            }

            let mtMiddle = Math.round(Math.floor(Math.random()*((mtWidth/2)*2)+1)-(mtWidth/2)); //The point of the mountain peak

            ctx.beginPath(); //Draw the light part of the mountain
            ctx.moveTo(cursor, hgt+fix);
            ctx.lineTo(cursor, hgt-layerFix+fix);
            ctx.lineTo(cursor+mtWidth, mtHeight-layerFix+fix);
            ctx.lineTo(cursor+(mtWidth*2), hgt-layerFix+fix);
            ctx.lineTo(cursor+(mtWidth*2), hgt+fix);

            let gradientLight = ctx.createLinearGradient(cursor+mtWidth, mtHeight+fix, cursor+mtWidth-mtMiddle, hgt+fix);
            gradientLight.addColorStop(0, mtColours[0]);
            gradientLight.addColorStop(0.25, mtColours[1]);
            gradientLight.addColorStop(0.5, mtColours[2]);
            gradientLight.addColorStop(1, mtColours[3]);

            ctx.fillStyle = gradientLight;
            ctx.fill();

            ctx.beginPath(); //Draw the dark part of the mountain
            ctx.moveTo(cursor+mtWidth+mtMiddle, hgt+fix);
            ctx.lineTo(cursor+mtWidth+mtMiddle, hgt-layerFix+fix);
            ctx.lineTo(cursor+mtWidth, mtHeight-layerFix+fix);
            ctx.lineTo(cursor+(mtWidth*2), hgt-layerFix+fix);
            ctx.lineTo(cursor+(mtWidth*2), hgt+fix);

            let gradientDark = ctx.createLinearGradient(cursor+mtWidth, mtHeight+fix, cursor+mtWidth-mtMiddle, hgt+fix);
            gradientDark.addColorStop(0, ShadeColour(mtColours[0], "#000000", 4));
            gradientDark.addColorStop(0.25, ShadeColour(mtColours[1], "#000000", 4));
            gradientDark.addColorStop(0.5, ShadeColour(mtColours[2], "#000000", 4));
            gradientDark.addColorStop(1, ShadeColour(mtColours[3], "#000000", 4));

            ctx.fillStyle = gradientDark;
            ctx.fill();

            cursor += mtWidth*2; //Move the cursor
        }
    }

    let groundLevelBase = hgt-(hgt*0.1);
    let groundLevelL = groundLevelBase/(Math.random()*(1.1-1)+1)
    let groundLevelR = groundLevelBase/(Math.random()*(1.1-1)+1)

    ctx.beginPath();
    ctx.moveTo(0, hgt+fix);
    ctx.lineTo(0, groundLevelL+fix);
    ctx.lineTo(wth, groundLevelR+fix);
    ctx.lineTo(wth, hgt+fix);
    ctx.lineTo(0, hgt+fix);
    
    let gradientGround = ctx.createLinearGradient(wth, groundLevelBase+fix, 0, hgt+fix); //Draw the ground
    gradientGround.addColorStop(0, grassColours[0]);
    gradientGround.addColorStop(1, grassColours[1]);

    ctx.fillStyle = gradientGround;
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(0, hgt+fix);
    ctx.lineTo(0, groundLevelL+(groundLevelL*0.11)+fix);
    ctx.lineTo(wth, groundLevelR+(groundLevelR*0.11)+fix);
    ctx.lineTo(wth, hgt+fix);
    ctx.lineTo(0, hgt+fix);

    gradientGround = ctx.createLinearGradient(wth, hgt+fix, wth/4, groundLevelBase+(groundLevelBase*0.1)+fix);
    gradientGround.addColorStop(0, baseMtColours[1]);
    gradientGround.addColorStop(1, baseMtColours[2]);

    ctx.fillStyle = gradientGround;
    ctx.fill();

    // let start = -Math.floor(Math.random()*((wth/3)-1)+1); //Set start of the fence layer
    // let end = wth+Math.floor(Math.random()*((wth/3)-1)+1); //Set end of the fence layer
    // let cursor = start;

    // let fenceLevel = hgt-(hgt*0.1)+fix;

    // let gradientFence = ctx.createLinearGradient(wth, (-fenceLevel*0.125)+fix, 0, fenceLevel+fix); //Draw the fence
    // gradientFence.addColorStop(0, fenceColour);
    // gradientFence.addColorStop(1, MixColours(fenceColour, "#000000"));

    // ctx.fillStyle = gradientFence;
    
    // while(cursor <= end) {
    //     ctx.fillRect(cursor, fenceLevel, wth/100, -fenceLevel*0.125);
    //     ctx.fillRect(cursor+(wth/200), fenceLevel-((fenceLevel*0.125)/2), wth/12.5, wth/200);
    //     ctx.fillRect(cursor+(wth/200), fenceLevel-((fenceLevel*0.125)*(3/4)), wth/12.5, wth/200);

    //     cursor += wth/12.5;
    // }
}

function MixColours(colourHEX1, colourHEX2) {
    colourHEX1 = colourHEX1.slice(1); //Remove the #
    colourHEX2 = colourHEX2.slice(1);

    let colourRGB1 = parseInt(colourHEX1, 16); //Parse to hex
    let colourRGB2 = parseInt(colourHEX2, 16);

    let r = Math.round((((colourRGB1 >> 16) & 0xFF)+((colourRGB2 >> 16) & 0xFF))/2); //Get the middle point between the two colours
    let g = Math.round((((colourRGB1 >> 8) & 0x00FF)+((colourRGB2 >> 8) & 0x00FF))/2);
    let b = Math.round((((colourRGB1) & 0x0000FF)+((colourRGB2) & 0x0000FF))/2);

    if(r.toString(16).length == 2) { //Parse it to string
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

    return "#"+(r+g+b).toUpperCase();
}

function ShadeColour(baseColourHEX, shadeColourHEX, mixAmount) { //A function to mix the colours multiple times
    if(mixAmount == 0) {
        return baseColourHEX;
    }

    for(let timesMixed = 1; timesMixed <= mixAmount; timesMixed++) {
        shadeColourHEX = MixColours(baseColourHEX, shadeColourHEX);
    }

    return shadeColourHEX;
}
