_satellite.pushAsyncScript(function(event, target, $variables){
  // Pinterest ViewCategory
window.r_injectScript(null, function() {
    if (typeof(window.pintrk) !== 'undefined') {
        pintrk('track', 'viewcategory', {
            category_name: _satellite.getVar('pagePrimaryCategory')
        });
    }
}, null, 100, 'Pinterest ViewCategory');
});
