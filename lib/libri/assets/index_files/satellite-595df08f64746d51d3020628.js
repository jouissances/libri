_satellite.pushAsyncScript(function(event, target, $variables){
  /*jshint -W069*/
/*globals window,_satellite,br_data,BrTrk*/

// TPI-225
// https://rawsoft.atlassian.net/browse/BN-5
// This is sequential since it doesn't really make any calls but rather set the vars
// PLR - 556be9c13932350014c20000

/* --- Begin parameters section: fill in below --- */

window.br_data = (window.br_data || {});
window.br_data.acct_id = '5457';
window.br_data.ptype = 'other';
window.br_data.is_conversion = '0';
window.br_data.type = (window.br_data.type || 'pageview');

// Category
br_data.cat_id = _satellite.getVar('pagePrimaryCategoryId');
br_data.cat = _satellite.getVar('pageCategoryBreadcrumb');

// Home
if (_satellite.getVar('pageType') === 'home') {
    br_data.ptype = 'homepage';
}

// Search
if (_satellite.getVar('pageType') === 'onsite search') {
    br_data.ptype = 'search';
    br_data.search_term = _satellite.getVar('internalSearchTerm');
}

// Category
if (_satellite.getVar('pageType') === 'category' || _satellite.getVar('pageType') === 'storefront') {
    br_data.ptype = 'category';
}

// Product
if (_satellite.getVar('pageType') === 'pdp') {
    var product = window.r_getByPath(window, 'digitalData.product[0]');
    br_data.ptype = 'product';
    br_data.cat = _satellite.getVar('productCategoryBreadcrumb');
    br_data.prod_id = (product.productInfo.sku || product.productInfo.productID);
    br_data.prod_name = product.productInfo.productName;
    br_data.sku = product.productInfo.sku;
}

// Confirmation
if (_satellite.getVar('pageType') === 'confirmation' || _satellite.getVar('pageType') === 'receipt') {
    br_data.is_conversion = '1';
    br_data.basket_value = _satellite.getVar('transactionTotal');
    br_data.order_id = _satellite.getVar('transactionID');
}

/* Extended basket tracking. To be filled in only on pages with is_conversion = 1 */
if (br_data.is_conversion === '1') {

    var items = window.r_getByPath(window, 'digitalData.transaction.item');
    if (typeof (items) !== 'undefined') {
        br_data.basket = {
            items: []
        };

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            br_data.basket.items.push({
                "prod_id": (item.productInfo.sku || item.productInfo.productID),
                "sku": item.productInfo.sku,
                "name": item.productInfo.productName,
                "quantity": item.quantity,
                "price": item.price.basePrice
            });
        }
    }
}


window.r_injectScript('//cdns.brsrvr.com/v1/br-trk-5457.js', function () {
    
    // Not sure what to do yet
    window.r_dtm_notify('BloomReach Pixel: ' + br_data.acct_id);

    // TODO: Continue from Add to Cart

    // 1. Search - Normal
    // 2. Search - TypeAhead
    // NOTE: We don't track what they searched for, so we are going to need DEV for that.
    // OR: maybe we could scrape it.
    if (typeof (BrTrk) !== 'undefined' && _satellite.getVar('pageType').indexOf('search') > -1) {

        var actionType = 'submit';
        var searchData = {};
        searchData["q"] = _satellite.getVar('internalSearchTerm');

        var searchType = _satellite.getVar('internalSearchType');
        if (searchType && searchType === 'typeahead') {
            searchData["aq"] = _satellite.getVar('internalSearchTerm');
            actionType = 'click';
        }

        BrTrk.getTracker().logEvent(
            "suggest", // Type of the log Event
            actionType, // Action Type
            searchData, // Data related to the event (defined above)
            {}, // Empty value
            true); // Deferred is set to true

    } else {
        window.r_dtm_warn('BloomReach: BrTrk = ' + typeof (BrTrk));
    }
}, null, 100);

// MOVED to all pages page bottom all

/*
window.r_dtm_notify('BloomReach Data Object: Loaded');
window.r_dtm_notify('BloomReach Data Object: Loaded - ' + _satellite.getVar('pagePrimaryCategoryId'));
*/
});
