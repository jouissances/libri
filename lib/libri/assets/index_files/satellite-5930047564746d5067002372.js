_satellite.pushAsyncScript(function(event, target, $variables){
  window.r_injectScript(null, function() {
    if (typeof(google_trackConversion) != 'undefined') {
        var google_tag_params = {
            ecomm_prodid: [],
            ecomm_pagetype: 'category',
            ecomm_totalvalue: '',
        };

        window.google_trackConversion({
            google_conversion_id: 1026181156,
            google_remarketing_only: true,
            google_custom_params: window.google_tag_params
        });
    }
}, null, 100, 'Pixel: Google Remarketing');
});
