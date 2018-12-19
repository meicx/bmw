$(function() {

var btn = $(".btnStart");
var answerBtn = $(".anserBtn");
var selectIcon = $(".selectIcon");
var mainIndex = $(".main-index");
var shareIndex = $(".share-index");
var myVideo = document.getElementById("myVideo");
var myAudio = document.getElementById("myAudio");
var myAudioNext = document.getElementById("myAudioNext");
var slide = $(".slide");
var sourceArr = [
	{
		type:"img",
		src:"assets/img/phoneCall.png"
	},
	{
		type:"img",
		src:"assets/img/phoneCallIos.png"
	},
	{
		type:"img",
		src:"assets/img/icon.png"
	},
	{
		type:"img",
		src:"assets/img/photoIcon1.png"
	},
	{
		type:"img",
		src:"assets/img/photoIcon2.png"
	},
	{
		type:"img",
		src:"assets/img/photoIcon3.png"
	},
	{
		type:"img",
		src:"assets/img/photoIcon4.png"
	},
	{
		type:"img",
		src:"assets/img/background.png"
	},
	{
		type:"img",
		src:"assets/img/share1.png"
	},
	{
		type:"img",
		src:"assets/img/share2.png"
	},
	{
		type:"img",
		src:"assets/img/share3.png"
	},
	{
		type:"img",
		src:"assets/img/share_img.png"
	},
	{
		type:"audio",
		elem:myAudio
	},
	{
		type:"audio",
		elem:myAudioNext
	},
	{
		type:"video",
		elem:myVideo
	}
];
init();
loadSource();
bind();

function init(){	
	FastClick.attach(document.body);
	if($.os.ios) {
		console.log("ios")
		document.getElementById('myVideo').src="assets/media/myVideoIos.mp4";
		$(".phoneCall").css("background-image","url('assets/img/phoneCallIos.png')");
	}
	// if (typeof WeixinJSBridge == "undefined"){
	//     if( document.addEventListener ){
	//         document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
	//     }else if (document.attachEvent){
	//         document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
	//         document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
	//     }
	// }
}

function loadSource(){
	var loader = new SourceLoad(sourceArr.length);
	for (var i = 0; i < sourceArr.length; i++) {
		var sourceObj;
		switch(sourceArr[i].type){
			case "img":
				sourceObj = new Image();
				sourceObj.src = sourceArr[i].src;
				if(sourceObj.complete) {
					loader.loadOne();
				}
				else {
					sourceObj.onload = function() {
					    loader.loadOne();
					}
				}
				break;
			case "video":
				var elem = sourceArr[i]["elem"];
				loader.loadOne();
				break;
			default:
				var elem = sourceArr[i]["elem"];
				if (elem.readyState == 4 ) {
					console.log(elem.src)
	            	loader.loadOne();
		        } else {
		            function mediaLoad(){
		            	console.log(elem.src)
		                loader.loadOne();
		                elem.removeEventListener('canplaythrough',mediaLoad)
		            }
		            elem.addEventListener('canplaythrough',mediaLoad,false)
		            if(elem.readyState == 0){elem.load()}
		        }
		}
	
	}
	loader.on("loadDone",function(){
	    $(".loadPic").removeClass('picRotateAnimation');
	    $(".btnStart").css("display","block");
	    $(".btnLoad").css("display","none");
	});

	loader.on("loading",function(){
	    $("#percent").html(loader.getLoadPercent());
	});
	setTimeout(function(){
		console.log($("#percent").html());
		if($("#percent").html()!="100")
			console.log("loadDone");
			loader._dispathEvent('loadDone');
	},10000);
}

function bind(){
	btn.on("click",function(){
		$(".loadPic").addClass("picSwingAnimation");
		var loops=setTimeout(loop,50);	
		setTimeout(function(){
			mainIndex.css("display","none");
			$("#myVideo").css("display","block");
			myVideo.play();
		},500);	
	});

	selectIcon.on("click",function(){
		$(".selectPhoto").css("display","none");
		myVideo.play();
	});

	answerBtn.on("click",function(){
		$(".phoneCall").css("display","none");
		myAudio.pause();
		$("#myVideo").css("display","block");
		myVideo.play();
	});
	//视频结束
	myVideo.addEventListener("ended",function() { 
	    $("#myVideo").css("display","none");
		shareIndex.css("display","block");
		
	});
	//分享
    $(".shareForward").on("click",function(){
        $(".goshare_wrap").css("display","block");
    });
    //分享层
    $(".goshare_wrap").on("click",function(){
        $(".goshare_wrap").css("display","none");
    });
    //大赛究竟怎么玩
    $(".shareGoto").on("click",function(){    
        window.location.href = "http://e.vhall.com/949123679";
    });
    //再次观看
    $(".shareReplay").on("click",function(){    
        window.location.href = location.href+'?time='+((new Date()).getTime());
    });

}

// function onBridgeReady(){
// 	document.getElementById('myAudioNext').src="assets/media/phonecall.mp3";
//     document.getElementById('myAudio').src="assets/media/slient.mp3";
//     document.getElementById('myVideo').src="assets/media/myVideo.mp4";
//     if($.os.ios) {
// 		document.getElementById('myVideo').src="assets/media/myVideoIos.mp4";
// 	}
//  	document.getElementById('myAudioNext').load();
//     document.getElementById('myAudio').load();
//     document.getElementById('myVideo').load();
// }
//滑动出现
function loop(){ 
    var loops=setTimeout(loop,50);
    if(myVideo.currentTime>5){
        myVideo.pause();
        $('.slide').css("display","block");
        slide.slideToUnlock({
			successFunc:videoPlay
		},myAudio);
		clearTimeout(loops);
		var loops1=setTimeout(loop1,50);
    }
}
//选择表情包出现
function loop1(){ 
    var loops1=setTimeout(loop1,50);
    if(myVideo.currentTime>68){
    	myVideo.pause();
    	$(".selectPhoto").css("display","block");
        myVideo.pause();
        clearTimeout(loops1); 
        var loops2=setTimeout(loop2,50);
	}
}
//来电出现
function loop2(){ 
    var loops2=setTimeout(loop2,50);
    if(myVideo.currentTime>88){
    	myVideo.pause();
    	$(".phoneCall").css("display","block");
    	$("#myVideo").css("display","none");
        myVideo.pause();
        myAudio.play();
        clearTimeout(loops2); 
	}
}
//滑动回调
function videoPlay(){
	$('.slide').css("display","none");
	$("#myVideo").css("display","block");
	document.getElementById("myVideo").play();
}
});