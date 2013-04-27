(function($) {

	$(document).ready(function() {
		$('.frontpage-block-menu').each(function(index, frontpageBlockMenu) {
			var $frontpageBlockMenu = $(frontpageBlockMenu);

			$frontpageBlockMenu.find('.content > .menu').each(function(index, menu) {
				$menu = $(menu);
				$menu.addClass("right");
				$menu.cssWidth = $frontpageBlockMenu.width();
				$menu.css({width:$frontpageBlockMenu.width()});
				$(window).resize($.proxy(function(){
					if(this["$menu"].cssWidth != this["$frontpageBlockMenu"].width()){
						this["$menu"].css({"width":this["$frontpageBlockMenu"].width()});
						this["$menu"].cssWidth = this["$frontpageBlockMenu"].width();
					}
				},{"$menu":$menu,"$frontpageBlockMenu":$frontpageBlockMenu}));
			});

			$frontpageBlockMenu.find('.expanded').each(function(index, listItem) {
			var $listItem = $(listItem);
			var $subMenu = $listItem.children('.menu:first');
			$subMenu.data("menu_parent",$listItem);
			$listItem.data("menu_child",$subMenu);

			$listItem.children('a')
				.data('menu_child',$subMenu)
				.attr('href', '#')
				.click(function(event) {
					return false;
				});
			$subMenu.appendTo($frontpageBlockMenu.find(".content:first"));
			$subMenu.addClass("right");

			//Have the subMenu have the same width as the block. If the block resizes, update the subMenu width;
			$subMenu.cssWidth = $frontpageBlockMenu.width();
			$subMenu.css({width:$frontpageBlockMenu.width()});
			$(window).resize($.proxy(function(){
				if(this["$subMenu"].cssWidth != this["$frontpageBlockMenu"].width()){
					this["$subMenu"].css({"width":this["$frontpageBlockMenu"].width()});
					this["$subMenu"].cssWidth = this["$frontpageBlockMenu"].width();
				}
				
			},{"$subMenu":$subMenu,"$frontpageBlockMenu":$frontpageBlockMenu}));

			});/* end each expanded */
		});
	});/* end ready */
})(jQuery);
