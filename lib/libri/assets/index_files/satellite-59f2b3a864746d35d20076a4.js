// NOTE: This is a combination of preSlib & rawsoft_helper.js
// This was requested by the performance team to help with performance

// FILE: helper functions 140714h dtm.js
// AUTHOR: Copyright 1996-2014 Adobe, Inc. All Rights Reserved
// DESCRIPTION: Helper functions for data layer
// UPDATED: 14.08.26
// USAGE:
// 1. Create a DTM Page Load Rule called "Helper Functions"
// 2. Make sure "Trigger rule at" is set to "Top of Page" under "Conditions"
// 3. Make sure "Execuite Globally" is checked
// 4. Under "Javascript/Third Party Tags", add a new script under "Sequential Javascript" called "Helper Functions"
// 5. Upload this file into the code window and check "Execute Globally"

/************************** preSlib v1.50 - General Helper Functions *************************/

var W=eval('window');

// preSlib enabler functions
if(!W.s_is)W.s_is=function(x){var t=x===null?'null':typeof x;if(t=='object'&&typeof x.length=='number')t='array';return t}
if(!W.s_isN)W.s_isN=function(x){return s_is(x)=='number'}
if(!W.s_isS)W.s_isS=function(x){return s_is(x)=='string'}
if(!W.s_MC)W.s_MC=function(a,c){try{if(s_isS(c))c=c=='lc'?-1:c=='uc'?1:0;if(!s_isN(c))c=c?1:0;a+='';a=c<0?a.toLowerCase(a):c>0?a.toUpperCase(a):a}catch(e){}return a}
if(!W.s_LC)W.s_LC=function(a){return s_MC(a,'lc')}
if(!W.s_UC)W.s_UC=function(a){return s_MC(a,'uc')}
if(!W.s_scrubWS)W.s_scrubWS=function(t){try{if(t==null)t='';t=t.replace(/^\s+/g,'').replace(/\s+$/g,'').replace(/\s+/g,' ')}catch(e){}return t}
if(!W.s_split)W.s_split=function(l,d){var i,x=0,a=new Array;if(!d)d=',';while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x++]=l.substring(0,i);l=l.substring(i+d.length)}return a}
if(!W.s_getHTMLtag)W.s_getHTMLtag=function(y){var a='',v='',g='',t='',f='',c='mc',p=arguments,l=p.length,i;if(!y)return f;if(l>1){i=s_LC(p[l-1]);if(i=='uc'||i=='lc'||i=='mc'){c=i;l--}}y=s_LC(y);if(l==2)g=s_LC(p[1]);else if(l>=3){a=s_LC(p[1]);v=s_MC(p[2],c);if(l>=4)g=s_MC(p[3],c)}if(document.getElementsByTagName)t=document.getElementsByTagName(y);if(typeof t!='object')return f;for(i=0;!f&&i<t.length;i++){f=t[i];if(a&&v&&s_MC(f.getAttribute(a),c)!=v)f=''}if(!f||typeof f!='object'||!g)return f;if(g!='text')return f.getAttribute(g);f=f.innerText||f.textContent||'';f=f.replace(/\s*>\s*/g,'>').replace(/^>+/,'').replace(/>+$/,'');return f}
if(!W.s_parseUri)W.s_parseUri=function(u){if(u){u=u+'';u=u.indexOf(':')<0&&u.indexOf('//')!=0?(u.indexOf('/')==0?'/':'//')+u:u}var u=u?u+'':window.location.href,e,a=document.createElement('a'),p='',r={};a.setAttribute('href',u);for(e in a)if(typeof a[e]=='string')r[e]=a[e];delete a;p=r.pathname||'';if(p.indexOf('/')!=0)r.pathname='/'+p;return r}
if(!W.s_indexOf)W.s_indexOf=function(t,s){var r;try{r=(s?s+'':'').indexOf(t)}catch(e){r=-1}return r}

// preSlib utilities
if(!W.s_getCharSet)W.s_getCharSet=function(){var v=s_getHTMLtag('meta','http-equiv','content-type','content'),i;if(!v)return'';i=v.indexOf('charset=');if(i==-1)return'';return s_UC(v.substring(i+8,99).replace(/[\'\";, ].*/,''))}
if(!W.s_getQueryStr)W.s_getQueryStr=function(n,u){var g,h,i,a='&',q=u||window.location.search,p=q.toLowerCase().replace(/\?/g,a)+a;n=a+n.toLowerCase();g=n+'=';h=p.indexOf(g);if(h>-1){i=h+g.length;return decodeURIComponent(q.substring(i,p.indexOf(a,i)).replace(/\+/g,' '))}g=n+a;return p.indexOf(g)>-1?' ':''}
if(!W.s_apl)W.s_apl=function(l,v,d,u){var m=0;if(!l)l='';if(u){var i,n,a=s_split(l,d);for(i=0;i<a.length;i++){n=a[i];m=m||(u==1?(n==v):(s_LC(n)==s_LC(v)))}}if(!m)l=l?l+d+v:v;return l}
if(!W.s_getShortHn)W.s_getShortHn=function(u){return s_LC(s_parseUri(u||window.location.href).hostname.replace(/^www-?[0-9]*\./i,''))}
if(!W.s_getOwnerHn)W.s_getOwnerHn=function(u){return s_LC(s_parseUri(u||window.location.href).hostname.replace(/^www[0-9]*\./i,'').replace(/\.(gov|edu|com|mil|org|net|int).*/,'').replace(/\.[a-z][a-z]$/,'').replace(/.*\./,''))}
if(!W.s_getTLDlevels)W.s_getTLDlevels=function(u){var h=s_parseUri(u||window.location.href).hostname;return h.match(RegExp("\\.co\\..{2}$","i"))||h.match(RegExp("\\.(gov|edu|com|mil|org|net|int)\\..{2}$","i"))?3:2}
if(!W.s_getCookieDomain)W.s_getCookieDomain=function(u){var h=s_parseUri(u||window.location.href).hostname,n=s_getTLDlevels(),a=s_split(h,'.'),i=a.length-n;for(h='';i<a.length;i++)h+='.'+a[i];return h}
if(!W.s_c_w)W.s_c_w=function(n,v,e,d){if(W.s&&typeof W.s=='object'&&W.s.c_w&&!d)return W.s.c_w(n,v,e);v+='';var t=v?0:-60;if(t){e=new Date;e.setTime(e.getTime()+(t*1e3))}if(n)document.cookie=n+'='+escape(v||'[[B]]')+'; path=/'+(d?'; domain='+d:'')+(e?';  expires='+e.toGMTString():'');return n?s_c_r(n)==v:0}
if(!W.s_c_r)W.s_c_r=function(n){if(W.s&&typeof W.s=='object'&&W.s.c_r)return W.s.c_r(n);var c=' '+document.cookie,i=c.indexOf(' '+n+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':unescape(c.substring(i+2+n.length,e<0?c.length:e));return v=='[[B]]'?'':v}
if(!W.s_c_d)W.s_c_d=function(n,e,p,d,s){document.cookie=n+'='+escape('[[B]]')+(p?'; path='+p:'')+(d?'; domain='+d:'')+(e?'; expires=Thu, 01 Jan 1970 00:00:01 GMT':'; max-age=0')+(s?'; secure':'')}
if(!W.s_getLoadTime)W.s_getLoadTime=function(){if(!window.s_loadT){var o=window.performance?performance.timing:0,a=o?o.requestStart:window.inHeadTS||0;s_loadT=a?Math.round(((o.domInteractive||new Date().getTime())-a)/100):''}return s_loadT}
if(!W.s_clog)W.s_clog=function(){try{var A='array',O='object',X='undefined',F='function',U='null',a=arguments,al=a.length,i,j,k,v,l='',o=l,e=l,c=l,x=0,d=0,z=0,p,p1=[],q,f0=1,f1=1,f2=1,f3=1,m=1<<16,T=function(z){var t=z===null?U:typeof z;if(t==A)t=O;return t},W=function(o){try{c+=o+'\n';if(window.s_Debug){if(T(s_debugW)!=O)s_debugW=window.open('','_debugWin','height=600,width=900,toolbar=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes');if(T(s_debugW)==O){if(T(s_debugD)!=O)s_debugD=s_debugW.document;if(T(s_debugD)==O){if(T(s_debugD.write)==F)s_debugD.write('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN"><html><head><title>debugWin</title><style>* {font-family:Andale Mono,OCR A Extended,Consolas,monospace,serif;font-size:9pt;word-wrap:break-word;padding:0px} p {display:block;clear:both;margin:1px;width:100%;border:none;border-bottom:1px solid #dddddd;}</style></head><body>');if(T(s_debugD.write)==F)s_debugD.write('<p>'+o.replace(/[ \t]/g,'&nbsp;').replace(/\</gi,'&lt;').replace(/\>/gi,'&gt;').replace(/\n$/,'').replace(/\n/gi,'<br/>')+'</p>');if(T(s_debugW.scrollBy)==F)s_debugW.scrollBy(0,100)}}}else if(T(console.log)==F||T(console.log)==O)console.log('%s',o)}catch(e){}},B=function(v){v=v+'';var j,b,r,w,c,f=1;for(j=0;j<v.length;j++){b=v.substr(j,1);r=b=='\n';w=b<=' ';c=b<'A';if(r||(f&&c&&l.length>140)||(f&&l.length+v.substring(j).replace(/\n.*/,'').length>140)){o+=l;z+=o.length;if(o.length>9999){W(o);o=''}else o+='\n';l=r?'':'  ';x=!r;f=0}if(!r&&(!x||!w)){l+=b;x=f=0}}},P=function(v){var d=0,i,err=0,u=function(x,v){if(!f3&&d>0){B('\n');for(k=0;k<=d;k++)B(p1.length>k&&p1[k]&&T(p1[k])=='string'?p1[k]:'');if(arguments.length==1)B(' = ')}if(arguments.length<2){var t=T(x);if(t=='string')B("'"+x+"'");else if(t=='boolean')B(x?'true':'false');else if(t==F)B(F+'(){...}');else if(t==U)B(U);else if(t==X)B(X);else B(x+'')}else if(!f3)B((T(v)!='object'?'':T(v.length)=='number'?'[]':'{}'))},b=function(v){if(++d>99){d--;B(' !!!TOO DEEP TO DISPLAY!!!');return}var o=T(v)==O&&T(v.length)!='number',p,x,f=1,j=0;if(f3)B(o?'{':'[');for(p in v){j++;if(!f3)p1[d]=o?'.'+p:'['+p+']';else{B(f?'':',');if(o){B('\n');for(i=0;i<d;i++)B(' ')}}if(j>1000){B('/* ERROR! TRUNCATED: TOO LARGE */');err=1}if(!err){if(o&&f3)B(p+': ');x=v[p];if(T(x)==O)b(x);else u(x)}f=0}d--;if(f3){if(o){B('\n');for(i=0;i<d;i++)B(' ');B('}')}else B(']')}else if(j==0)u(x,v)};if(T(v)!=O)u(v);else b(v)},FN=function(c){var n='',v,j;try{if(c){c=c+'';if(!c.indexOf(F+' '))c=c.substring(9);j=c.indexOf('(');if(j>-1)c=c.substring(0,j);if(!c)c='anonymous';n=c}}catch(e){}return n};var cn='s_debug',dp=s_getQueryStr(cn);if(dp>''){dp=dp==' '?1:parseInt(dp)||0;s_c_w(cn,String(dp))}dp=s_c_r(cn);s_Debug=dp>''?parseInt(dp):window.s_Debug||0;for(i=0;i<al;i++){v=a[i];switch(v){case'-f':f0=0;break;case'+f':f0=1;break;case'+u':f1=1;break;case'-u':f1=0;break;case'+n':f2=1;break;case'-n':f2=0;break;case'+o':f3=1;break;case'-o':f3=0;break;case'arguments':v=arguments.callee.caller;for(j=v;j;j=j.caller)q=FN(j)+(q?'>'+q:'');B(q);P(v.arguments);break;case F:B(FN(arguments.callee.caller));break;case'stack':B(st());break;default:if(T(v)==O){for(p in v)if(z<m&&z>=0)if(isNaN(p))if(f3)B(p+'=');else p1[0]=p;P(v[p])}else B(v);break}B(' ')}o+=l;o=o.replace(/^[ \t]*\n/,'').replace(/[ \t\n]*$/,'');if(o)W(o)}catch(e){}return c}


/************************** DATA LAYER AND DTM SUPPORT SECTION *************************/

if(!Object.create){Object.create=function(o){var F=function(){};F.prototype=o;return new F()}}
if(!W.s_logS)W.s_logS=function(S){var W=window,A=W.$AAD||{},f=A.$logLevel||0;if(f<2)return;var w='pageName,pageType,channel,hier1,hier2,hier3,hier4,hier5,server,pageURL,referrer,visitorID,purchaseID,transactionID,events,products,zip,state,linkTrackVars,linkTrackEvents,linkURL,linkName,campaign,list1,list2,list3',x=w.split(','),l=0,o={},A=function(n){if(typeof S[n]!='undefined'&&S[n]!==null&&S[n]+'')o[n]=S[n]};if(!S||typeof S!='object')s_log(2,'ERROR: Adobe Analytics s object undefined.');else{for(i=0;i<x.length;i++)A(x[i]);for(i=1;i<76;i++)A('eVar'+i);for(i=1;i<76;i++)A('prop'+i);s_log(2,'-o',{'s':o})}}
if(!W.s_logE)W.s_logE=function(e,T){var W=window,A=W.$AAD||{},f=A.$logLevel,t='ERROR'+(T&&typeof T=='string'&&T?' in '+T:''),n=typeof e=='object'?(e.number||0)&0xffff:'',l='',m=e.message||e.description||'',d='',s='';if(typeof n=='number'){if(n)d=n+': ';if(e.name&&(f<2||(e.stack||'').indexOf(e.name)<0))d+=e.name;if(m&&(f<2||(e.stack||'').indexOf(m)<0))d+=(d?': ':'')+m;if(e.lineNumber)l+='Line '+e.lineNumber;if(e.columnNumber)l+=', Column'+e.columnNumber;if(e.fileName)l+=(l?' ':'')+'in '+e.fileName;if(e.stack&&f>=2)s=e.stack;s_log(0,t);if(d)s_log(0,d);if(l)s_log(0,l);if(s)s_log(0,s)}}
if(!W.s_log)W.s_log=function(l){var W=window,A=W.$AAD||{},f=A.$logLevel,n=[],i,v,t;if(W.s_clog&&(typeof f=='number'?f:0)>=l){n.push('-o');for(i=1;i<arguments.length;i++){v=arguments[i];t=typeof v;switch(t){case'object':n.push([v]);break;case'function':break;default:n.push(v);break}}s_clog.apply(this,n)}return''}
if(!W.s_logSep)W.s_logSep=function(n,c){if(!c)c='=';var t=function(n){return n<10?'0'+n:''+n},p=function(n){while(n-->0)o+=c},d=new Date(),o='';p(30);o+=' '+d.getFullYear()+'.'+t(d.getMonth()+1)+'.'+t(d.getDate())+' '+t(d.getHours())+':'+t(d.getMinutes())+':'+t(d.getSeconds())+'.'+t(parseInt(''+(d%1000)/10))+' ';p(30);s_log(n,o)}
if(!W.s_startTimer)W.s_startTimer=function(){var n=new Date().getTime();W=window,O='object',A=W.$AAD&&typeof W.$AAD==O?W.$AAD:{};A.$msTimer=n}
if(!W.s_stopTimer)W.s_stopTimer=function(){var n=new Date().getTime(),W=window,O='object',A=W.$AAD&&typeof W.$AAD==O?W.$AAD:{};var o=$AAD.$msTimer;A.$msTimer='';return o&&typeof o=='number'?n-o:0}
if(!W.s_getP)W.s_getP=function(p,t){var v,u,S='string',N='number',B='boolean';if(arguments.length>0){try{v=eval('window.'+p);if(arguments.length>1&&typeof t==S){try{switch(t){case S:v=v.String();if(typeof v!=t)v='';break;case N:v=typeof v==S||typeof v==B||typeof v==N?v.Number():Number('');break;case B:v=v.Boolean();break;default:v=u;break}}catch(e){v=u}}}catch(e){v=u}}return v}
if(!W.s_setP)W.s_setP=function(p,v){try{var o=window,r=new RegExp("\\[[\'\"]?([^\\]\'\"]+)[\'\"]?\\]"),i,a=arguments,l,e={name:'UserException'},I=function(v){return/^[0-9]+$/.test(v)?Number(v):v};s_log(4,'s_setP( "'+p+'" ,',v,')');if(a.length==2&&p&&typeof p=='string'){p=p.replace(/\[\]/g,'[@]');for(i=0;i<99&&p.match(r);i++)p=p.replace(r,'.$1');p=p.split('.');for(i=0,c=o;i<p.length-1;i++){a=I(p[i]);if(a=='@')a=o.length||0;if(typeof o[a]!='object'){n=I(p[i+1]);o[a]=n=='@'||!isNaN(n)?[]:{}}o=o[a]}a=I(p[i]);if(a=='@')a=o.length;o[a]=v}}catch(e){s_logE(e,'function s_setP('+(typeof p=='string'?'"'+p+'",':'?,')+(typeof v!='object'&&typeof v!='function'?v:'[object]')+')')}return v};


// AUTHOR: Copyright 2004-2016 Rawsoft, Inc. All Rights Reserved
// DESCRIPTION: Helper functions for data layer
// UPDATED: 08/12/2017
/************************** RAWSOFT CUSTOM FUNCTIONS *************************/

var _globalMessagePrefix = 'BN: ';
var _globalObjectName = 'BNAnalytics';
var W = eval('window');
W[_globalObjectName] = (W[_globalObjectName] || {});
W[_globalObjectName].Logs = (W[_globalObjectName].Logs || []);
W[_globalObjectName].IsMobile = (W.location.pathname.toLowerCase().indexOf('/mobile') === 0 || W.location.host === 'm.barnesandnoble.com' || (s_getP('digitalData.page.pageInfo.isMobile') || false) || (s_getP('digitalData.page.pageInfo.isPhone') || false));

// DEFER
// Should we delay scripts and other injections to keep page fast
// Only do this if yottaa isn't running as it does the same thing, no need to repeat efforts
W[_globalObjectName].DeferInjections = (_satellite.readCookie('yottaaTest') && _satellite.readCookie('yottaaTest') !== 'yottaa');

// Whether or not debug messages should be logged
W[_globalObjectName].EnableDebugLogging = true;

/************************** BARNES AND NOBLE GLOBAL FUNCTIONS *************************/
// Global functions, some of these could be data elements, those without parameters
// UPDATE HERE BELOW

W[_globalObjectName].isMember = function () {
	var results = false,
		cc = _satellite.getVar('customerCohort');
	if (cc && cc.toLowerCase() != 'non-members') {
		results = true;
	}
	return results;
};

W[_globalObjectName].isProductPage = function () {
	var success = false;
	try {
		var pt = _satellite.getVar('pageType');
		var sku = _satellite.getVar('sku');
		success = (pt === 'pdp' || pt === 'product') && (typeof (sku) !== 'undefined') && sku.length > 0;
	} catch (e) {}
	return success;
};

W[_globalObjectName].getProductsForAdobe = function (price) {
	// This only works for the PD Page, so only use it then
	var prods = '';
	try {
		// use classifications
		var req_eVar15 = (_satellite.getVar('req_eVar15') || '');
		var req_eVar62 = (_satellite.getVar('productAvailability') || '');
		var req_eVar61 = (_satellite.getVar('productRatingReviews') || '');
		var req_eVar39 = (_satellite.getVar('bookGraphProductSku') + '~' + _satellite.getVar('sku'));
		var req_eVar31 = (_satellite.getVar('pickUpInStoreStatus') || '');

		prods += ";" + _satellite.getVar('sku') + ";;" + (price || _satellite.getVar('productPrice')) + ";;evar61=" + req_eVar61 + "|evar62=" + req_eVar62 + "|evar15=" + req_eVar15 + "|evar39=" + req_eVar39 + "|evar31=" + req_eVar31;
	} catch (e) {}
	return prods;
};

W[_globalObjectName].getCartProductsForAdobeFromDL = function () {
	var cart = window.s_getP('digitalData.cart'),
		prods = '';
	if (cart && cart.item) {
		var i, p;
		for (i = 0; i < cart.item.length; i++) { //for each item in cart
			// + ';;' + (cart.item[i].price.basePrice || 'zero');
			//p = ";" + cart.item[i].productInfo.sku;
			p = W[_globalObjectName].getCurrentProductsForAdobeFromDL(cart.item[i]);
			if (p) {
				prods = (prods ? (prods + ',') : '') + p;
			}
		}
	}
	return prods;
};

W[_globalObjectName].getCurrentProductsForAdobeFromDL = function (prod) {
	// NOTE: Incomplete for Jira(3611,3612,3613) - price missing
	// BUG: The format of digitalData.product & digibalData.event.product is not the same
	// "Category;Product;Quantity;Price;eventN=X[|eventN2=X2];eVarN=merch_category[|eVarN2=merch_category2]"
	prod = (prod || window.s_getP('digitalData.product[0]'));
	var products = '';
	try {
		var rating = W.r_getByPath(prod, 'attributes.rating', 'zero');
		var reviews = W.r_getByPath(prod, 'attributes.reviews', 'zero');
		var rating_reviews = (rating + ':' + reviews);
		var qty = W.r_getByPath(prod, 'productInfo.quantity', '1');

		var pickUpInStoreStatus = W.r_getByPath(prod, 'attributes.pickupInStoreStatus', '');
		var productAvailability = W[_globalObjectName].getProductAvailability(prod);
		var isInStorePickup = W.r_getByPath(prod, 'attributes.isInStorePickup', false);

		// format the data
		var price = W.r_getByPath(prod, 'price.basePrice', 0);

		// product syntax Event
		var eventN = (isInStorePickup ? 'event159=1' : 'event160=1');
		var eVarN = "evar61=" + rating_reviews + "|evar62=" + productAvailability + "|evar31=" + pickUpInStoreStatus;

		// build the string
		products = (typeof (prod.category) != 'undefined' ? prod.category.productType : '');
		products += ";" + prod.productInfo.sku + ";" + qty + ";" + (price || 'zero') + ";" + eventN + ";" + eVarN;

		// NOTE: WE need to update this to throw onError instead since we are not using FoxMetrics anymore
		// DEBUG: Looks like we are having scenarios where sku is missing for product views
		// add to cart, cart view and etc...
		if (typeof (_fxm) !== 'undefined' && W.r_getByPath(prod, 'productInfo.sku', '') === '') {
			throw 'Missing SKU in data layer.';
		}
	} catch (e) {
		// NOTE: WE need to update this to throw onError instead since we are not using FoxMetrics anymore
		if (typeof (_fxm) !== 'undefined') {
			_fxm.events.push(['_fxm.pages.error', e.message, e.code]);
		}
	}

	return products;
};




W[_globalObjectName].getCartOpen = function (s, cookieName) {
	// Will append scOpen if needed
	// The adobe plugin does not work and secondly there are other unique scenarios for BN
	// We will however use the same cookie name to keep things consistent
	var sEvents = (s.events ? s.events : ''),
		t = new Date();

	// every 30 minutes - session time
	t.setTime(t.getTime() + 1800000);

	// do we have scAdd
	if (sEvents.indexOf('scAdd') > -1 && sEvents.indexOf('scOpen') < 0 && !s.c_r(cookieName)) {
		sEvents += ',scOpen';
		if (!s.c_w(cookieName, 1, t)) {
			s.c_w(cookieName, 1, 0);
		}
	}

	// do we have scView
	if (sEvents.indexOf('scView') > -1 && sEvents.indexOf('scOpen') < 0 && !s.c_r(cookieName)) {
		var cartItems = window.s_getP('digitalData.cart.item');
		if (cartItems && cartItems.length > 0) {
			sEvents += ',scOpen';
			if (!s.c_w(cookieName, 1, t)) {
				s.c_w(cookieName, 1, 0);
			}
		}
	}

	// If the user makes a purchase then reset scOpen
	if (sEvents.indexOf('purchase') > -1) {
		t = new Date();
		t.setTime(t.getTime() + 10000);
		if (s.c_r(cookieName) || sEvents.indexOf('scOpen') > -1) {
			if (!s.c_w(cookieName, '', t)) {
				s.c_w(cookieName, '', 0);
			}
		}
	}

	return sEvents;
};

W[_globalObjectName].getReportingSuiteIDs = function () {
	/// <summary>
	/// Configuring the appropriate reporting suites based on current domain
	/// DTM automatically looks for "s_account" if its found and not empty but not used.
	/// </summary>
	/// <returns type="">comma delimited suite id's</returns>

	var isMobile = W[_globalObjectName].IsMobile;
	var env = (isMobile === true ? 'mobile' : 'full');
	var sa = 'banfulldev,banglobaldev';

	switch (W.location.hostname.toLowerCase()) {
	case 'www.barnesandnoble.com':
	case 'barnesandnoble.com':
	case 'nook.barnesandnoble.com':
	case 'stores.barnesandnoble.com':
	case 'www.nookarticles.com':
	case 'm.barnesandnoble.com':
	case 'apps.barnesandnoble.com':
	case 'giftguide.barnesandnoble.com':
	case 'read.barnesandnoble.com':
  case 'specialists.barnesandnoble.com':
		sa = 'ban' + env + 'prod,banglobalprod';
		break;
	case 'www-dev.barnesandnoble.com':
		sa = 'ban' + env + 'dev,banglobaldev';
		break;
	case 'www-test.barnesandnoble.com':
	case 'qa-apps.barnesandnoble.com':
    case 'www-r17.barnesandnoble.com':
		sa = 'ban' + env + 'qa,banglobalqa';
		break;
	case 'faf.barnesandnoble.com':
		sa = 'ban' + env + 'stage,banglobalstage';
		break;
	case 'mpreprod.barnesandnoble.com':
	case 'http://mbarnesandnoble.skavaone.com/':
		sa = 'banmobiledev,banglobaldev';
		break;
	default:
		sa = 'banfulldev,banglobaldev';
		break;
	}

	return sa;
};

W[_globalObjectName].IsDevelopment = function () {
	// Are we in production?
	var isDev = true;
	switch (W.location.hostname.toLowerCase()) {
	case 'www.barnesandnoble.com':
	case 'barnesandnoble.com':
	case 'nook.barnesandnoble.com':
	case 'stores.barnesandnoble.com':
	case 'apps.barnesandnoble.com':
	case 'm.barnesandnoble.com':
	case 'help.barnesandnoble.com':
	case 'affiliates.barnesandnoble.com':
	case 'careers.barnesandnoble.com':
		isDev = false;
		break;
	default:
		break;
	}
	return isDev;
};

W[_globalObjectName].getProductAvailability = function (product) {
	var results;
	if (product && product.attributes) {
		// NOTE: There are only two options now, this will need updates once more is added such as pre-order
		// or maybe we have a new digitalData.product.attributes.availability Jira Ticket
		if (product.attributes.notifyWhenStocked) {
			results = 'notify when in stock';
		}
		if (product.attributes.outOfStock) {
			results = 'out of stock';
		}
	}
	return (results || 'in stock');
};

W[_globalObjectName].getProductRatingsAndReviews = function (product) {
	var results = 'zero:zero';
	if (product && product.attributes) {
		var rating = (product.attributes.rating || 'zero');
		var reviews = (product.attributes.reviews || 'zero');
		results = (rating + ':' + reviews);
	}
	return results;
};

/************************** BARNES AND NOBLE GLOBAL FUNCTIONS *************************/
// TODO: Need to convert these to use W[_globalObjectName]

if (!W.r_getShoppingCartSkus) {
	W.r_getShoppingCartSkus = function () {
		var skus = [];
		if (digitalData.cart && digitalData.cart.item) {
			for (var i = 0; i < digitalData.cart.item.length; i++) {
				skus.push(digitalData.cart.item[i].productInfo.sku);
			}
		}
		return skus;
	};
}

if (!W.r_getTransactionSkus) {
	W.r_getTransactionSkus = function () {
		var skus = [];
		var items = window.r_getByPath(window, 'digitalData.transaction.item');
		if (items) {
			for (var i = 0; i < digitalData.transaction.item.length; i++) {
				skus.push(digitalData.transaction.item[i].productInfo.sku);
			}
		}
		return skus;
	};
}

if (!W.r_getTransactionTotalQuantity) {
	W.r_getTransactionTotalQuantity = function () {
		var totalQty = 0;
		var items = window.r_getByPath(window, 'digitalData.transaction.item');
		if (items) {
			for (var i = 0; i < digitalData.transaction.item.length; i++) {
				totalQty += digitalData.transaction.item[i].quantity;
			}
		}
		return totalQty;
	};
}

if (!W.r_getProductsForAdobeFromDLEvent) {
	W.r_getProductsForAdobeFromDLEvent = function (eventAction) {
		// pulls the last event that matches the specified eventAction
		// and then parse it for product data into Adobe product data format.
		var evt = window.r_findDigitalDataEvent(eventAction);
		var products = '';
		if (evt) {
			products = W[_globalObjectName].getCurrentProductsForAdobeFromDL(evt.attributes.product[0]);
		}
		return products;
	};
}

/************************** RAWSOFT CUSTOM UTILITY FUNCTIONS *************************/
// DO NOT UPDATE HERE BELOW
/*************************************************************************************/

// FASTMD5 (r_md5(data,ascii,arrayOutput)) - in a closure
// ascii - set true if data consists only of ASCII chars to improve performance
// arrayOutput - if true, then the result is an array of chars (not a string)
(function (g) {
	var $0 = [], // result
		$1 = [], // tail
		$2 = [], // blocks
		$3 = [], // s1
		$4 = ("0123456789abcdef").split(""), // hex
		$5 = [], // s2
		$6 = [], // state
		$7 = false, // is state created
		$8 = 0, // len_cache
		$9 = 0, // len
		BUF = [];

	// use Int32Array if defined
	if (g.Int32Array) {
		$1 = new Int32Array(16);
		$2 = new Int32Array(16);
		$3 = new Int32Array(4);
		$5 = new Int32Array(4);
		$6 = new Int32Array(4);
		BUF = new Int32Array(4);
	} else {
		var i;
		for (i = 0; i < 16; i++) {
			$1[i] = $2[i] = 0;
		}
		for (i = 0; i < 4; i++) {
			$3[i] = $5[i] = $6[i] = BUF[i] = 0;
		}
	}

	// fill s1
	$3[0] = 128;
	$3[1] = 32768;
	$3[2] = 8388608;
	$3[3] = -2147483648;

	// fill s2
	$5[0] = 0;
	$5[1] = 8;
	$5[2] = 16;
	$5[3] = 24;

	function encode(s) {
		var utf = "",
			enc = "",
			start = 0,
			end = 0;

		for (var i = 0, j = s.length; i < j; i++) {
			var c = s.charCodeAt(i);

			if (c < 128) {
				end++;
				continue;
			} else if (c < 2048) {
				enc = String.fromCharCode((c >> 6) | 192, (c & 63) | 128);
			} else {
				enc = String.fromCharCode((c >> 12) | 224, ((c >> 6) & 63) | 128, (c & 63) | 128);
			}

			if (end > start) {
				utf += s.slice(start, end);
			}

			utf += enc;
			start = end = i + 1;
		}

		if (end > start) {
			utf += s.slice(start, j);
		}

		return utf;
	}

	function md5_update(s) {
		var i, I;

		s += "";
		$7 = false;
		$8 = $9 = s.length;

		if ($9 > 63) {
			getBlocks(s.substring(0, 64));
			md5cycle($2);
			$7 = true;

			for (i = 128; i <= $9; i += 64) {
				getBlocks(s.substring(i - 64, i));
				md5cycleAdd($2);
			}

			s = s.substring(i - 64);
			$9 = s.length;
		}

		$1[0] = $1[1] = $1[2] = $1[3] =
			$1[4] = $1[5] = $1[6] = $1[7] =
			$1[8] = $1[9] = $1[10] = $1[11] =
			$1[12] = $1[13] = $1[14] = $1[15] = 0;

		for (i = 0; i < $9; i++) {
			I = i & 3;
			if (I === 0) {
				$1[i >> 2] = s.charCodeAt(i);
			} else {
				$1[i >> 2] |= s.charCodeAt(i) << $5[I];
			}
		}
		$1[i >> 2] |= $3[i & 3];

		if (i > 55) {
			if ($7) {
				md5cycleAdd($1);
			} else {
				md5cycle($1);
				$7 = true;
			}

			return md5cycleAdd([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, $8 << 3, 0]);
		}

		$1[14] = $8 << 3;

		if ($7) {
			md5cycleAdd($1);
		} else {
			md5cycle($1);
		}
	}

	function getBlocks(s) {
		for (var i = 16; i--;) {
			var I = i << 2;
			$2[i] = s.charCodeAt(I) + (s.charCodeAt(I + 1) << 8) + (s.charCodeAt(I + 2) << 16) + (s.charCodeAt(I + 3) << 24);
		}
	}

	function md5(data, ascii, arrayOutput) {
		md5_update(ascii ? data : encode(data));

		var tmp = $6[0];
		$0[1] = $4[tmp & 15];
		$0[0] = $4[(tmp >>= 4) & 15];
		$0[3] = $4[(tmp >>= 4) & 15];
		$0[2] = $4[(tmp >>= 4) & 15];
		$0[5] = $4[(tmp >>= 4) & 15];
		$0[4] = $4[(tmp >>= 4) & 15];
		$0[7] = $4[(tmp >>= 4) & 15];
		$0[6] = $4[(tmp >>= 4) & 15];

		tmp = $6[1];
		$0[9] = $4[tmp & 15];
		$0[8] = $4[(tmp >>= 4) & 15];
		$0[11] = $4[(tmp >>= 4) & 15];
		$0[10] = $4[(tmp >>= 4) & 15];
		$0[13] = $4[(tmp >>= 4) & 15];
		$0[12] = $4[(tmp >>= 4) & 15];
		$0[15] = $4[(tmp >>= 4) & 15];
		$0[14] = $4[(tmp >>= 4) & 15];

		tmp = $6[2];
		$0[17] = $4[tmp & 15];
		$0[16] = $4[(tmp >>= 4) & 15];
		$0[19] = $4[(tmp >>= 4) & 15];
		$0[18] = $4[(tmp >>= 4) & 15];
		$0[21] = $4[(tmp >>= 4) & 15];
		$0[20] = $4[(tmp >>= 4) & 15];
		$0[23] = $4[(tmp >>= 4) & 15];
		$0[22] = $4[(tmp >>= 4) & 15];

		tmp = $6[3];
		$0[25] = $4[tmp & 15];
		$0[24] = $4[(tmp >>= 4) & 15];
		$0[27] = $4[(tmp >>= 4) & 15];
		$0[26] = $4[(tmp >>= 4) & 15];
		$0[29] = $4[(tmp >>= 4) & 15];
		$0[28] = $4[(tmp >>= 4) & 15];
		$0[31] = $4[(tmp >>= 4) & 15];
		$0[30] = $4[(tmp >>= 4) & 15];

		return arrayOutput ? $0 : $0.join("");
	}

	function R(q, a, b, x, s1, s2, t) {
		a += q + x + t;
		return ((a << s1 | a >>> s2) + b) << 0;
	}

	function md5cycle(k) {
		md5_rounds(0, 0, 0, 0, k);

		$6[0] = (BUF[0] + 1732584193) << 0;
		$6[1] = (BUF[1] - 271733879) << 0;
		$6[2] = (BUF[2] - 1732584194) << 0;
		$6[3] = (BUF[3] + 271733878) << 0;
	}

	function md5cycleAdd(k) {
		md5_rounds($6[0], $6[1], $6[2], $6[3], k);

		$6[0] = (BUF[0] + $6[0]) << 0;
		$6[1] = (BUF[1] + $6[1]) << 0;
		$6[2] = (BUF[2] + $6[2]) << 0;
		$6[3] = (BUF[3] + $6[3]) << 0;
	}

	function md5_rounds(a, b, c, d, k) {
		var bc, da;

		if ($7) {
			a = R(((c ^ d) & b) ^ d, a, b, k[0], 7, 25, -680876936);
			d = R(((b ^ c) & a) ^ c, d, a, k[1], 12, 20, -389564586);
			c = R(((a ^ b) & d) ^ b, c, d, k[2], 17, 15, 606105819);
			b = R(((d ^ a) & c) ^ a, b, c, k[3], 22, 10, -1044525330);
		} else {
			a = k[0] - 680876937;
			a = ((a << 7 | a >>> 25) - 271733879) << 0;
			d = k[1] - 117830708 + ((2004318071 & a) ^ -1732584194);
			d = ((d << 12 | d >>> 20) + a) << 0;
			c = k[2] - 1126478375 + (((a ^ -271733879) & d) ^ -271733879);
			c = ((c << 17 | c >>> 15) + d) << 0;
			b = k[3] - 1316259209 + (((d ^ a) & c) ^ a);
			b = ((b << 22 | b >>> 10) + c) << 0;
		}

		a = R(((c ^ d) & b) ^ d, a, b, k[4], 7, 25, -176418897);
		d = R(((b ^ c) & a) ^ c, d, a, k[5], 12, 20, 1200080426);
		c = R(((a ^ b) & d) ^ b, c, d, k[6], 17, 15, -1473231341);
		b = R(((d ^ a) & c) ^ a, b, c, k[7], 22, 10, -45705983);
		a = R(((c ^ d) & b) ^ d, a, b, k[8], 7, 25, 1770035416);
		d = R(((b ^ c) & a) ^ c, d, a, k[9], 12, 20, -1958414417);
		c = R(((a ^ b) & d) ^ b, c, d, k[10], 17, 15, -42063);
		b = R(((d ^ a) & c) ^ a, b, c, k[11], 22, 10, -1990404162);
		a = R(((c ^ d) & b) ^ d, a, b, k[12], 7, 25, 1804603682);
		d = R(((b ^ c) & a) ^ c, d, a, k[13], 12, 20, -40341101);
		c = R(((a ^ b) & d) ^ b, c, d, k[14], 17, 15, -1502002290);
		b = R(((d ^ a) & c) ^ a, b, c, k[15], 22, 10, 1236535329);

		a = R(((b ^ c) & d) ^ c, a, b, k[1], 5, 27, -165796510);
		d = R(((a ^ b) & c) ^ b, d, a, k[6], 9, 23, -1069501632);
		c = R(((d ^ a) & b) ^ a, c, d, k[11], 14, 18, 643717713);
		b = R(((c ^ d) & a) ^ d, b, c, k[0], 20, 12, -373897302);
		a = R(((b ^ c) & d) ^ c, a, b, k[5], 5, 27, -701558691);
		d = R(((a ^ b) & c) ^ b, d, a, k[10], 9, 23, 38016083);
		c = R(((d ^ a) & b) ^ a, c, d, k[15], 14, 18, -660478335);
		b = R(((c ^ d) & a) ^ d, b, c, k[4], 20, 12, -405537848);
		a = R(((b ^ c) & d) ^ c, a, b, k[9], 5, 27, 568446438);
		d = R(((a ^ b) & c) ^ b, d, a, k[14], 9, 23, -1019803690);
		c = R(((d ^ a) & b) ^ a, c, d, k[3], 14, 18, -187363961);
		b = R(((c ^ d) & a) ^ d, b, c, k[8], 20, 12, 1163531501);
		a = R(((b ^ c) & d) ^ c, a, b, k[13], 5, 27, -1444681467);
		d = R(((a ^ b) & c) ^ b, d, a, k[2], 9, 23, -51403784);
		c = R(((d ^ a) & b) ^ a, c, d, k[7], 14, 18, 1735328473);
		b = R(((c ^ d) & a) ^ d, b, c, k[12], 20, 12, -1926607734);

		bc = b ^ c;
		a = R(bc ^ d, a, b, k[5], 4, 28, -378558);
		d = R(bc ^ a, d, a, k[8], 11, 21, -2022574463);
		da = d ^ a;
		c = R(da ^ b, c, d, k[11], 16, 16, 1839030562);
		b = R(da ^ c, b, c, k[14], 23, 9, -35309556);
		bc = b ^ c;
		a = R(bc ^ d, a, b, k[1], 4, 28, -1530992060);
		d = R(bc ^ a, d, a, k[4], 11, 21, 1272893353);
		da = d ^ a;
		c = R(da ^ b, c, d, k[7], 16, 16, -155497632);
		b = R(da ^ c, b, c, k[10], 23, 9, -1094730640);
		bc = b ^ c;
		a = R(bc ^ d, a, b, k[13], 4, 28, 681279174);
		d = R(bc ^ a, d, a, k[0], 11, 21, -358537222);
		da = d ^ a;
		c = R(da ^ b, c, d, k[3], 16, 16, -722521979);
		b = R(da ^ c, b, c, k[6], 23, 9, 76029189);
		bc = b ^ c;
		a = R(bc ^ d, a, b, k[9], 4, 28, -640364487);
		d = R(bc ^ a, d, a, k[12], 11, 21, -421815835);
		da = d ^ a;
		c = R(da ^ b, c, d, k[15], 16, 16, 530742520);
		b = R(da ^ c, b, c, k[2], 23, 9, -995338651);

		a = R(c ^ (b | ~d), a, b, k[0], 6, 26, -198630844);
		d = R(b ^ (a | ~c), d, a, k[7], 10, 22, 1126891415);
		c = R(a ^ (d | ~b), c, d, k[14], 15, 17, -1416354905);
		b = R(d ^ (c | ~a), b, c, k[5], 21, 11, -57434055);
		a = R(c ^ (b | ~d), a, b, k[12], 6, 26, 1700485571);
		d = R(b ^ (a | ~c), d, a, k[3], 10, 22, -1894986606);
		c = R(a ^ (d | ~b), c, d, k[10], 15, 17, -1051523);
		b = R(d ^ (c | ~a), b, c, k[1], 21, 11, -2054922799);
		a = R(c ^ (b | ~d), a, b, k[8], 6, 26, 1873313359);
		d = R(b ^ (a | ~c), d, a, k[15], 10, 22, -30611744);
		c = R(a ^ (d | ~b), c, d, k[6], 15, 17, -1560198380);
		b = R(d ^ (c | ~a), b, c, k[13], 21, 11, 1309151649);
		a = R(c ^ (b | ~d), a, b, k[4], 6, 26, -145523070);
		d = R(b ^ (a | ~c), d, a, k[11], 10, 22, -1120210379);
		c = R(a ^ (d | ~b), c, d, k[2], 15, 17, 718787259);
		b = R(d ^ (c | ~a), b, c, k[9], 21, 11, -343485551);

		BUF[0] = a;
		BUF[1] = b;
		BUF[2] = c;
		BUF[3] = d;
	}

	g.r_md5 = (g.r_md5 || md5);

}(window));


if (!W.r_utf8_encode) {
	W.r_utf8_encode = function (data) {
		return window.unescape(window.encodeURIComponent(data));
	};
}

if (!W.r_utf8_decode) {
	W.r_utf8_decode = function (data) {
		return window.decodeURIComponent(window.escape(data));
	};
}

if (!W.r_removeQueryParam) {
	W.r_removeQueryParam = function (key, sourceURL) {
		var rtn = sourceURL.split("?")[0],
			param, params_arr = [],
			queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
		if (queryString !== "") {
			params_arr = queryString.split("&");
			for (var i = params_arr.length - 1; i >= 0; i -= 1) {
				param = params_arr[i].split("=")[0];
				if (param === key) {
					params_arr.splice(i, 1);
				}
			}
			rtn = (params_arr.length > 0 ? (rtn + "?" + params_arr.join("&")) : rtn);
		}
		return rtn;
	};
}

if (!W.r_round) {
	W.r_round = function (value, decimals, enforce) {
		var num = Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
		if (!enforce) {
			return num;
		}

		var exponent = Math.pow(10, decimals);
		num = Math.round((num * exponent)).toString();
		return Number(num.slice(0, -1 * decimals) + '.' + num.slice(-1 * decimals));
	};
}

if (!W.r_extractDomain) {
	W.r_extractDomain = function (url) {
		var domain = (url.indexOf("//") > -1) ? url.split('/')[2] : url.split('/')[0];
		domain = domain.split(':')[0];
		return domain || url;
	};
}

if (!W.r_injectImage) {
	W.r_injectImage = function (url, callback, cacheBuster, delay) {
		delay = ((typeof (delay) === 'undefined' || W[_globalObjectName].DeferInjections !== true) ? 0 : delay);
		window.setTimeout(function () {
			if (cacheBuster && cacheBuster === true) {
				url += '&_=' + new Date().getTime();
			}
			var img = new window.Image();
			if (typeof (callback) !== 'undefined') {
				img.onload = callback;
			}
			img.style.display = 'none';
			img.style.width = "1px";
			img.style.height = "1px";
			img.src = url;

			// log message to console for debug purposes
			if (delay > 0 && url) {
				window.r_dtm_notify('DEFER: ' + url + ' for ' + delay + 'ms.');
			}
		}, delay);
	};
}

if (!W.r_injectScript) {
	W.r_injectScript = function (url, callback, cacheBuster, delay, title) {
		delay = ((typeof (delay) === 'undefined' || W[_globalObjectName].DeferInjections !== true) ? 0 : delay);
		window.setTimeout(function () {

			// if we have a url, load it first async before doing anything else
			if (typeof (url) === 'string') {
				if (W.jQuery) {
					$.ajaxSetup({
						cache: !(cacheBuster && cacheBuster === true)
					});
					$.getScript(url, callback);
				} else {
					// append cache buster if needed
					if (cacheBuster && cacheBuster === true) {
						url += (url.indexOf('?') > 0 ? '&_=' : '?_=') + new Date().getTime();
					}
					// inject script
					var s = document.createElement('script');
					s.type = 'text/javascript';
					$(document).find('body').append(s);
					if (typeof (callback) !== 'undefined') {
						s.onload = callback;
					}
					s.async = true;
					s.src = url;
				}
			} else {
				// if there is no url but we do have a callback then execute it
				if (typeof (callback) === 'function') {
					callback();
				}
			}

			// log message to console for debug purposes
			if (delay > 0) {
				if (url) {
					window.r_dtm_notify('DEFER: ' + url + ' for ' + delay + 'ms.');
				} else {
					window.r_dtm_notify('DEFER: ' + (title || 'Script') + ' for ' + delay + 'ms.');
				}
			}
		}, delay);
	};
}

if (!W.r_injectIFrame) {
	W.r_injectIFrame = function (url, callback, cacheBuster, delay) {
		// although Iframes load async, they do block onload, so lets try and optimize
		delay = ((typeof (delay) === 'undefined' || W[_globalObjectName].DeferInjections !== true) ? 0 : delay);
		window.setTimeout(function () {
			if (window.jQuery) {
				$('<iframe />', {
					src: url,
					width: 1,
					height: 1,
					frameborder: 0,
					style: 'display:none'
				}).appendTo('body');
			} else {
				var iframe = document.createElement('iframe');
				//  width="1" height="1" frameborder="0" style="display:none"
				$(document).find('body').append(iframe);
				if (typeof (callback) !== 'undefined') {
					s.onload = callback;
				}
				if (navigator.userAgent.indexOf("MSIE") === -1) {
					iframe.src = url;
				} else {
					iframe.location = url;
				}

			}
			// log message to console for debug purposes
			if (delay > 0 && url) {
				window.r_dtm_notify('DEFER: ' + url + ' for ' + delay + 'ms.');
			}
		}, delay);
	};
}

if (!W.r_dtm_warn) {
	W.r_dtm_warn = function (text) {
		if (typeof (console) !== 'undefined') {
			console.warn(_globalMessagePrefix + text);
		} else {
			_satellite.notify(text, 2);
		}
		W[_globalObjectName].Logs.push({
			message: text,
			type: 'warn'
		});
	};
}

if (!W.r_dtm_error) {
	W.r_dtm_error = function (text) {
		if (typeof (console) !== 'undefined') {
			console.error(_globalMessagePrefix + text);
		} else {
			_satellite.notify(text, 3);
		}
		W[_globalObjectName].Logs.push({
			message: text,
			type: 'error'
		});
	};
}

if (!W.r_dtm_notify) {
	W.r_dtm_notify = function (text) {
		if (typeof (console) !== 'undefined') {
			console.log(_globalMessagePrefix + text);
		} else {
			_satellite.notify(text, 1);
		}
		W[_globalObjectName].Logs.push({
			message: text,
			type: 'info'
		});
	};
}

if (!W.r_poll) {
	W.r_poll = function (fn, callback, errback, timeout, interval) {
		var endTime = Number(new Date()) + (timeout || 2000);
		interval = interval || 100;

		(function p() {
			// If the condition is met, we're done!
			if (fn()) {
				if (typeof (callback) !== 'undefined' && callback) {
					callback();
				}
			}
			// If the condition isn't met but the timeout hasn't elapsed, go again
			else if (Number(new Date()) < endTime) {
				window.setTimeout(p, interval);
			}
			// Didn't match and too much time, reject!
			else {
				if (typeof (errback) !== 'undefined' && errback) {
					errback(new Error('timed out for ' + fn + ': ' + arguments));
				}
			}
		})();
	};
}

if (!W.r_injectIFrameSafeMode) {
	W.r_injectIFrameSafeMode = function (url, callback) {
		W.r_poll(function () {
			if (document.readyState === 'complete') {
				W.r_injectIFrame(url, callback);
				return true;
			}
			return false;
		});
	};
}

if (!W.r_injectIFrameAsync) {
	W.r_injectIFrameAsync = function (url, callback) {
		var d = document;
		var iframe = d.body.appendChild(d.createElement('iframe')),
			doc = iframe.contentWindow.document;

		// style the iframe with some CSS
		iframe.style.cssText = "position:absolute;width:0px;height:0px;left:0px;display:none;";

		// now modify iframe content itself
		doc.open().write('<body onload="var d = document;d.getElementsByTagName(\'head\')[0].appendChild(d.createElement(\'script\')).src=\'' + url + '\'">');

		// prep for call back
		if (typeof (callback) !== 'undefined') {
			doc.onload = callback;
		}

		// load iframe
		doc.close();
	};
}

if (!W.r_isStagingMode) {
	W.r_isStagingMode = function () {
		if (localStorage) {
			return localStorage.getItem('sdsat_stagingLibrary') === 'true';
		}
		return false;
	};
}

if (!W.r_findDigitalDataEvent) {
	W.r_findDigitalDataEvent = function (eventAction, ifNotProcessed, flagAsProcessed) {
		// Pulls the first/oldest event from digitalData that matches the eventAction specified
		// We may need to flag these object as "processed" and exclude then in loop
		ifNotProcessed = (ifNotProcessed || false);
		flagAsProcessed = (flagAsProcessed || false);
		var this_evt = null;
		try {
			var eventList = window.s_getP('digitalData.event');
			if (eventList) {
				for (var i = 0, len = eventList.length; i < len; i++) {
					var evt = eventList[i];
					if (evt.eventInfo.eventAction === eventAction) {
						if (ifNotProcessed === false || (ifNotProcessed === true && (evt.eventInfo.processed || false) === false)) {
							if (flagAsProcessed === true) {
								eventList[i].eventInfo.processed = true;
							}
							this_evt = evt;
							break;
						}
					}
				}
			}
		} catch (e) {
			W.r_dtm_error(e.message);
		}
		return this_evt;
	};
}

if (!W.r_getByPath) {
	W.r_getByPath = function (obj, path, defaultValue) {
		if (typeof (obj) !== 'object') {
			return defaultValue;
		}

		for (var i = 0, path = path.split(/[\[\]\.]/), len = path.length; i < len; i++) {
			if (path[i] && obj) {
				obj = obj[path[i]];
			}
		}

		return (typeof (defaultValue) !== 'undefined' && !obj) ? defaultValue : obj;
	};
}

if (!W.r_validateDirectCallRule) W.r_validateDirectCallRule = function (name, ticket, objectPaths, actionName, actionObjectPaths, printIfFound) {
	if (window.r_isStagingMode() === true) {

		var ticketPrefix = (ticket || 'NoTicketSpecified'),
			i = 0,
			hasError = false,
			verbose = (printIfFound || true);

		window.r_dtm_notify(ticketPrefix + ': ' + name);

		// check that all these object paths exist
		if (objectPaths && typeof (objectPaths) === 'object') {
			for (i = 0; i < objectPaths.length; i++) {
				if (!window.r_getByPath(window, objectPaths[i])) {
					window.r_dtm_error(ticketPrefix + ': Not Defined: ' + objectPaths[i]);
					hasError = true;
				}
			}
		}

		// Check digitalData.events
		if (actionName) {
			var dlEvent = window.r_findDigitalDataEvent(actionName, true);
			if (!dlEvent || dlEvent === null) {
				window.r_dtm_error(ticketPrefix + ': Event Not Found: ' + actionName);
			} else if (window.r_getByPath(dlEvent, 'eventInfo.processed', 'false') === true) {
				window.r_dtm_error(ticketPrefix + ': Event Processed: ' + actionName);
			} else {
				if (actionObjectPaths && typeof (actionObjectPaths) === 'object') {
					for (i = 0; i < actionObjectPaths.length; i++) {
						if (!window.r_getByPath(dlEvent, actionObjectPaths[i])) {
							window.r_dtm_error(ticketPrefix + ': Missing Event Property: ' + actionObjectPaths[i]);
							hasError = true;
						}
					}
				}

				// print
				if (verbose === true) {
					window.r_dtm_notify(JSON.stringify(dlEvent, undefined, 2));
				}
			}
		}
	}
};

if (!W.r_getRandomOrd) {
	W.r_getRandomOrd = function () {
		// Only used for floodlight pixels ord=, tend to be a common number
		// that is needed
		return (String(Math.random())) * 10000000000000;
	};
}

if (!W.r_removeSpecialChars) {
	W.r_removeSpecialChars = function (content, toLower) {
		/// Remove all special chars
		var results = window.decodeURIComponent(content).replace(/[`~!@#%^&*()_|+\=÷¿?;:'",<>\{\}\[\]\\\/]/gi, '');
		if (toLower && toLower === true && results) {
			results = results.toLowerCase();
		}
		return results;
	};
}

if (!W.r_createElement) {
	W.r_createElement = function (type, attributes, innerHTML) {
		// Create an element, very useful if needed before JQuery is loaded
		var el = document.createElement(type);
		if (attributes) {
			for (var k in attributes) {
				if (attributes.hasOwnProperty(k)) {
					el.setAttribute(k, attributes[k]);
				}
			}
		}
		if (innerHTML) {
			el.innerHTML = innerHTML;
		}
		return el;
	};
}

if (!W.r_hashCode) {
	W.r_hashCode = function (data) {
		var hash = 0;
		if (data.length == 0) {
			return hash;
		}
		for (var i = 0; i < data.length; i++) {
			char = data.charCodeAt(i);
			hash = ((hash << 5) - hash) + char;
			hash = hash & hash; // Convert to 32bit integer
		}
		return hash;
	};
}

/************************** RAWSOFT CUSTOM QA FUNCTIONS *************************/

if (_satellite.getQueryParamCaseInsensitive('adobe_debug')) {
	var debugMode = (_satellite.getQueryParamCaseInsensitive('adobe_debug').toLowerCase() === 'true' ? true : false);
	_satellite.setDebug(debugMode);
	window.r_dtm_notify('Debug Mode Enabled = ' + (debugMode ? 'Yes' : 'No'));
}

if (_satellite.getQueryParamCaseInsensitive('adobe_staging') && localStorage) {
	var stagingMode = (_satellite.getQueryParamCaseInsensitive('adobe_staging').toLowerCase() === 'true' ? true : false);
	localStorage.setItem('sdsat_stagingLibrary', stagingMode);
	window.r_dtm_notify('Staging Mode Enabled = ' + (stagingMode ? 'Yes' : 'No'));
}

