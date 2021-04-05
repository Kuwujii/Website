window.addEventListener("load", () => {
    document.getElementById("copy").addEventListener("click", () => {
        var temp = document.createElement("input");
        temp.className = "temp"
        document.body.appendChild(temp);

        temp.value = document.getElementById("copy").getAttribute("copy");

        temp.select();
        document.execCommand("copy");

        document.body.removeChild(temp);
    });

    var neonGradients = [
        "linear-gradient(45deg, #5BCEFF 0%, #FFA9B7 25%, #FFFFFF 50%, #FFA9B7 75%, #5BCEFF 100%)",
        "linear-gradient(45deg, #FF9BCD 0%, #FF53BE 25%, #8A00FF 50%, #665EFF 75%, #8CA6FF 100%)",
        "linear-gradient(45deg, #FF4D00 0%, #FF8D00 100%)",
        "linear-gradient(45deg, #FFFFFF 0%, #FF143C 100%)",
        "linear-gradient(45deg, #8706FF 0%, #FFB5E0 33.33%, #FFFFFF 66.67%, #76FFA4 100%)",
        "linear-gradient(45deg, #FF0000 0%, #FFFF00 16.67%, #00FF00 33.33%, #00FFFF 50%, #0000FF 66.67%, #FF00FF 83.33%, #FF0000 100%)"
    ];
    var neonSizes = ["2500%", "2500%", "1000%", "1000%", "2000%", "3500%"];

    var choice = Math.floor(Math.random()*neonGradients.length);
    document.documentElement.style.setProperty("--neon", neonGradients[choice]);
    document.documentElement.style.setProperty("--neon-size", neonSizes[choice]);

    var sky = ["#4EA4D9", "#1763A6"] //day
    //var sky = ["#032340", "#011526"] //night

    document.documentElement.style.setProperty("--sky", "linear-gradient(0deg, "+sky[0]+" 0%, "+sky[1]+" 100%)");

    var canvas = document.getElementById("canvas");
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        var grassColours = ["#267302", "#155902"];
        var fenceColour = "#50290A";
        var baseMtColours = ["#F2F2F2", "#474B56", "#35373E", ShadeColour(grassColours[1], "#000000", 2)];
        var plannedLayers = 5;
        
        for(var layer = 0; layer < plannedLayers; layer++) {
            var start = -Math.floor(Math.random()*((canvas.width/3)-1)+1);
            var end = canvas.width+Math.floor(Math.random()*((canvas.width/3)-1)+1);
            var cursor = start;
            var layerFix = Math.round(canvas.width*((plannedLayers-layer)/50))

            var mtColours = [];

            for(var i = 0; i < baseMtColours.length; i++) {
                mtColours.push(ShadeColour(baseMtColours[i], sky[1], layer+1));
            }

            while(cursor <= end) {
                var mtWidth = Math.floor(Math.random()*((canvas.width/3)-(canvas.width/4))+(canvas.width/4));
                var mtHeight = (Math.round(mtWidth/Math.sqrt(3))*2)-layerFix;
                
                mtWidth = Math.round(mtWidth/2);
                if(mtWidth == 0) {
                    mtWidth = 1;
                }

                var mtMiddle = Math.round(Math.floor(Math.random()*((mtWidth/2)*2)+1)-(mtWidth/2));

                ctx.beginPath();
                ctx.moveTo(cursor, canvas.height);
                ctx.lineTo(cursor, canvas.height-layerFix);
                ctx.lineTo(cursor+mtWidth, mtHeight-layerFix);
                ctx.lineTo(cursor+(mtWidth*2), canvas.height-layerFix);
                ctx.lineTo(cursor+(mtWidth*2), canvas.height);

                var gradientLight = ctx.createLinearGradient(cursor+mtWidth, mtHeight, cursor+mtWidth-mtMiddle, canvas.height);
                gradientLight.addColorStop(0, mtColours[0]);
                gradientLight.addColorStop(0.25, mtColours[1]);
                gradientLight.addColorStop(0.5, mtColours[2]);
                gradientLight.addColorStop(1, mtColours[3]);

                ctx.fillStyle = gradientLight;
                ctx.fill();

                ctx.beginPath();
                ctx.moveTo(cursor+mtWidth+mtMiddle, canvas.height);
                ctx.lineTo(cursor+mtWidth+mtMiddle, canvas.height-layerFix);
                ctx.lineTo(cursor+mtWidth, mtHeight-layerFix);
                ctx.lineTo(cursor+(mtWidth*2), canvas.height-layerFix);
                ctx.lineTo(cursor+(mtWidth*2), canvas.height);

                var gradientDark = ctx.createLinearGradient(cursor+mtWidth, mtHeight, cursor+mtWidth-mtMiddle, canvas.height);
                gradientDark.addColorStop(0, ShadeColour(mtColours[0], "#000000", 4));
                gradientDark.addColorStop(0.25, ShadeColour(mtColours[1], "#000000", 4));
                gradientDark.addColorStop(0.5, ShadeColour(mtColours[2], "#000000", 4));
                gradientDark.addColorStop(1, ShadeColour(mtColours[3], "#000000", 4));

                ctx.fillStyle = gradientDark;
                ctx.fill();

                cursor += mtWidth*2;
            }
        }

        var groundLevel = canvas.height-(canvas.height*0.1);
        
        var gradientGround = ctx.createLinearGradient(canvas.width, groundLevel, 0, canvas.height);
        gradientGround.addColorStop(0, grassColours[0]);
        gradientGround.addColorStop(1, grassColours[1]);

        ctx.fillStyle = gradientGround;
        ctx.fillRect(0, groundLevel, canvas.width, groundLevel);

        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        ctx.lineTo(0, groundLevel+(groundLevel*0.1));
        ctx.lineTo(canvas.width, groundLevel+(groundLevel*0.09));
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);

        var gradientGround = ctx.createLinearGradient(canvas.width, canvas.height, canvas.width/4, groundLevel+(groundLevel*0.09));
        gradientGround.addColorStop(0, baseMtColours[1]);
        gradientGround.addColorStop(1, baseMtColours[2]);

        ctx.fillStyle = gradientGround;
        ctx.fill();

        var start = -Math.floor(Math.random()*((canvas.width/3)-1)+1);
        var end = canvas.width+Math.floor(Math.random()*((canvas.width/3)-1)+1);
        var cursor = start;

        var fenceLevel = canvas.height-(canvas.height*0.09);

        var gradientFence = ctx.createLinearGradient(canvas.width, -fenceLevel*0.125, 0, fenceLevel);
        gradientFence.addColorStop(0, fenceColour);
        gradientFence.addColorStop(1, MixColours(fenceColour, "#000000"));

        ctx.fillStyle = gradientFence;
        
        while(cursor <= end) {
            ctx.fillRect(cursor, fenceLevel, canvas.width/100, -fenceLevel*0.125);
            ctx.fillRect(cursor+(canvas.width/200), fenceLevel-((fenceLevel*0.125)/2), canvas.width/12.5, canvas.width/200);
            ctx.fillRect(cursor+(canvas.width/200), fenceLevel-((fenceLevel*0.125)*(3/4)), canvas.width/12.5, canvas.width/200);

            cursor += canvas.width/12.5;
        }
    }
});

function MixColours(colourHEX1, colourHEX2) {
    colourHEX1 = colourHEX1.slice(1);
    colourHEX2 = colourHEX2.slice(1);

    var colourRGB1 = parseInt(colourHEX1, 16);
    var colourRGB2 = parseInt(colourHEX2, 16);

    var r = Math.round((((colourRGB1 >> 16) & 0xFF)+((colourRGB2 >> 16) & 0xFF))/2);
    var g = Math.round((((colourRGB1 >> 8) & 0x00FF)+((colourRGB2 >> 8) & 0x00FF))/2);
    var b = Math.round((((colourRGB1) & 0x0000FF)+((colourRGB2) & 0x0000FF))/2);

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

    for(var timesMixed = 1; timesMixed <= mixAmount; timesMixed++) {
        shadeColourHEX = MixColours(baseColourHEX, shadeColourHEX);
    }

    return shadeColourHEX;
}
