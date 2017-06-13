var scale = 1;
$(function(){
	(function (win){
		var doc = win.document;
		var html = doc.documentElement;
		var option = html.getAttribute('data-use-rem');
		if( option === null ) return;
		// defaut 
		var baseWidth = option == 'default' || option == '' || parseInt(option) <= 0 ? 750 : parseInt(option);
		var grids = baseWidth/100,
		resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize',
		recalc = function() {
			var clientWidth = html.clientWidth || 320; // default to 320 if can't get device-width
			html.style.fontSize = clientWidth / grids + 'px';
			scale = clientWidth / baseWidth;
			setScale('.loading,.bx', scale);
		};
		// Abort if browser does not support addEventListener
		if (!doc.addEventListener) return;
		win.addEventListener(resizeEvt, recalc, false);
		doc.addEventListener('DOMContentLoaded', recalc, false);
		recalc();
	})(window);
	
	var audios = [];
	var source = ['img/an.png', 'img/bg.jpg', 'img/bg2.jpg', 'img/bg22.jpg', 'img/bgjz.jpg', 'img/cb.png', 'img/flot.png', 'img/hb.png', 'img/hf.png', 'img/jz.png','img/lan.png', 'img/load.jpg', 'img/per.png', 'img/q1.png', 'img/q2.png', 'img/q3.png', 'img/q4.png', 'img/q5.png', 'img/q6.png', 'img/q7.png', 'img/q8.png', 'img/q9.png', 'img/q11.png', 'img/rw.png', 'img/s.png', 'img/tc.jpg', 'img/text.png', 'img/x.png', 'img/xb.png', 'img/y.png', 'img/yun.png', 'img/yun1.png', 'img/yun2.png', 'img/z.png', 'img/zkb.png', 'img/zy.png', 'img/22.png','img/hf.png','img/invite.png','img/gx.png','img/pf.png','img/yh.png','img/ys.png','img/tip.png','img/tick.png','img/tick2.png','img/sprite2.png','img/22.png','img/da.png','img/closeag.png','img/1.jpg','img/2.jpg','img/3.jpg','img/last.jpg','img/3.jpg'];
	function imgLoadAll(arr, callback) {
		var arrImg = [];
		for (var i = 0; i < arr.length; i++) {
			var img = new Image();
			img.src = arr[i];
			img.onload = function() {
				arrImg.push(this);
				if (arrImg.length == arr.length) {
					console.log("加载成功");
					setTimeout(callback, 500);
				}
			};
		}
	}
	// 延迟
	window.addEventListener( "load", function() {
		FastClick.attach( document.body );
	}, false );
	function animationEnd(obj, callback) {
		var events = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
		obj.one(events, function(e){
			$(this).unbind(events);
			callback();
		});
	}
	function transitionEnd(obj, callback) {
		var events = 'webkitTransitionEnd mozTransitionEnd MSTransitionEnd oTransitionEnd transtionend';
		obj.one(events, function(e){
			$(this).unbind(events);
			callback();
		});
	}
	imgLoadAll(source, start);
	function start() {
		// 禁止i浏览器拖动反弹（橡皮筋效果）
		function stopScrolling( touchEvent ) {   
			touchEvent.preventDefault();   
		}  
		document.addEventListener( 'touchmove' , stopScrolling , false ); 
		// 百分比增加、
		var timer = null;
		var i = 0;
		timer = setInterval(function() {
			i += 10;
			if (i <= 100) {
				$('.num2').html(i + "%");
			} else {
				// 等待图片加载完毕显示百分比防止没有背景图的情况
				action();
				clearInterval(timer);
			}
		}, 200); 
	}
	function action(){
		$('.new').show()
		// $('.lyun1,.lyun2,.lyun3,.hyun,.letterImg').show();
		$('.lbg').css('background-image', 'url(img/bg.jpg)');
		$('.loading,.num').hide();
		$('.letter').show();
		$('.bjmove').show();
		// 新加点击事件
		$('body').click(function(){
			$(this).unbind();
			$('.new').hide();
			$('.newt').show()
			$('#bgm')[0].play();
		})
		
		$('.newt').click(function(e) {
			$(this).hide()
			$('.lyun,.lyun3,.lyun2,.hyun').show();
			$('.letterImg').hide();
			$(this).unbind(e);
			$('#zz')[0].play();
			$('.lyun,.lyun2').hide();
			$('#letterImg').remove();
			
			$('.bjmove').addClass('animated-bj-move').show();
			var letter = $('.letter').css('display', 'flex').removeClass('control');
			animationEnd(letter, showText2);
			
			function showText2() {
				var text2 = $('#text2').addClass('animated fadeIn').show();
				setTimeout(showText, 3000);
			}
			
			function showText() {
				$('#text2').hide();
				var text = $('#text').addClass('animated fadeIn').show();
				setTimeout(closeLetter, 6000);
			}
			
			function closeLetter() {
				$('#text').hide();
				$('#zz')[0].play();
				var letter2=$('.letter').removeClass('animated-move').addClass('animated-bmove');
				animationEnd(letter2,showagain);
			}
			function showagain(){
				setTimeout(again,2000);
				function again(){
					$('#zz')[0].play();
					var zoom1=$('.letter').css('display', 'flex').removeClass('animated-bmove').addClass('animated-move2');
					animationEnd(zoom1,mapshow);
				}
			}
			function mapshow(){
				setTimeout(addzoom,1000);
			}
			function addzoom(){
				var mapzoom=$('.letter').addClass('zoom');
				setTimeout(end,2000);
				function end(){
					$('.letter').hide();
					showWrap()
				}
			}
		});
		
	// showWrap();
	function showWrap() {
		$('.bjmove').hide()
		$('.wrap').show();
		$('.zy').show();
		$('.lyun').hide();
		$('.hyun').show();
		setTimeout(showBwg, 3000);
	}
		// 显示博物馆
		function showBwg() {
			$('.zy').hide();
			$('.bwg').show();
			$('.tip').show()
			$('.hbbt').show()
			// $('.tip').addClass('tip1');
			$('.hbbt').click(function(){
				$('#bt')[0].play()
				showGameBwg()
			})
		}
		
		// 显示博物馆小游戏
		function showGameBwg() {
			$('.hbbt').hide()
			$('#game1').show().addClass('animated fadeIn');
			$('.left').show().addClass('animated fadeInLeft')
			$('.right').show().addClass('animated fadeInRight')
			$('.on').show().addClass('animated fadeInDown')
			$('.down').show().addClass('animated fadeInUp')
			$('.lang').show().addClass('animated fadeIn');
			$('.zs').hide();
			$('.tc').children('div').addClass('animated fadeIn');
			$('.index').show();
			
			//选中对的酒容器事件
			// 对最底下容器被遮挡做下处理
			$('.index').click(function(){
				$('#index').show();
				$('#false')[0].play();
					// $('#bt').eq(0).unbind('ended');
					// alert(1)
				})
			$('.qcontainer').click(function() {
				if ($(this).attr('answer')) {
					$(this).find('.tick').show();
					$('#bt')[0].play();
				} else {
					// alert('选择错误。');
					$(this).find('.tick2').show();
					$('#false')[0].play();
					$('#bt').eq(0).unbind('ended');
				}
				
				if ($('.qcontainer .tick:visible').length == 3) {
					$('.index').hide();
					setTimeout(showZs, 500);
				}
			});
		}
		
		// 显示中山国
		function showZs() {
			$('#game1').hide();
			$('.zs').show();
			$('.zsbt').show()
			$('.bwg').hide();
			// $('.tip').addClass('tip2');
			$('.tip').addClass('tip1');
			$('.lang').hide();
			$('.zsbt').click(function(){
				$('#bt')[0].play()
				showGameZs()
			})
		}
		// showGameBwg()
		// 显示中山国游戏
		function showGameZs() {
			$('#game2').show();
			$('.lang2').show();
			$('.cb').show();
			$('.zsbt').hide()
		}
		$('.xz').click(function() {
			if ($(this).attr('answer')) {
				$(this).find('.tick3').show();
				$('#bt')[0].play();
			} else {
				$(this).find('.tick4').show();
				$('#false')[0].play();
			}
			if ($('.xz .tick3:visible').length ==1) {
				setTimeout(showlast,500);
			}
		});
	}
	function showlast(){
		$('.bg').css('background-image', 'url(img/bg.jpg)');
		$('#game2').hide();
		$('.zs').hide();
		$('.lang2').hide();
		$('#hufu').show().addClass('animated fadeIn');
		$('.hf').addClass('animated bounce');
		$('.per').hide();
		setTimeout(
			function() {
				$('body').click(function(e) {
					$(this).unbind(e);
					showbx();
				});
			},500);
	}
	function showbx(){
		$('#bx')[0].play();
		$('.hf').hide();
		$('.yun,.gx,.bj').addClass('animated fadeOut').hide();
		$('.dj').show();
		var bxmov=$('.bx').show().addClass('animated-bxmove');
		animationEnd(bxmov,jxbt);
	}
	function jxbt(){
		$('body').on('click',function(e) {
			$(this).unbind(e);
			$('#bt')[0].play();
			invite();
		});
	}
	function invite(){
		$('.bx,.dj').hide();
		$('.invite').show().addClass('animated fadeIn');
		
		$('.wxbt').show().click(function(e){
			e.stopPropagation();
		})
		
		$('body').click(function(){
			$(this).unbind();
			$('.bg').hide()
			$('.end').show()
			$('.lyun3,.hyun').hide();
		     $('.wxbt').hide()
			$('.endbt').click(function(){
				// alert(1)
			})
		})
		$('.end').click(function(){
			$(this).hide();
			$('.end2').show()
		})
	}
	
});
function setScale(selector, scale) {
	$(selector).css({
		'-webkit-transform' : 'scale(' + scale + ')',
		'-moz-transform'    : 'scale(' + scale + ')',
		'-ms-transform'     : 'scale(' + scale + ')',
		'-o-transform'      : 'scale(' + scale + ')',
		'transform'         : 'scale(' + scale + ')'
	});
}
function showVoiceLength(voiceurl){  
	var voicePath = window.parent.getDisPlayUrl(voiceurl);
	　 
    var voice = $('#voice')[0];  //获取页面的audio标签
    voice.src = voicePath;　　　　//设置audio的播放路径
    voice.preload="metadata";    //设置页面加载音频的时候先加载元数据（时长、尺寸（仅视频）以及文本轨道。）
    voice.load();                //音频加载
	//这里的监听事件，表示音频开始加载的时候触发
	voice.addEventListener("loadstart", function() {
        var audio = new Audio();                //重新创建一个新的audio对象，为了下面获取长度的时候避免每次都获取同一个audio的长度
        audio.src = voicePath;　　　　　　　　　　 //重新设置新的audio对象的音频url　　
        audio.preload="metadata";               //设置新的audio对象加载音频元数据
        audio.load();　　　　　　　　　　　　　　　　//新的audio对象开始加载
        //新的audio对象元数据加载成功之后的回调 audio.duration 获取音频的时长，需要音频元数据加载完成之后才会有，否则就是NaN
        audio.onloadedmetadata=function(){
        	console.log("src="+audio.currentSrc+"-----------"+audio.duration);
        } 
    });
}
