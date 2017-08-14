(function( window , document ){

    'use strict';

    //给hotcss开辟个命名空间，别问我为什么，我要给你准备你会用到的方法，免得用到的时候还要自己写。
    var hotcss = {};


    (function() {
        //根据devicePixelRatio自定计算scale
        //可以有效解决移动端1px这个世纪难题。
        var viewportEl = document.querySelector('meta[name="viewport"]'),
            hotcssEl = document.querySelector('meta[name="hotcss"]'),
            dpr = window.devicePixelRatio || 1,
            maxWidth = 540,
            designWidth = 750,
            rootSize = 100;

        hotcss.rootSize = rootSize;
        //允许通过自定义name为hotcss的meta头，通过initial-dpr来强制定义页面缩放
        if (hotcssEl) {
            var hotcssCon = hotcssEl.getAttribute('content');
            if (hotcssCon) {
                var initialDprMatch = hotcssCon.match(/initial\-dpr=([\d\.]+)/);
                if (initialDprMatch) {
                    dpr = parseFloat(initialDprMatch[1]);
                }
                var maxWidthMatch = hotcssCon.match(/max\-width=([\d\.]+)/);
                if (maxWidthMatch) {
                    maxWidth = parseFloat(maxWidthMatch[1]);
                }
                var designWidthMatch = hotcssCon.match(/design\-width=([\d\.]+)/);
                if (designWidthMatch) {
                    designWidth = parseFloat(designWidthMatch[1]);
                }
            }
        }

        document.documentElement.setAttribute('data-dpr', dpr);
        hotcss.dpr = dpr;

        document.documentElement.setAttribute('max-width', maxWidth);
        hotcss.maxWidth = maxWidth;

        

        // 缩放比
        var scale = 1 / dpr,
            content = 'width=device-width, initial-scale=' + scale + ', minimum-scale=' + scale + ', maximum-scale=' + scale + ', user-scalable=no';

        if (viewportEl) {
            viewportEl.setAttribute('content', content);
        } else {
            viewportEl = document.createElement('meta');
            viewportEl.setAttribute('name', 'viewport');
            viewportEl.setAttribute('content', content);
            document.head.appendChild(viewportEl);
        }

        // px 转化为rem的方法
        hotcss.px2rem = function( px , designWidth ){
            //预判你将会在JS中用到尺寸，特提供一个方法助你在JS中将px转为rem。就是这么贴心。
            if( !designWidth ){
                //如果你在JS中大量用到此方法，建议直接定义 hotcss.designWidth 来定义设计图尺寸;
                //否则可以在第二个参数告诉我你的设计图是多大。
                designWidth = parseInt(hotcss.designWidth , 10);
            }

            return parseInt(px,10)*hotcss.designWidth /designWidth/hotcss.rootSize;
        }

        hotcss.rem2px = function( rem , designWidth ){
            //新增一个rem2px的方法。用法和px2rem一致。
            if( !designWidth ){
                designWidth = parseInt(hotcss.designWidth , 10);
            }
            //rem可能为小数，这里不再做处理了
            return rem*hotcss.rootSize*designWidth/hotcss.designWidth;
        }

        hotcss.mresize = function(){
            //对，这个就是核心方法了，给HTML设置font-size。
            var innerWidth = document.documentElement.getBoundingClientRect().width || window.innerWidth;

            if( hotcss.maxWidth && (innerWidth/hotcss.dpr > hotcss.maxWidth) ){
                innerWidth = hotcss.maxWidth*hotcss.dpr;
            }

            if( !innerWidth ){ return false;}




            document.documentElement.style.fontSize = ( innerWidth*hotcss.rootSize/hotcss.designWidth ) + 'px';

        };  



    
            
        Object.defineProperty(hotcss, 'designWidth', {
            get: function() {
                // console.log('get：designWidth-->' + designWidth);
                return designWidth;
            },
            set: function(value) {
                designWidth = value;
                hotcss.mresize();
                // console.log('set：designWidth-->' + designWidth);
            }
        });

        
        Object.defineProperty(hotcss, 'rootSize', {
            get: function() {
                // console.log(this);
                // console.log('get：rootSize-->' + rootSize);
                return rootSize;
            },
            set: function(value) {
                rootSize = value;
                hotcss.mresize();
                // console.log('set：rootSize-->' + rootSize);
            }
        });

        Object.defineProperty(hotcss, 'maxWidth', {
            get: function() {
                // console.log(this);
                // console.log('get: maxWidth-->' + maxWidth);
                return maxWidth;
            },
            set: function(value) {
                maxWidth = value;
                document.documentElement.setAttribute('max-width', maxWidth);
                hotcss.mresize(); 
                // console.log('set: maxWidth-->' + maxWidth);
            }
        });



    })();

    hotcss.mresize(); 
    //直接调用一次

    window.addEventListener( 'resize' , function(){
        clearTimeout( hotcss.tid );
        hotcss.tid = setTimeout( hotcss.mresize , 33 );
    } , false ); 
    //绑定resize的时候调用

    window.addEventListener( 'load' , hotcss.mresize , false ); 
    //防止不明原因的bug。load之后再调用一次。


    setTimeout(function(){
        hotcss.mresize(); 
        //防止某些机型怪异现象，异步再调用一次
    },333)


    window.hotcss = hotcss; 
    //命名空间暴露给你，控制权交给你，想怎么调怎么调。
})( window , document );

$(function(){
        //当滚动条的位置处于距顶部100像素以下时，跳转链接出现，否则消失
        $(function () {
            $(window).scroll(function(){
                if ($(window).scrollTop()>340){
                    $(".demo").fadeIn(1000);
                }
                else
                {
                    $(".demo").fadeOut(1000);
                }
            });
 
            //当点击跳转链接后，回到页面顶部位置
            function IsPC() { 
		           var userAgentInfo = navigator.userAgent; 
		           var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"); 
		           var flag = true; 
		           for (var v = 0; v < Agents.length; v++) { 
		               if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; } 
		           } 
		           return flag; 
			}
            var touchEvents = {
		        touchstart: "touchstart",
		        touchmove: "touchmove",
		        touchend: "touchend",
		
		        /**
		         * @desc:判断是否pc设备，若是pc，需要更改touch事件为鼠标事件，否则默认触摸事件
		         */
		        initTouchEvents: function () {
		            if (isPC()) {
		                this.touchstart = "mousedown";
		                this.touchmove = "mousemove";
		                this.touchend = "mouseup";
		            }
		        }
		    };
		    $(".demo").bind(touchEvents.touchend, function (event) {
			    event.preventDefault();
			     $('body,html').animate({scrollTop:0},800);
                return false;
			});
            
            
            
// 
//          $(".demo").touchend(function(){
//              $('body,html').animate({scrollTop:0},800);
//              return false;
//          });
        });
    });
// 设计图的宽度  默认 750  
//hotcss.designWidth = 375;
// 设计图  rootSize px = 1rem; 默认值 100
//hotcss.rootSize = 100;
// 最大设备宽度 默认值  480px;
//hotcss.maxWidth = 480;


// 注意：使用了这个东西之后，不能再写px了。  但是1px边框就是正儿八经的1px边框
