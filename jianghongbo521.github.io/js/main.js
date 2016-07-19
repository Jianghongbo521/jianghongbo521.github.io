
window.onload = function(){
function getStyle(obj, name){
    return (obj.currentStyle || getComputedStyle(obj, false))[name];
}
function move(obj, json, options){
    var options=options || {};
    options.duration=options.duration || 800;
    options.easing=options.easing || 'ease-out';

    var start={};
    var dis={};
    for(var name in json){
        start[name]=parseFloat(getStyle(obj, name));
        dis[name]=json[name]-start[name];
    }
    var count=Math.floor(options.duration/30);
    var n=0;
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        n++;
        for(var name in json){
            switch(options.easing){
                case 'linear':
                    var a=n/count;
                    var cur=start[name]+dis[name]*a;
                    break;
                case 'ease-in':
                    var a=n/count;
                    var cur=start[name]+dis[name]*a*a*a;
                    break;
                case 'ease-out':
                    var a=1-n/count;
                    var cur=start[name]+dis[name]*(1-a*a*a);
                    break;
            }

            if(name=='opacity'){
                obj.style.opacity=cur;
                obj.style.filter='alpha(opacity='+cur*100+')';
            }else{
                obj.style[name]=cur+'px';
            }
        }

        if(n==count){
            clearInterval(obj.timer);
            options.complete && options.complete();
        }
    }, 30);
}   

    //h5图片时钟
    (function(){

        var oH = document.querySelector('#clock .hours');
        var oM = document.querySelector('#clock .minutes');
        var oS = document.querySelector('#clock .second');
        function clock(){
            var oDate=new Date();
            var h=oDate.getHours();
            var m=oDate.getMinutes();
            var s=oDate.getSeconds();
            var ms=oDate.getMilliseconds();
            oH.style.transform='rotate('+(h%12*30+m/60*30)+'deg)';
            oM.style.transform='rotate('+(m*6+s/60*6)+'deg)';
            oS.style.transform='rotate('+(s*6+ms/1000*6)+'deg)';
        }
        clock();
        setInterval(clock, 1000);
    })();


    //头部导航
    (function(){
        var oNav = document.getElementById('nav_box');
        var l = 0;
        function show(){
            l-=2;
            if(l<-537){
                l=0;
                oNav.style.left =0;
            }
            oNav.style.left = l+'px';
        }
        timer=setInterval(show,60);
        oNav.onmouseover = function(){
            clearInterval(timer);
        };
        oNav.onmouseout = function(){
            timer=setInterval(show,60)
        }
    })();
    //下载简历
    var oResume = document.getElementById('resume');
    var oLeft = document.getElementById('left');
    var oTop = document.getElementById('top');
    var oBottom = document.getElementById('bottom');
    var oRight = document.getElementById('right');
    oResume.onmouseover = function(){
        move(oLeft,{left:-2,width:104},{duration:300});
        move(oTop,{top:-2, height:42},{duration:300});
        move(oRight,{right:-2, width:104},{duration:300});
        move(oBottom,{bottom:-2, height:42},{duration:300});
    };
    oResume.onmouseout = function(){
        move(oLeft,{left:-100, width:0},{duration:300});
        move(oTop,{top:-50, height:0},{duration:300});
        move(oRight,{right:-100, width:0},{duration:300});
        move(oBottom,{bottom:-50, height:0},{duration:300});
    };
    //漂浮的云
    (function(){
        var timer = null;
        var oBanner = document.getElementById('banner');
        //var clientW = document.documentElement.clientWidth;
        var oCloud_box = document.getElementById('cloud_box');
        oCloud_box.style.width = 2*oBanner.offsetWidth+'px';
        //oCloud_box.innerHTML+=oCloud_box.innerHTML;
        var l =0;
        timer=setInterval(function(){

            l+=2;
            if(l>=0){
                oCloud_box.style.left = -oCloud_box.offsetWidth/2+'px';
                l=oCloud_box.offsetLeft;

            }

            oCloud_box.style.left= l+'px';

        },30);

    })();

    //(function(){
    //    var oAuthor_cloud=document.getElementById('author_cloud');
    //    var oAuthor_cloud2=document.getElementById('author_cloud2');
    //    var oAuthor = document.getElementById('author');
    //
    //
    //    function author(obj,x,y){
    //        var iSpeedX=x;
    //        var iSpeedY=y;
    //        setInterval(function(){
    //            var l=obj.offsetLeft+iSpeedX;
    //            var t=obj.offsetTop+iSpeedY;
    //            var H=oAuthor.offsetHeight-obj.offsetHeight;
    //            var W=oAuthor.offsetWidth-obj.offsetWidth;
    //            //alert(1)
    //            if(t>=H){
    //                t=H;
    //                iSpeedY*=-1;
    //            }
    //            if(l>W){
    //                l=W;
    //                iSpeedX*=-1;
    //            }
    //            if(t<0){
    //                t=0;
    //                iSpeedY*=-1;
    //            }
    //            if(l<0){
    //                l=0;
    //                iSpeedX*=-1;
    //            }
    //
    //            obj.style.left=l+'px';
    //            obj.style.top=t+'px';
    //        }, 30);
    //    }
    //    author(oAuthor_cloud,3,0);
    //    author(oAuthor_cloud2,2,0);
    //})();
		//回到顶部
	var oToTop = document.getElementById('totop');
	function totop(){
	var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
		oToTop.onclick = function(){
			var start = scrollTop;
			var dis = 0 - scrollTop;
			var count = Math.floor(1000/30);
			var n =0 ;
			var timer = null;
			clearInterval(timer)
			timer=setInterval(function(){
				n++;
				document.documentElement.scrollTop=document.body.scrollTop= start+dis/count*n;
				if(n==count){
					clearInterval(timer);
				}
			},30)
		}
	}
    //主要作品
    var oWork = document.getElementById('works_main');
    var aDiv = oWork.getElementsByTagName('div');
    var aSpan1 = oWork.getElementsByTagName('span');
    var arr = [];
    var zIndex=999;
    for(var i=0; i<aDiv.length; i++){
        arr[i]={
            left:aDiv[i].offsetLeft,
            top:aDiv[i].offsetTop
        }
    }
    for(var i=0; i<aDiv.length; i++){
        aDiv[i].style.position ='absolute';
        aDiv[i].style.left= arr[i].left+'px';
        aDiv[i].style.top = arr[i].top+'px';
        aDiv[i].style.margin = 0;
        aDiv[i].style.backgroundImage = 'url(images/'+(i+1)+'.jpg)';

    }
    for(var i=0; i<aDiv.length; i++){
        aDiv[i].index = i;
        aDiv[i].onmouseover = function(){
            this.style.zIndex=zIndex++;
            move(this,{width:300,height:300,marginTop:-40,marginLeft:-40});
            move(aSpan1[this.index],{height:300})
            aSpan1[i].style.lineHeight = aSpan1[this].offsetHeight;
        };
        aDiv[i].onmouseout = function(){

            move(aSpan1[this.index],{height:50});
            move(this,{width:220,height:220,marginTop:0,marginLeft:0})
            aSpan1[i].style.lineHeight = aSpan1[this].offsetHeight;
        }
    }
    //漂浮的云
    function rnd(n,m){
        return parseInt(Math.random()*(m-n))+n;
    }
    var oDiv=document.getElementById('div1');
    var aA=oDiv.getElementsByTagName('a');
    var i=0;
    for(i=0;i<aA.length;i++){
        aA[i].style.background ='rgb('+rnd(0,256)+','+rnd(0,256)+','+rnd(0,256)+')'
        aA[i].pause=1;
        aA[i].time=null;
        initialize(aA[i]);
        aA[i].onmouseover=function(){
            this.pause=0;   
        };
        aA[i].onmouseout=function(){
            this.pause=1;
        };
    }
    setInterval(starmove,30);
    function starmove(){
        for(i=0;i<aA.length;i++){
            if(aA[i].pause){
                domove(aA[i]);
            }
        }
    }
    function domove(obj){
        if(obj.offsetTop<=-obj.offsetHeight){
            obj.style.top=oDiv.offsetHeight+"px";
            initialize(obj);
        }else{
            obj.style.top=obj.offsetTop-obj.ispeed+"px";    
        }
    }
    //自我介绍
    function initialize(obj){
        var iLeft=parseInt(Math.random()*oDiv.offsetWidth);
        var scale=Math.random()*1+1;
        var iTimer=parseInt(Math.random()*1500);
        obj.pause=0;

        obj.style.fontSize=12*scale+'px';

        if((iLeft-obj.offsetWidth)>0){
            obj.style.left=iLeft-obj.offsetWidth+"px";
        }else{
            obj.style.left=iLeft+"px";
        }
        clearTimeout(obj.time);
        obj.time=setTimeout(function(){
            obj.pause=1;
        },iTimer);
        obj.ispeed=Math.ceil(Math.random()*4)+1;
    }

    //文字分布运动
    var oAbstruct = document.getElementById('abstruct')
    var oRecommend = document.getElementById('recommend');
    var oDiv2 = document.createElement('div');
    oRecommend.appendChild(oDiv2);
    var str='我是一个做事认真，踏实肯干的人。\
            我热衷于钻研各种新鲜技术，紧跟时代潮流。\
            有良好的编码习惯,能够配合团队完成相关工作.\
            熟练使用HTML、CSS、JavaScript、jQuery、Ajax、Jsonp、DOM等前端技术，开发过jQuery插件。\
            熟悉HTML5、CSS3新技术。\
            熟悉闭包、封闭空间、面向对象、常用设计模式和常用MVC框架。\
            有Node.js、PHP、Linux基础，对服务器端开发有一定了解。'
    for(var i=0; i<str.length; i++){
        var oSpan = document.createElement('span');
        oSpan.innerHTML = str.charAt(i);
        oDiv2.appendChild(oSpan);
    }
    window.onscroll = function(){
        totop();
        var n=0;
        var aSpan1 = oDiv2.children;
        var timer = null;
        var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
        if(scrollTop>oAbstruct.offsetTop-100){
             timer=setInterval(function(){
                move(aSpan1[n],{opacity:1})
                n++;
                if(n==aSpan1.length){
                    clearInterval(timer);
                }
            },100)
        }
   };
    // 头部展示
    /*var oBox=document.getElementById('box');
    var aSpan=oBox.children;
    var bFlag=true;
    oBox.onclick=function(){
        if(bFlag){
            for(var i=0; i<aSpan.length; i++){
                var d=360/6*i;
                cirMove(aSpan[i], d);
            }
        }else{
            for(var i=0; i<aSpan.length; i++){
                cirMove(aSpan[i], 0);
            }
        }
        bFlag=!bFlag;
    };
    var R=oBox.offsetWidth/2;
    function cirMove(obj, iTarget){
        // 角度
        obj.a=obj.a || 0;
        var start=obj.a;
        var dis=iTarget-start;

        var count=Math.floor(1000/30);
        var n=0;
        clearInterval(obj.timer);
        obj.timer=setInterval(function(){
            n++;
            var a=n/count;
            var cur=start+dis*a;
            // 更新角度
            obj.a=cur;
            var x=R+R*Math.sin(cur*Math.PI/180);
            var y=R-R*Math.cos(cur*Math.PI/180);
            obj.style.left=x+'px';
            obj.style.top=y+'px';
            if(n==count){
                clearInterval(obj.timer);
            }
        }, 30);
    }*/
    window.onresize = function(){
        var oClientH = document.documentElement.clientWidth;
        if(oClientH<800){
            oDiv.style.display='none';
        }else{
            oDiv.style.display = 'block';
        }
    }
};
