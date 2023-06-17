// 加载就执行
$(function () {
    // 开篇模块市局滚动
    slide('.zyyw_msg', '.zyyw_msg_slide');
    /*消息滚动*/
    var $ul = $('.roll');
    var timeID;
    function roll() {
        clearInterval(timeID);
        timeID = setInterval(function () {
            clearInterval(timeID);
            $ul.animate({ top: "0px" }, 1000, function () {
                $ul.find("li:first").removeClass().addClass('roll_hide').appendTo($ul);

                for (var i = 0; i < 5; i++) {
                    $ul.find("li").eq(i).removeClass().addClass('roll_' + (i + 1) + '')
                }
                roll()
            })
        }, 1000);
    }
    roll();
})
// domo树加载好就执行
$(document).ready(function ($) {
    // 
    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });
});

var radius = 150;
var dtr = Math.PI / 180;
var d = 200;
var mcList = [];
var active = false;
var lasta = 1;
var lastb = 1;
var distr = true;
var tspeed = 0.4; //
var size = 450;
var mouseX = 0;
var mouseY = 0;
var howElliptical = 1;
var aA = null;
var oDiv = null;
// 所有资源加载完后执行
window.onload = function () {
    // first-page 动画
    var KEYMAP = {
        '三十岁还没有结婚？': 8,
        '简历上的空白时间': 9,
        '怎么还在读书': 13,
        '延毕就是差劲': 16,
        '什么年纪就做什么事': 17,
        '正在考研的表哥被叫做废物': 18,
        '年龄焦虑': 20,
        '辞职转行被觉得耻辱': 32,
        '好想停下来': 33,
        '你的人生比别人晚了8年': 34,
        '同辈压力 ': 35,
        '年龄带来的羞耻感': 36,
        '28岁，我的人生已经完了': 37,
        '什么年龄段就该做什么事': 38,
        '男大当婚': 39,
        '三十而立': 40,
        '25岁毕业找工作': 45,
        '30岁之前结婚成家': 46,
        '40岁事业有成': 48,
        '60岁退休养老照顾孙辈': 49,
        '催婚': 50,
        '催生娃': 51,
        '18岁上大学': 52,
        '22岁考硕士': 53,
        '26岁读博': 54,
        '26岁买车': 55,
        '28岁买房': 56,
        '30岁创业': 57,
        '没前途': 65,
        '人生该怎么办了': 66,
        '人生完了”': 67,
        '做错重大选择': 68,
        '这辈子也就这样了': 69,
        '待在舒适圈': 70,
        '朋友也都不理解我': 71,
        '30岁的问候': 72,
        '“我真的害怕做决定”': 73,
        '男生晚几年没关系': 74,
        '下一步该做什么': 75,
        '一手好牌打烂了': 76,
        '走错一步的人生': 77,
        '梦想和现实': 78,
        '女大当嫁': 79,
        '黄金年龄': 80,
        '为什么还不结婚': 81,
        '逆女！': 82,
        '逆子！': 83,
        '34岁的Loser': 84,
        '我怎么混成这样': 85,
        '中年危机': 86,
        '可别当剩女': 87,
        '稳定些吧': 88,
        '同辈压力': 89,
        '沉没成本太高': 90,
        '一手好牌打烂了': 112,
        '不知道下一步': 113,
        '焦虑迷茫': 114,
        '女生不能晚': 115,
        '大器晚成': 116,
        '好怕选错': 117,
        '好怕做选择': 118,
        '周围人都不理解我': 119,
        '不敢踏出舒适圈': 120,
        '固步自封': 121,
        '我这辈子也就这样了': 122,
        '稳定': 123,
        '女生要考公': 124,
        '考研': 125,
        '̽考公': 126,
        '休学': 186,
        '剩女': 187,
        '败犬': 188,
        '丁克': 189,
        '不婚': 190,
        'loser': 191,
        '人生分岔路': 219,
        '生命节奏': 220,
        '老顽童': 221,
        '大家都这样': 222
    };
    var key_els = {};
    var rand = function rand() {
        var max = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
        var min = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

        var _int = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

        var gen = min + (max - min) * Math.random();
        return _int ? Math.round(gen) : gen;
    };
    (function init() {
        var a3d = document.querySelector('.a3d'),
            f = document.createDocumentFragment(),
            lims = [33, 41, 47, 58, 91, 127, 146],
            len = lims.length,
            unit = 360 / (len + 1);

        for (var p in KEYMAP) {
            var rot = document.createElement('div'),
                key = document.createElement('div');

            key.dataset.name = p.replace('NUM_', '');
            key.dataset.code = KEYMAP[p];
            key.classList.add('key');

            for (var i = 0; i < len; i++) {
                if (KEYMAP[p] < lims[i]) {
                    var hue = rand((i + .8) * unit, (i + .2) * unit, 1);
                    key.style.color = 'hsl(' + 164 + ',100%,100%)';
                    break;
                }
            }

            rot.classList.add('rot');

            key_els[p] = key;
            rot.appendChild(key);
            f.appendChild(rot);
        }

        a3d.appendChild(f);
    })();
    addEventListener('keydown', function (e) {
        e.preventDefault();

        for (var p in KEYMAP) {
            if (e.keyCode === KEYMAP[p]) {
                if (!key_els[p].classList.contains('vis')) key_els[p].classList.add('vis');
                return;
            }
        }
    }, false);
    addEventListener('keyup', function (e) {
        e.preventDefault();
    }, false);
    addEventListener('animationend', function (e) {
        var t = e.target;
        if (e.animationName === 'hl') t.classList.remove('vis');
    }, false);
    // fifth-page 动画
    var i = 0;
    var oTag = null;
    oDiv = document.getElementById('div1');
    aA = oDiv.getElementsByClassName('a1');
    for (i = 0; i < aA.length; i++) {
        oTag = {};
        oTag.offsetWidth = aA[i].offsetWidth;
        oTag.offsetHeight = aA[i].offsetHeight;
        mcList.push(oTag);
    };
    sineCosine(0, 0, 0);
    positionAll();
    oDiv.onmouseover = function () {
        active = true;
    };
    oDiv.onmouseout = function () {
        active = false;
    };
    oDiv.onmousemove = function (ev) {
        var oEvent = window.event || ev;
        mouseX = oEvent.clientX - (oDiv.offsetLeft + oDiv.offsetWidth / 2);
        mouseY = oEvent.clientY - (oDiv.offsetTop + oDiv.offsetHeight / 2);
        mouseX /= 5;
        mouseY /= 5;
    };
    setInterval(update, 30);
};

function update() {
    var a;
    var b;

    if (active) {
        a = (-Math.min(Math.max(-mouseY, -size), size) / radius) * tspeed;
        b = (Math.min(Math.max(-mouseX, -size), size) / radius) * tspeed;
    } else {
        a = lasta * 0.98;
        b = lastb * 0.98;
    }

    lasta = a;
    lastb = b;

    if (Math.abs(a) <= 0.01 && Math.abs(b) <= 0.01) {
        return;
    }

    var c = 0;
    sineCosine(a, b, c);
    for (var j = 0; j < mcList.length; j++) {
        var rx1 = mcList[j].cx;
        var ry1 = mcList[j].cy * ca + mcList[j].cz * (-sa);
        var rz1 = mcList[j].cy * sa + mcList[j].cz * ca;

        var rx2 = rx1 * cb + rz1 * sb;
        var ry2 = ry1;
        var rz2 = rx1 * (-sb) + rz1 * cb;

        var rx3 = rx2 * cc + ry2 * (-sc);
        var ry3 = rx2 * sc + ry2 * cc;
        var rz3 = rz2;

        mcList[j].cx = rx3;
        mcList[j].cy = ry3;
        mcList[j].cz = rz3;

        per = d / (d + rz3);

        mcList[j].x = (howElliptical * rx3 * per) - (howElliptical * 2);
        mcList[j].y = ry3 * per;
        mcList[j].scale = per;
        mcList[j].alpha = per;

        mcList[j].alpha = (mcList[j].alpha - 0.6) * (10 / 6);
    }

    doPosition();
    depthSort();
}
function depthSort() {
    var i = 0;
    var aTmp = [];

    for (i = 0; i < aA.length; i++) {
        aTmp.push(aA[i]);
    }

    aTmp.sort(function (vItem1, vItem2) {
        if (vItem1.cz > vItem2.cz) {
            return -1;
        } else if (vItem1.cz < vItem2.cz) {
            return 1;
        } else {
            return 0;
        }
    });

    for (i = 0; i < aTmp.length; i++) {
        aTmp[i].style.zIndex = i;
    }
}
function positionAll() {
    var phi = 0;
    var theta = 0;
    var max = mcList.length;
    var i = 0;

    var aTmp = [];
    var oFragment = document.createDocumentFragment();

    // 随机排序
    for (i = 0; i < aA.length; i++) {
        aTmp.push(aA[i]);
    }

    aTmp.sort(function () {
        return Math.random() < 0.5 ? 1 : -1;
    });

    for (i = 0; i < aTmp.length; i++) {
        oFragment.appendChild(aTmp[i]);
    }

    oDiv.appendChild(oFragment);

    for (var i = 1; i < max + 1; i++) {
        if (distr) {
            phi = Math.acos(-1 + (2 * i - 1) / max);
            theta = Math.sqrt(max * Math.PI) * phi;
        } else {
            phi = Math.random() * (Math.PI);
            theta = Math.random() * (2 * Math.PI);
        }
        // 坐标变换
        mcList[i - 1].cx = radius * Math.cos(theta) * Math.sin(phi);
        mcList[i - 1].cy = radius * Math.sin(theta) * Math.sin(phi);
        mcList[i - 1].cz = radius * Math.cos(phi);

        aA[i - 1].style.left = mcList[i - 1].cx + oDiv.offsetWidth / 2 -
            mcList[i - 1].offsetWidth / 2 + 'px';
        aA[i - 1].style.top = mcList[i - 1].cy + oDiv.offsetHeight / 2 -
            mcList[i - 1].offsetHeight / 2 + 'px';
    }
}
function doPosition() {
    var l = oDiv.offsetWidth / 2;
    var t = oDiv.offsetHeight / 2;
    for (var i = 0; i < mcList.length; i++) {
        aA[i].style.left = mcList[i].cx + l - mcList[i].offsetWidth / 2 + 'px';
        aA[i].style.top = mcList[i].cy + t - mcList[i].offsetHeight / 2 + 'px';

        aA[i].style.fontSize = Math.ceil(12 * mcList[i].scale / 2) + 8 + 'px';

        aA[i].style.filter = "alpha(opacity=" + 100 * mcList[i].alpha + ")";
        aA[i].style.opacity = mcList[i].alpha;
    }
}
function sineCosine(a, b, c) {
    sa = Math.sin(a * dtr);
    ca = Math.cos(a * dtr);
    sb = Math.sin(b * dtr);
    cb = Math.cos(b * dtr);
    sc = Math.sin(c * dtr);
    cc = Math.cos(c * dtr);
};

function reP() {
    document.getElementById('oImg').style.display = "block";
}
function reP2() {
    document.getElementById('oImg2').style.display = "block";
}
function reP3() {
    document.getElementById('oImg3').style.display = "block";
}

// 返回页面顶部
function returnTop () {
	$('body,html').animate({scrollTop:0}, 1000);
};

// 滚动诗句

//上下无缝滚动
function slide(elp, elc) {
    var loops = $(elp).attr("attr-loop");
    var slideElm = $(elc);
    var slideHeight = null;



    var childHeight = $(elc).height(); //获取子级的内容高度
    var parentHeight = $(elp).height(); //获取父级的高度

    //如果子级高度大于父级，不管loop是什么都需要循环，如果子级高度小于父级，需要判断loop是否为true，loop=true  就继续上下无缝滚动
    if (childHeight > parentHeight) {
        slideElm.append(slideElm.html());
        slideHeight = $(elc).height() / 2;

        msgSlide(loopSlide);

    } else {

        if (loops == "true") {
            slideHeight = $(elc).height();
            msgSlide(loopTrueSlide);
        }
    }

    //上下滚动				
    function loopSlide() {

        if (Math.abs($(elc).position().top) > slideHeight) {
            $(elc).css("top", "0px");
        } else {
            $(elc).css("top", $(elc).position().top - 1);
        }
    }

    //loop  为true 时还需要滚动
    function loopTrueSlide() {
        $(elc).css("top", $(elc).position().top - 1);

        if ($(elc).position().top == -slideHeight) {
            $(elc).css("top", $(elp).height());
        }
    }
    //鼠标移入暂停，移出继续
    function msgSlide(fn) {
        var timer = setInterval(fn, 20);
        $(elp).hover(function () {
            clearInterval(timer)
        }, function () {
            timer = setInterval(fn, 20);
        })
    }
}

// 鼠标


