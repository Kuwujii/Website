this.window.addEventListener("load", function () {
    var neonGradients = Array(
        "linear-gradient(45deg, #5BCEFF 0%, #FFA9B7 25%, #FFFFFF 50%, #FFA9B7 75%, #5BCEFF 100%)", //Trans flag colours
        "linear-gradient(45deg, #FF9BCD 0%, #FF53BE 25%, #8A00FF 50%, #665EFF 75%, #8CA6FF 100%)", //Omni flag colours
        "linear-gradient(45deg, #FF4D00 0%, #FF8D00 100%)",                                        //81 logo colours
        "linear-gradient(45deg, #FFFFFF 0%, #FF143C 100%)",                                        //Polish flag colours
        "linear-gradient(45deg, #8706FF 0%, #FFB5E0 33.3%, #FFFFFF 66.6%, #76FFA4 100%)"           //Just a bunch of colours I like
    );
    var neonSizes = Array("2500%", "2500%", "1000%", "1000%", "2000%");

    document.documentElement.style.setProperty("--neon", neonGradients[Math.floor(Math.random()*neonGradients.length)]);
    document.documentElement.style.setProperty("--neon-size", neonSizes[Math.floor(Math.random()*neonSizes.length)]);

    //document.documentElement.style.setProperty("--sky", "linear-gradient(0deg, #4EA4D9 0%, #1763A6 100%)"); //day
    document.documentElement.style.setProperty("--sky", "linear-gradient(0deg, #032340 0%, #011526 100%)");   //night
});