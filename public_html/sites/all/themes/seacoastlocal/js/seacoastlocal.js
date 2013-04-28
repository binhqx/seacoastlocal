(function($) {

	$(document).ready(function() {

		var url = window.location.pathname;

		var splits = url.replace('http://', '').split('/');

		if (splits.length > 1) {
			if (splits[1] === '') {
				$('body').addClass('homebg');
			} else {
				$('body').addClass(splits[1] + 'bg');
			}
		} else {
			$('body').addClass('homebg');
		}

		$('.menu-name-menu-master-menu > ul:first').addClass('sf-menu').superfish();

		$('.upcoming-events-block').each(function(index,block) {
			var $block = $(block);

			$block.find('.upcoming-events-view').height(150);
			$block.find('.upcoming-events-view').jScrollPane();
		});

		$('.zone-postscript-wrapper').each(function(index,wrapper) {
			$wrapper = $(wrapper);
			$wrapper.find('.region').height($wrapper.height());
			$wrapper.find('.region').find('.block-inner').height($wrapper.height());
		});

		$('.email-signup-form-block').each(function(index,block) {
			var $block = $(block);
			var submitText = $(block).find('input[type=submit]').val();
			var submit = $(block).find('input[type=submit]');

			submit.hide();
			var textInput = $(block).find('input[type=text]');
			textInput.width('50%');
			textInput.val(submitText);
			textInput.focus(function(event) {
				var textInput = $(event.currentTarget);
				textInput.val('');
			});
			textInput.blur(function(event) {
				var textInput = $(event.currentTarget);
				if (textInput.val() == '') {
					textInput.val(submitText);
				}

			});
		});
		$('.frontpage-block-menu').each(function(index, frontpageBlockMenu) {
			var $frontpageBlockMenu = $(frontpageBlockMenu);
			var $subMenuBorderWidth = 2;
			var bgColor = $frontpageBlockMenu.find('.block-inner').css('background-color');

			//console.log('color', bgColor);

			$frontpageBlockMenu.find('.content').css({
					'cursor': 'pointer'
			});

			var level1ToLevel0 = function(event) {
				var $content = $(event.currentTarget);
				var $blockTitle = $content.siblings('.block-title:first');
				var $frontpageBlockMenu = $blockTitle.parents('.frontpage-block-menu:first');

				if (event.target != event.currentTarget) {
					return true;
				}

				$blockTitle.animate({'top': ($frontpageBlockMenu.height() / 2) - ($blockTitle.height() / 3) });
				$frontpageBlockMenu.one('click', null, level0ToLevel1);
				var menuLevel1 = $frontpageBlockMenu.find('.level-1:first');
				menuLevel1.animate({'left': '100%'});
				return false;
			};

			var level0ToLevel1 = function(event) {
				var $frontpageBlockMenu = $(event.currentTarget);
				var $blockTitle = $frontpageBlockMenu.find('.block-title:first');
				var $content = $frontpageBlockMenu.find('.content:first');
				$blockTitle.animate({'top': '0px'});

				$content.one('click', null, level1ToLevel0);
				var menuLevel1 = $frontpageBlockMenu.find('.level-1:first');
				menuLevel1.animate({'left': '0%'});
				return false;
			};

			var incrementLevel = function(event) {
				$myLevel = $(event.currentTarget).parent();
				var $frontpageBlockMenu = $myLevel.parents('.frontpage-block-menu:first');

				$menu_parent = $myLevel.data('menu_parent');
				$menu_child = $myLevel.data('menu_child');

				$menu_child.css({
					width: $frontpageBlockMenu.width() - ($subMenuBorderWidth * 2),
					'border-color': bgColor});
				$menu_child.children().css({
					'border-color': bgColor
				});

				$menu_parent.animate({'left': '-100%'});
				$menu_child.animate({'left': '0%'});

				var $blockTitle = $frontpageBlockMenu.find('.block-title:first');


				var mylevel = parseInt($parent.attr('data-menu-level'), 10);


				var $content = $frontpageBlockMenu.find('.content:first');

				$content.unbind('click');
				$content.one('click', {
					from: mylevel,
					to: mylevel - 1,
					menu_parent: $menu_parent,
					menu_child: $menu_child
				}, decrementLevel);


				return false;
			};

			var decrementLevel = function(event) {
				//console.log('event.target', [event.target]);
				if (event.target != event.currentTarget) {
					return true;
				}

				$myLevel = $(event.currentTarget).parent();

				$menu_child = event.data['menu_child'];
				$menu_parent = event.data['menu_parent'];

				var from = event.data['from'];
				var to = event.data['to'];

				$menu_child.animate({'left': '100%'});
				$menu_parent.animate({'left': '0%'});
				//console.lfrontpageBlockMenuog('decrementLevel', event.data);

				var $frontpageBlockMenu = $myLevel.parents('.frontpage-block-menu:first');

				var $content = $frontpageBlockMenu.find('.content:first');
				if (to === 0) {
					$content.one('click', null, level1ToLevel0);
				} else {
					$content.one('click', null, decrementLevel);
				}


				return false;
			};

			$frontpageBlockMenu.one('click', null, level0ToLevel1);

			$frontpageBlockMenu.find('.content > .menu').each(function(index, menu) {
				$menu = $(menu);
				$menu.addClass('right');
				$menu.addClass('level-1');
				$menu.attr('data-menu-level', 1);
				$menu.cssWidth = $frontpageBlockMenu.width();
				$menu.css({
					width: $frontpageBlockMenu.width() - ($subMenuBorderWidth * 2),
					'border-color': bgColor});
				$menu.children().css({
					'border-color': bgColor
				});

				$(window).resize($.proxy(function() {
					if (this['$menu'].cssWidth != this['$frontpageBlockMenu'].width() - ($subMenuBorderWidth * 2)) {
						this['$menu'].css({'width': this['$frontpageBlockMenu'].width() - ($subMenuBorderWidth * 2)});
						this['$menu'].cssWidth = this['$frontpageBlockMenu'].width() - ($subMenuBorderWidth * 2);
					}
				},{'$menu': $menu, '$frontpageBlockMenu': $frontpageBlockMenu}));
			});

			$frontpageBlockMenu.find('.expanded').each(function(index, listItem) {
				var $listItem = $(listItem);
				var $subMenu = $listItem.children('.menu:first');

				$parent = $subMenu.parents('.menu:first');
				var mylevel = parseInt($parent.attr('data-menu-level'), 10) + 1;
				$subMenu.attr('data-menu-level', mylevel);
				$subMenu.addClass('level-' + mylevel);


				$subMenu.data('menu_parent', $listItem);
				$listItem.data('menu_child', $subMenu);
				$listItem.data('menu_parent', $listItem.parent());
				//console.log('mylevel', mylevel);
				$listItem.children('a')
					.data('menu_child', $subMenu)
					.attr('href', '#')
					.bind('click', {from: mylevel - 1, to: mylevel},incrementLevel);
				$subMenu.appendTo($frontpageBlockMenu.find('.content:first'));
				$subMenu.addClass('right');

			//Have the subMenu have the same width as the block. If the block resizes, update the subMenu width;
			$subMenu.cssWidth = $frontpageBlockMenu.width() - ($subMenuBorderWidth * 2);
			$subMenu.css({width: $frontpageBlockMenu.width() - ($subMenuBorderWidth * 2) });
			$(window).resize($.proxy(function() {
				if (this['$subMenu'].cssWidth != this['$frontpageBlockMenu'].width() - ($subMenuBorderWidth * 2)) {
					this['$subMenu'].css({'width': this['$frontpageBlockMenu'].width() - ($subMenuBorderWidth * 2)});
					this['$subMenu'].cssWidth = this['$frontpageBlockMenu'].width() - ($subMenuBorderWidth * 2);
				}

			},{'$subMenu': $subMenu, '$frontpageBlockMenu': $frontpageBlockMenu}));

		});/* end each expanded */
});
});/* end ready */
})(jQuery);
