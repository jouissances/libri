var heightCalculation = function(){
		var fullHeight = [];
		var infoHeight = [];
    	var totalHeigth = 0;
    	$('.resultsListContainer #gridView .product-shelf-tile.columns-5').each(function(){
    		var imgHeight = Number($(this).find('.product-image-container').outerHeight());
    		var dataHeight = Number($(this).find('.product-shelf-info').outerHeight());
    		totalHeigth = imgHeight + dataHeight;
    		fullHeight.push(totalHeigth);
    		infoHeight.push(dataHeight);
    	});
    	var maxHeightInDiv = Math.max.apply(Math, fullHeight);
    	var maxHeightInInfo = Math.max.apply(Math, infoHeight);
    	$('.resultsListContainer #gridView .product-shelf-tile.columns-5').height(maxHeightInDiv);
    	$('.resultsListContainer #gridView .product-shelf-tile.columns-5').css('min-height', maxHeightInDiv);
    	$('.resultsListContainer .product-shelf-grid .product-info-view').css('min-height', maxHeightInInfo);
    	$('.search-promo-atg-container').height(maxHeightInDiv);
    	$('.search-promo-atg-container').css('min-height', maxHeightInDiv);
	}

$(document).ready(function() {
	
	heightCalculation();
	
	// if PLP ribbon exists, set focus to last element of ribbon from list/grid view in shift tab starts
	if($('section.plp-ribbon').length>0){
	$('section[id^=listView],section[id^=gridView]').find(':tabbable:first').on('keydown',function(e){
		if(e.shiftKey && e.keyCode==9){
			e.preventDefault();
			$(this).parents('[id^=listView],[id^=gridView]').siblings('.plp-ribbon').find(':tabbable:last').focus();
		}
	});
}
	// if PLP ribbon exists, set focus to last element of ribbon from list/grid view in shift tab ends
	
  $('.btn-quick-view').on('click', function(e) {
    e.preventDefault();
    var currProdID = $(this).attr('id');
  });
  
  $('.series-authors-show-more').on('click', function(e) {
	  if($(this).attr('aria-expanded')=='false'){
	    $('.more-series-authors').removeClass('hidden');
	    $(this).text('Show Less');
	    $(this).attr('aria-expanded','true');
	    $('#pdp-tabs .tab-container').css({'height':'auto'});
	  }else{
		$('.more-series-authors').addClass('hidden');
		$(this).text('Show More');
		$(this).attr('aria-expanded','false'); 
	  }
  });
  
  // read view cookie value if exists
  $(function() {
     
    if ($.cookie('viewCookie') === 'List' || $('[id^=listView]').is(':visible')) {
        $('a#list-view').attr('class','selected');
     }

    if ($.cookie('viewCookie') === 'Grid' || $('#gridView').is(':visible')) {
        $('a#grid-view').attr('class','selected');
    }

    if (sessionStorage.getItem('view')) {
        sessionStorage.removeItem('view');
    }
       
    if (sessionStorage.getItem('focusElement')) {
        $('#' + sessionStorage.getItem('focusElement') + ':first').focus();
        sessionStorage.removeItem('focusElement');
    }
  });
  
  $('#grid-view,#list-view').click(function(e) {
	  e.preventDefault();
	  
	  sessionStorage.setItem('view', $(this).attr('id'));
	  /* Adobe Analytics */
	  if (typeof s_setP !== 'undefined') {
	    var evtIndex = getAnalyticsEventCount();
	    s_setP('digitalData.event[' + evtIndex + '].eventInfo.eventName', 'prodListView');
	  }
	  
	  deleteCustomCookie('viewCookie');
	  
	  var thisId = $(this).attr('id');
	  if (thisId == 'list-view') {
	     $('a#list-view').attr('class','selected');
	     $('a#grid-view').attr('class','');
	     // $.cookie('viewCookie', 'List');
	     setCustomCookie('viewCookie', 'List', '2*24*60');
      }

      if (thisId == 'grid-view') {
	     $('a#grid-view').attr('class','selected');
	     $('a#list-view').attr('class','');
	     //$.cookie('viewCookie', 'Grid');
	     setCustomCookie('viewCookie', 'Grid', '2*24*60');
      }
      
      location.reload();
  });
  
  // add/remove selected class to refinement link
  $('#refinements dl.checkbox-container dd a').on('click', function() {
    var $this = $(this);

    if ($this.hasClass('selected')) {
      return;
    } else {
      $this.addClass('selected');
    }
  });

  // sorting drop down select function to get selectBox to show the current sorting value
  $(function() {
    // append unique ID's to each selectBox on page
    idInt = 0;
    $('ul.selectBox-dropdown-menu').each(function() {
      $(this).attr('id','selectBox-' + idInt);
      idInt++;
      $(this).parent().find('a.selectBox').attr('aria-owns', $(this).attr('id'));
    });
    var getSortValue = '';
    var getRedirect = '';
    var checkSortOptions = $('select[name=sorter]').length;
    if (checkSortOptions > 0) {
      var getSortParam = window.location.toString().match(/\Ns=([^&]+)/ig);
      $('select[name=sorter] option').each(function() {
        if ($(this).val().match(getSortParam)) {
          $(this).attr('selected','selected');
          getSortValue = $(this).html();
        }
      });

      // select the correct list item from the sorting drop downs
      $('ul#selectBox-0 li, ul#selectBox-2 li').each(function() {
        var compareSortOption = $('a',this).html();
        $(this).removeAttr('class');
        if (compareSortOption === getSortValue) {
          $(this).addClass('selectBox-selected');
        }
      });

      if (getSortValue != '') {
        $('select[name=sorter]').next('a.selectBox').find('span.selectBox-label').html(getSortValue);
      }
    }
    return false;
  });

  // show per page drop down
  $(function() {
    var getSortValue = '';
    var getRedirect = '';
    var checkSortOptions = $('select[name=view]').length;
    if (checkSortOptions > 0) {
      var getSortParam = window.location.toString().match(/\Nrpp=([^&]+)/ig);
      $('select[name=view] option').each(function() {
        if ($(this).val().match(getSortParam)) {
          $(this).attr('selected','selected');
          getSortValue = $(this).html();
        }
      });

      // select the correct list item from the sorting drop downs
      $('ul#selectBox-1 li, ul#selectBox-3 li').each(function() {
        var compareSortOption = $('a',this).html();
        $(this).removeAttr('class');
        if (compareSortOption === getSortValue) {
          $(this).addClass('selectBox-selected');
        }
      });

      if (getSortValue != '') {
        $('select[name=view]').next('a.selectBox').find('span.selectBox-label').html(getSortValue);
      } else {
        $('select[name=view]').next('a.selectBox').find('span.selectBox-label').html('20');
      }
    }

    return false;
  });

  // recently viewed, needs jsp hook
  $(function() {
    var checkForRecent = $('#recentlyViewed').length;

    if (checkForRecent > 0) {
      var checkViews = $('ul.recentViews li').length;

      if (checkViews < 1) {
        $('#recentlyViewed').remove();
      }
    }
  });

  $('.resultsListContainer ul.selectBox-dropdown-menu a').click(function() {
    var getRedirect = $(this).attr('rel');

    sessionStorage.setItem('focusElemnet', $(this).parents('.selectBox-container').find('.selectBox-dropdown').attr('id'));

    window.location = getRedirect;
  });
  
  /* SRL-1540/1533 : load the page according to the dropdown value selected on enter key press*/
  $('.resultsListContainer .results-listing-options .selectBox-dropdown').on('keydown', function(e){
	  var keyCode = e.keyCode || e.which; 
	  if (keyCode === 13) {   
		  $(this).siblings('ul.selectBox-dropdown-menu').find('.selectBox-selected a').click();
	  }
	});
  /* SRL-1540/1533 Ends */
  
  $('#wishlistSort ul.selectBox-dropdown-menu a, #wishlistResults ul.selectBox-dropdown-menu a').click(function() {
      var getRedirect = $(this).attr('rel');
      sessionStorage.setItem('focusElemnet', $(this).parents('.selectBox-container').find('.selectBox-dropdown').attr('id'));
      window.location = getRedirect;
  }); 

  $('.sorter-selectBox-dropdown-menu').on('sorterMenuClosing', function() {
      var that = $(this).find('.selectBox-selected:first a'),
            getRedirect = that.attr('rel');

      sessionStorage.setItem('focusElemnet', that.parents('.selectBox-container').find('.selectBox-dropdown').attr('id'));
      window.location = getRedirect;
  });

  $('.view-selectBox-dropdown-menu').on('viewMenuClosing', function() {
      var that = $(this).find('.selectBox-selected:first a'),
            getRedirect = that.attr('rel');

      sessionStorage.setItem('focusElemnet', that.parents('.selectBox-container').find('.selectBox-dropdown').attr('id'));
      window.location = getRedirect;
  });

  //Read more toggle
  $(".read-more a").on("click", function(e) {
      e.preventDefault();

      var $this = $(this),
            $wrapper = $this.parent(),
          $container = $this.parent().parent();

      if($this.attr('aria-expanded') == 'false') {
          $this.attr('aria-expanded', 'true');
          $container.focus();
      } else {
          $this.attr('aria-expanded', 'false');
      }

      $wrapper.toggleClass("extended");
      $container.toggleClass("summarized");
      $this.parent().toggleClass("fade");

      if($this.text().toLowerCase() === "read more" || $this.text().toLowerCase() === "see more") {
          $this.text("Show Less");
          $this.removeClass("down-arrowhead");
          $this.addClass("up-arrowhead");
      } else {
          $this.text("Read More");
          $this.removeClass("up-arrowhead");
          $this.addClass("down-arrowhead");
      }
  });
  
  $('#view-more-discover-btn').on('click', function(e) {
	  var discoverViewState = $(this).attr('aria-expanded');
	  sessionStorage.setItem('discoverViewMore', discoverViewState);
	  if(discoverViewState == 'true')
	  heightCalculation();
  });
  
  if(sessionStorage.getItem('discoverViewMore') == 'true'){
	  $('#view-more-discover-btn').attr('aria-expanded','true');
	  $('#view-more-discover-btn').html('Hide<span class="link-show-more--open"></span>');
	  $('#view-more-discover').attr('aria-expanded','true');
	  $('#view-more-discover').show();
	  heightCalculation();
  }
  
});

/*ATG-19581 : Author series fix*/
function showBreadcrumb(){
	var left_breadcrumb =$('.left-breadcrumb nav').children();
	  $($(left_breadcrumb).children()).each(function(i){
		  $(this).addClass('bg-gray-02 pt-xs pb-xs');
		  $(this).prepend("<span class='icon-close-modal ml-xs mr-xs'></span>");
		  $(this).on('click',function(){
			  window.location.href=$(this).children('a').attr('href');
		  });
	  });
	
	if($('.refinements:first').is(':visible'))
		  $('.refinements:first').prepend(left_breadcrumb);
	  else if(($('#refinements').is(':visible')) || (window.location.href.indexOf("discover-categories") > -1)){
		  $('#refinements').prepend(left_breadcrumb);
		  $('#refinements').addClass('refinements');
	  }
	  
	  if($('.lists--bread-crumbs:first').is(':visible')){
		  if($('main').hasClass('pt-l')){
			  $('main').removeClass('pt-l').addClass('pt-m');
		  }
	  }
}


var oldonload = window.onload;
if (typeof window.onload != 'function') {
    window.onload = showBreadcrumb;
} else {
    window.onload = function() {
        if (oldonload) {
            oldonload();
        }
        showBreadcrumb();
    }
}