<!DOCTYPE html>
<html lang="en-us">
<head>
    <meta charset="utf-8">
    <title>Super Mario Bros in HTML5</title>

    <link href="mario.css" rel="stylesheet">
    <link href="Fonts/stylesheet.css" rel="stylesheet">
    
    <script src="data.js"></script>
    <script src="editor.js"></script>
    <script src="events.js"></script>
    <script src="generator.js"></script>
    <script src="library.js"></script>
    <script src="load.js"></script>
    <script src="mapas.js"></script>
    <script src="mario_noad.js"></script>
    <script src="quadrants.js"></script>
    <script src="sounds.js"></script>
    <script src="sprites.js"></script>
    <script src="thingssa.js?v2"></script>
    <script src="toned.js"></script>
    <script src="triggers.js"></script>
    <script src="upkeep.js"></script>
    <script src="utility.js"></script>

<link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.0.3/cookieconsent.min.css" />
<script src="//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.0.3/cookieconsent.min.js"></script>
<script>
window.addEventListener("load", function(){
window.cookieconsent.initialise({
  "palette": {
    "popup": {
      "background": "#000"
    },
    "button": {
      "background": "#f1d600"
    }
  },
  "theme": "edgeless",
  "content": {
    "href": "https://supernintendoemulator.com/page/privacy-policy"
  }
})});
function inIframe () {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}
document.addEventListener("DOMContentLoaded", function() {
   if(inIframe())
    {

    }
});


</script>
</head>

<body onload="FullScreenMario()">



</body>
</html>