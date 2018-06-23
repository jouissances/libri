_satellite.pushAsyncScript(function(event, target, $variables){
  // Pinterest PageVisit
window.r_injectScript(null, function() {
    if (typeof(window.pintrk) !== 'undefined') {
        pintrk('track', 'pagevisit');
    }
}, null, 100, 'Pinterest PageVisit');
});
