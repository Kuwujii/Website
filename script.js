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
        "linear-gradient(45deg, #8706FF 0%, #FFB5E0 33.3%, #FFFFFF 66.6%, #76FFA4 100%)"
    ];
    var neonSizes = ["2500%", "2500%", "1000%", "1000%", "2000%"];

    var choice = Math.floor(Math.random()*neonGradients.length);
    document.documentElement.style.setProperty("--neon", neonGradients[choice]);
    document.documentElement.style.setProperty("--neon-size", neonSizes[choice]);

    document.documentElement.style.setProperty("--sky", "linear-gradient(0deg, #4EA4D9 0%, #1763A6 100%)");     //day
    //document.documentElement.style.setProperty("--sky", "linear-gradient(0deg, #032340 0%, #011526 100%)");   //night

    var canvas = document.getElementById("canvas");
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        var baseMtColours = ["#F2F2F2", "#474B56", "#35373E"];
        
        for(var layer = 0; layer < 5; layer++) {
            var start = -Math.floor(Math.random()*(canvas.width/4)+1);
            var end = canvas.width+Math.floor(Math.random()*(canvas.width/4)+1);
            var cursor = start;
            var layerFix = 1+(0.25*layer);
            console.log(layerFix);

            var mtColours = [];

            for(var i = 0; i < baseMtColours.length; i++) {
                mtColours.push(ShadeColour(baseMtColours[i], "#0000FF", layer+1));
            }

            while(cursor <= end) {
                var mtWidth = Math.floor(Math.random()*(canvas.width/4)+1)+(canvas.width/5);
                var mtHeight = Math.floor(Math.random()*((mtWidth/2)*layerFix)+1)+((canvas.height/3)/layerFix);

                if(cursor+mtWidth > end) {
                    mtWidth = end-cursor;
                }
                
                mtWidth = Math.round(mtWidth/2);
                if(mtWidth == 0) {
                    mtWidth = 1;
                }

                var mtMiddle = Math.round(Math.floor(Math.random()*((mtWidth/2)*2)+1)-(mtWidth/2));

                ctx.beginPath();
                ctx.moveTo(cursor, canvas.height);
                ctx.lineTo(cursor+mtWidth, mtHeight);
                ctx.lineTo(cursor+(mtWidth*2), canvas.height);

                var gradientLight = ctx.createLinearGradient(cursor+mtWidth, mtHeight, cursor+mtWidth-mtMiddle, canvas.height);
                gradientLight.addColorStop(0, mtColours[0]);
                gradientLight.addColorStop(0.5, mtColours[1]);
                gradientLight.addColorStop(1, mtColours[2]);

                ctx.fillStyle = gradientLight;
                ctx.fill();

                ctx.beginPath();
                ctx.moveTo(cursor+mtWidth+mtMiddle, canvas.height);
                ctx.lineTo(cursor+mtWidth, mtHeight);
                ctx.lineTo(cursor+(mtWidth*2), canvas.height);

                var gradientDark = ctx.createLinearGradient(cursor+mtWidth, mtHeight, cursor+mtWidth-mtMiddle, canvas.height);
                gradientDark.addColorStop(0, ShadeColour(mtColours[0], "#000000", 4));
                gradientDark.addColorStop(0.5, ShadeColour(mtColours[1], "#000000", 4));
                gradientDark.addColorStop(1, ShadeColour(mtColours[2], "#000000", 4));

                ctx.fillStyle = gradientDark;
                ctx.fill();

                cursor += mtWidth*2;
            }
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

    return "#"+(b | (g << 8) | (r << 16)).toString(16).toUpperCase();
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
