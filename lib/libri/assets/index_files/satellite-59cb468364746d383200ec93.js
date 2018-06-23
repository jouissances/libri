_satellite.pushAsyncScript(function(event, target, $variables){
  window.r_injectScript('//static.criteo.net/js/ld/ld.js', function() {
    // custom
    // Criteo needs to capture the ids of the top 3 products appearing in the page. 
    var items = [];
    try {
        var products = window.r_getByPath(window, 'digitalData.product', [])
        for (var i = 0; i < products.length; i++) {
            var sku = window.r_getByPath(products[i], 'productInfo.sku');
            if (sku) {
                items.push(sku);
                if (items.length === 3) {
                    break;
                }
            }
        }
    } catch (e) {}

    //
    window.criteo_q = window.criteo_q || [];
    var deviceType = /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/.test(navigator.userAgent) ? "m" : "d";
    window.criteo_q.push({
        event: "setAccount",
        account: 2641
    }, {
        event: "setSiteType",
        type: deviceType
    }, {
        event: "setHashedEmail",
        email: [_satellite.getVar('userHashedEmail')]
    }, {
        event: "viewList",
        item: items
    });
}, null, 100);
});
