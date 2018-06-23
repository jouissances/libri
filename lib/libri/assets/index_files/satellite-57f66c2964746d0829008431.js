_satellite.pushAsyncScript(function(event, target, $variables){
  window.r_injectScript(null, function() {
    // Pixels: Head*
    // Loads the main script tag
  	// TODO: Shouldn't this only work on PDP's
    if (typeof(twttr) != 'undefined') {
        twttr.conversion.trackPid('nuymb', {
            tw_sale_amount: 0,
            tw_order_quantity: 0,
            tw_product_id: _satellite.getVar('sku')
        });
    }
}, null, 100, 'Pixel: Twitter trackPid');
});
