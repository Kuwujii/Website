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

    var neonGradients = Array(
        "linear-gradient(45deg, #5BCEFF 0%, #FFA9B7 25%, #FFFFFF 50%, #FFA9B7 75%, #5BCEFF 100%)",
        "linear-gradient(45deg, #FF9BCD 0%, #FF53BE 25%, #8A00FF 50%, #665EFF 75%, #8CA6FF 100%)",
        "linear-gradient(45deg, #FF4D00 0%, #FF8D00 100%)",
        "linear-gradient(45deg, #FFFFFF 0%, #FF143C 100%)",
        "linear-gradient(45deg, #8706FF 0%, #FFB5E0 33.3%, #FFFFFF 66.6%, #76FFA4 100%)"
    );
    var neonSizes = Array("2500%", "2500%", "1000%", "1000%", "2000%");

    var choice = Math.floor(Math.random()*neonGradients.length)
    document.documentElement.style.setProperty("--neon", neonGradients[choice]);
    document.documentElement.style.setProperty("--neon-size", neonSizes[choice]);

    document.documentElement.style.setProperty("--sky", "linear-gradient(0deg, #4EA4D9 0%, #1763A6 100%)");     //day
    //document.documentElement.style.setProperty("--sky", "linear-gradient(0deg, #032340 0%, #011526 100%)");   //night

    var canvas = document.getElementById("canvas")
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        
        for(var layer = 0; layer < 1; layer++) {
            var start = -Math.floor(Math.random()*(canvas.width/4)+1)
            var end = canvas.width+Math.floor(Math.random()*(canvas.width/4)+1)
            var cursor = start;

            while(cursor <= end) {
                var mtWidth = Math.floor(Math.random()*(canvas.width/4)+1)+(canvas.width/8)
                var mtHeight = Math.floor(Math.random()*(mtWidth/2)+1)+(canvas.height/4)

                if(cursor+mtWidth > end) {
                    mtWidth = end-cursor;
                }
                
                mtWidth = Math.round(mtWidth/2)
                if(mtWidth == 0) {
                    mtWidth = 1;
                }

                var mtMiddle = Math.round(Math.floor(Math.random()*((mtWidth/2)*2)+1)-(mtWidth/2))


                ctx.beginPath();
                ctx.moveTo(cursor, canvas.height);
                ctx.lineTo(cursor+mtWidth, mtHeight);
                ctx.lineTo(cursor+(mtWidth*2), canvas.height);

                var gradientLight = ctx.createLinearGradient(cursor+mtWidth, mtHeight, cursor+mtWidth-mtMiddle, canvas.height);
                gradientLight.addColorStop(0, "#F2F2F2");
                gradientLight.addColorStop(0.5, "#474B56");
                gradientLight.addColorStop(1, "#35373E");

                ctx.fillStyle = gradientLight;
                ctx.fill();

                ctx.beginPath();
                ctx.moveTo(cursor+mtWidth+mtMiddle, canvas.height);
                ctx.lineTo(cursor+mtWidth, mtHeight);
                ctx.lineTo(cursor+(mtWidth*2), canvas.height);

                var gradientDark = ctx.createLinearGradient(cursor+mtWidth, mtHeight, cursor+mtWidth-mtMiddle, canvas.height);
                gradientDark.addColorStop(0, "#D5D5E4");
                gradientDark.addColorStop(0.5, "#3F435B");
                gradientDark.addColorStop(1, "#2F3147");

                ctx.fillStyle = gradientDark;
                ctx.fill();

                cursor += mtWidth*2;
            }
        }

        console.log("yup");
    }
});