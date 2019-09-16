//增加load事件，页面全部加载完再执行
window.addEventListener('load',function(){
   //获取元素
    var arrow_1=document.querySelector('.arrow-1');
    var arrow_r=document.querySelector('.arrow-r');
    var focus=document.querySelector('.focus');
    var focusWidth=focus.offsetWidth;
    //鼠标经过focus就显示隐藏左右按钮
    focus.addEventListener('mouseenter',function(){
        arrow_1.style.display='block';
        arrow_r.style.display='block';
        clearInterval(timer);
        timer=null;
    })
    focus.addEventListener('mouseleave',function(){
        arrow_1.style.display='none';
        arrow_r.style.display='none';
        timer=setInterval(function(){
            //手动调用事件
            arrow_r.click();
        },2000)
    })
    //多个鼠标事件无法调用
    // focus.onmouseenter=function(){
    //     arrow_1.style.display='block';
    //     arrow_r.style.display='block';
    // }
    // focus.onmouseleave=function() {
    //     arrow_1.style.display = 'none';
    //     arrow_r.style.display = 'none';
    // }
    //1.动态生成小圆圈，有几张图片，就生成几个小圆圈
    //2.获取元素
    var ul=focus.querySelector('ul');
    var ol=focus.querySelector('.circle');
     // console.log(ul.length);
    for (var i=0;i<ul.children.length;i++){
       3. //创建小li
        var li=document.createElement('li');
       //记录当前小圆圈的索引号，通过自定义属性来做
        li.setAttribute('index',i);
       4.//将小li插入ol
        ol.appendChild(li);
       //5.小圆圈的排他思想，生成小圆圈的同时绑定点击事件。
       li.addEventListener('click',function (){
       //干掉所有人，把所有的小li清除current类名
           for(var i=0;i<ol.children.length;i++){
               ol.children[i].className="";
           }
       // 留下我自己 当前的小li设置current类名
           this.className='current';
           // 6.点击小圆圈，移动图片，当然是移动li
           //ul的移动距离，小圆圈的索引号乘以图片的宽度  注意是负值
           //当我们点击某个小li 就拿到当前小li 的索引号
           var index=this.getAttribute('index');
           // var focusWidth=focus.offsetWidth;  已提取到上面作为全局变量
           //当我们点击某个小li就要把这个小li的索引号给num
           num=index;
           //当我们点击某个小li就要把这个小li的索引号给num
           circle=index;
           // num=circle=index;
           // console.log(focusWidth);
           // console.log(index);
           animate(ul,-index * focusWidth);
          })
    }
     //把ol里面第一个小li设置为白色
    ol.children[0].className='current';
    //克隆一张图片li放到ul后面
    var first=ul.children[0].cloneNode(true);
    ul.appendChild(first);
    //无缝滚动原理
    //点击右侧按钮 图片滚动一张
        var num=0;
        //circle声明在外
        var circle=0;
    arrow_r.addEventListener('click',function(){
        //如果走到了最后复制的一张图片，此时我们的ul要快速复原left改为0
        if (num == ul.children.length-1) {
            ul.style.left=0;
            num=0;
        }
        num++;
        animate(ul,-num * focusWidth);
        //8.点击右侧按钮，小圆圈跟随一起变化 ，可以再声明一个变量控制小圆圈播放
        circle++;
        //如果circle==4说明走到最后我们克隆的这张图片了，我们就复原
        if(circle==ol.children.length){
            circle=0;
        }
        // 先清除其余小圆圈的current类名
        for(var i=0;i<ol.children.length;i++){
            ol.children[i].className='';
        }
        // 留下当前的小圆圈的current类名
        ol.children[circle].className='current';
    });
    arrow_1.addEventListener('click',function(){
        //如果走到了最后复制的一张图片，此时我们的ul要快速复原left改为0
        if (num == 0) {
            num=ul.children.length-1;
            ul.style.left=-num * focusWidth+'px';

        }
        num--;
        animate(ul,-num * focusWidth);
        //8.点击右侧按钮，小圆圈跟随一起变化 ，可以再声明一个变量控制小圆圈播放
        circle--;
        //如果circle<0 说明第一张图片，则小圆圈要改为第四个小圆圈（3）
        if(circle<0){
            circle=ol.children.length-1;
        }
        //三目运算： circle=circle<0?ol.childdren.length-1:circle;
        // 先清除其余小圆圈的current类名
        for(var i=0;i<ol.children.length;i++){
            ol.children[i].className='';
        }
        // 留下当前的小圆圈的current类名
        ol.children[circle].className='current';
    });
    // 10.自动播放轮播图,
    var timer=setInterval(function(){
        //手动调用事件
        arrow_r.click();
    },2000)
})


