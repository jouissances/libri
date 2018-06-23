_satellite.pushAsyncScript(function(event, target, $variables){
  // Combined Edition
// Performance Team at BN wanted to reduce the number of additional network calls, therefore,
// I've combined them into a single rule. It makes it hard to manage, however, performance is known
// to increase conversion.

// JS: Google Remarketing Async
// Inject script immediately on the page
//---------------------------------------------------------------------------------------------------->
window.r_injectScript('//www.googleadservices.com/pagead/conversion_async.js', null, null, 10);

// JS: Twitter Universal Tag
// https://static.ads-twitter.com/oct.js
//---------------------------------------------------------------------------------------------------->
//window.r_injectScript('//platform.twitter.com/oct.js', null, null, 10);

// JS: Dynamic Yield
// Playing field was leveled as these guys are going against
// each other and we want to ensure they all have an equal chance
// DynamicYield,Evergage & Reflektion
//---------------------------------------------------------------------------------------------------->
window.DY = (window.DY || {});
DY.recommendationContext  =   {
	type:  _satellite.getVar('pageType').toUpperCase(),
	data: [],
	lng: _satellite.getVar('language')
};

// Determine data to pass
switch (_satellite.getVar('pageType')) {
case 'home':
	DY.recommendationContext.type = 'HOMEPAGE';
	break;
case 'category':
	DY.recommendationContext.data = _satellite.getVar('pageCategoryBreadcrumb').split('|');
	break;
case 'pdp':
	DY.recommendationContext.type = 'PRODUCT';
	DY.recommendationContext.data = [_satellite.getVar('sku')];
	break;
case 'cart':
	DY.recommendationContext.data = _satellite.getVar('shoppingCartSKUs');
	break;
default:
	DY.recommendationContext.type = 'OTHER';
	break;
}

window.r_injectScript('//cdn.dynamicyield.com/api/8768416/api_dynamic.js', null, false, 0, 'Dynamic Yield Dynamic.js');
window.r_injectScript('//cdn.dynamicyield.com/api/8768416/api_static.js', null, false, 0, 'Dynamic Yield Static.js');

/*
// JS: Pinterest
//---------------------------------------------------------------------------------------------------->
// <!-- Pinterest Pixel Base Code -->
! function (e) {
	if (!window.pintrk) {
		window.pintrk = function () {
			window.pintrk.queue.push(Array.prototype.slice.call(arguments))
		};
		var n = window.pintrk;
		n.queue = [], n.version = "3.0";
		var t = document.createElement("script");
		t.async = !0, t.src = e;
		var r = document.getElementsByTagName("script")[0];
		r.parentNode.insertBefore(t, r)
	}
}("https://s.pinimg.com/ct/core.js");

pintrk('load', '2613952464804');
pintrk('page', {
	page_name: _satellite.getVar('pageName'),
	page_category: _satellite.getVar('pageType')
});
// <!-- Pinterest Pixel Base Code -->
*/
});
