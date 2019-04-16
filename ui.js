//ui-search定义
$.fn.UiSearch = function(){
	var ui = $(this);
	$('.ui-search-selected',ui).on('click',function(){
		$('.ui-search-select-list').show();
		return false;
	});
	$('.ui-search-select-list a',ui).on('click',function(){
		$('.ui-search-selected').text( $(this).text() );
		$('.ui-search-select-list').hide();
		return false;
	});
	$('body').on('click',function(){
		$('.ui-search-select-list').hide();
	})
}

/*ui-tab定规
@param {string} header TAB组件的选项卡切换部分className，里面有若干个.item
@param {string} content TAB组件的选项卡切换部分className，里面有若干个.item
@param {string} focus_prefix选项卡高亮样式前缀可选*/

$.fn.UiTab = function(header,content,focus_prefix){
	var ui = $(this);
	var tabs = $(header,ui);
	var cons = $(content,ui);
	var focus_prefix = focus_prefix || '';

	tabs.on('click',function(){
		var index = $(this).index();
		tabs.removeClass(focus_prefix+'item_focus').eq(index).addClass(focus_prefix+'item_focus');
		cons.hide().eq(index).show();
		return false;
	});
}
//ui-backTop
$.fn.UiBackTop = function(){
	var ui = $(this);
	var el = $('<a class="ui-backTop" href="0"></a>');
	ui.append(el);

	var windowHeight = $(window).height();
	$(window).on('scroll',function(){
		var top = $('body').scrollTop();
		if(top > windowHeight){
			el.show();
		}else{
			el.hide();
		}
	});
	el.on('click',function(){
		$(window).scrollTop(0);
	});
}

//ui-slider
//1 左右箭头能控制页面
//2 翻页时，进度点，联动focus
//3 翻到第三页时要返回第一页 
//4 进度点再点击的时候需要切换到相应的页面
//5 无点击翻页时要翻页滚动自动滚动 
//6 滚动时要屏蔽掉其他操作 如自动滚动 左右翻页 进度点点击
//7 高级滚动无缝滚动
$.fn.UiSlider = function(){
	var ui = $(this);
	var wrap = $('.ui-slider-wrap');

	var btn_prev = $('.ui-slider-arrow .left',ui);
	var btn_next = $('.ui-slider-arrow .right',ui);

	var items = $('.ui-slider-wrap .item',ui);
	var tips = $('.ui-slider-process .item',ui);
	//预先定义好的外部变量
	var current =0;
	var size = 3/*items.size 我没处理好，下次再说吧*/;
	var width = items.eq(0).width();
	var enableAuto = true;

	//设置自动滚动感应 如果鼠标在wrap中不要自动滚动
	ui
	.on('mouseover',function(){
		enableAuto = false;
	})
	.on('mouseout',function(){
		enableAuto = true;
	});

	//具体操作
	wrap
	.on('move_prev',function(){
		if(current<=0){
			current = size;
		}
		current = current-1;
		wrap.triggerHandler('move_to',current);
	})
	.on('move_next',function(){
		if(current>=size-1){
			current=-1;
		}
		current = current+1;
		wrap.triggerHandler('move_to',current);
	})
	.on('move_to',function(evt,index){
		wrap.css('left',index*width*(-1));
		tips.removeClass('item_focus').eq(index).addClass('item_focus');
	})
	.on('auto_move',function(){
		setInterval(function(){
			enableAuto && wrap.triggerHandler('move_next');
		},2000);
	})
	.triggerHandler('auto_move');

	//事件
	btn_prev.on('click',function(){
		wrap.triggerHandler('move_prev');
	});
	btn_next.on('click',function(){
		wrap.triggerHandler('move_next');
	});
	tips.on('click',function(){
		var index = $(this).index();
		wrap.triggerHandler('move_to',index);
	});

}

$.fn.UiCascading = function(){
	var ui = $(this);
	var select = $('select',ui);
	select
	.on('change',function(){
		var vall = $(this).val();
		var index = select.index(this);
		//触发下一个selsect的更新 
		var where = $(this).attr('data-where');
		where = where ?where.split(','):[];
		where.push($(this).val());
		select
		.eq(index+1)
		.attr('data-where',where.join(','))
		.triggerHandler('reloadOptions');

		//根据当前的值出发下一个之后的select的初始化  清楚不应该有的数据项
		ui
		.find('select:gt('+(index+1)+')').each(function(){
			$(this)
			.attr('data-where','')
			.triggerHandler('reloadOptions');
		})
	})
	.on('reloadOptions',function(){
		var method = $(this).attr('data-search');
		var args = $(this).attr('data-where').split(',');
		var data = AjaxRemoteGetData[method]($(this).attr(this,args));
		var select = $(this);
		select.find('option').remove();
		$.each(data,function(i,item){
			var el = $('<option value="'+item+'">'+item+'</option>');
			select.append(el);
		});
	});
	selects.eq(0).triggerHandler('reloadOptions');

}
//页面的脚本逻辑
$(function(){
	$('.ui-search').UiSearch();
	$('.content-tab').UiTab('.caption > .item','.block > .item');
	$('.content-tab .block .item').UiTab('.block-caption > a','.block-content > .block-wrap','block-caption-');
	$('body').UiBackTop();
	$('.ui-slider').UiSlider();
	$('ui-cascading').UiCascading();

});

