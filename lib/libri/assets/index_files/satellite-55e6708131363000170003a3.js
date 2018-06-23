_satellite.pushAsyncScript(function(event, target, $variables){
  window.r_injectScript(null, function() {
    var _comscore = _comscore || [];
    _comscore.push({
        c1: "2",
        c2: "6035001"
    });
    (function() {
        var s = document.createElement("script"),
            el = document.getElementsByTagName("script")[0];
        s.async = true;
        s.src = (document.location.protocol == "https:" ? "https://sb" : "http://b") + ".scorecardresearch.com/beacon.js";
        el.parentNode.insertBefore(s, el);
    })();
}, null, 100, 'Pixel: comScore Media Metrix');
});
