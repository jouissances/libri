_satellite.pushAsyncScript(function(event, target, $variables){
  /* Bing UET	
* For conversion, Alex and Rooshina owns this
* and because there is an overlap, Microsoft recommended we changed
* uetq to uetq1 so we don't collide with other implementations using uetq
*/
window.r_injectScript(null, function() {
    (function(w, d, t, r, u) {
        var f, n, i;
        w[u] = w[u] || [], f = function() {
            var o = {
                ti: "5067757"
            };
            o.q = w[u], w[u] = new UET(o), w[u].push("pageLoad")
        }, n = d.createElement(t), n.src = r, n.async = 1, n.onload = n.onreadystatechange = function() {
            var s = this.readyState;
            s && s !== "loaded" && s !== "complete" || (f(), n.onload = n.onreadystatechange = null)
        }, i = d.getElementsByTagName(t)[0], i.parentNode.insertBefore(n, i)
    })(window, document, "script", "//bat.bing.com/bat.js", "uetq1");
}, null, 100, 'Pixel: Bing UET - 5067757');
});
