function hide(e){var t=(e.id.toString(),window.getComputedStyle(e).getPropertyValue("display"));dispValue={prop:t},e.style.display="none"}function show(e){e.style.display&&"none"!=e.style.display||(dispValue[e.id.toString()]&&"none"!=dispValue[e.id.toString()]?e.style.display=dispValue[e.id.toString()]:e.style.display="block")}function css(e,t){for(var n in t)e.style[n]=t[n]}function arrowfunc(){var e,t;0===arrowvar?(window.innerWidth>800?(e="35vw",t="80%"):(e="88vw",t="98%"),Velocity(document.getElementById("extra"),{translateY:"0",width:t,height:e,borderRadius:"4px"},500),Velocity(document.getElementById("arrowCircle"),{rotateZ:"180deg"},500),setTimeout(function(){document.getElementById("extra").classList.add("extra"),menushrink(),Velocity(document.getElementById("extraContent"),{opacity:"1"},500),Velocity(document.body,"scroll",{offset:document.getElementById("extra").getBoundingClientRect().top.toString()+"px",mobileHA:!1,duration:500}),Velocity(document.getElementById("charts"),"fadeIn",500)},500),arrowvar=1):(menuswitch2=2,menushrink(),Velocity(document.body,"scroll",500),setTimeout(function(){menuswitch2=0,document.getElementById("extra").classList.remove("extra"),window.innerWidth>800?(e="4vw",t="4vw"):(e="10vw",t="10vw"),Velocity(document.getElementById("extra"),{translateY:"-4vw",width:t,height:e,borderRadius:"5vw"},500),1===chartswitch&&chartbutton(),hide(document.getElementById("charts")),Velocity(document.getElementById("arrowCircle"),{rotateZ:"0deg"},500),Velocity(document.getElementById("extraContent"),{opacity:"0"},500)},500),arrowvar=0)}function menubuttonfunc(){0===menuswitch1?showmenu():hidemenu()}function showmenu(){loc=window.pageYOffset,setTimeout(function(){css(document.getElementById("mainPage"),{overflow:"hidden"}),css(document.getElementById("contents"),{position:"absolute"}),menuswitch1=1},500),menuswitch2=1,menushrink(),Velocity(document.querySelector("#buttonBig hr:nth-child(1)"),{translateY:"7px"},{duration:250,easing:"linear"}),Velocity(document.querySelector("#buttonBig hr:nth-child(1)"),{rotateZ:"45deg"},{duration:250,delay:260,easing:"linear"}),Velocity(document.querySelector("#buttonBig hr:nth-child(2)"),{opacity:"0"},{duration:250,easing:"linear"}),Velocity(document.querySelector("#buttonBig hr:nth-child(3)"),{translateY:"-7px"},{duration:250,easing:"linear"}),Velocity(document.querySelector("#buttonBig hr:nth-child(3)"),{rotateZ:"-45deg"},{duration:250,delay:260,easing:"linear"}),css(document.getElementById("contents"),{position:"fixed"}),Velocity(document.getElementById("contents"),"fadeIn",750),Velocity(document.getElementById("bg1"),"slideDown",500),Velocity(document.getElementById("buttonBig"),{backgroundColor:"rgba(0,0,0,0.5)"},500),clearInterval(intervalId)}function hidemenu(){setTimeout(function(){menuswitch1=0},500),menuswitch2=0,Velocity(document.querySelector("#buttonBig hr:nth-child(1)"),{rotateZ:"0deg"},{duration:250,easing:"linear"}),Velocity(document.querySelector("#buttonBig hr:nth-child(1)"),{translateX:"0",translateY:"0"},{duration:250,delay:260,easing:"linear"}),Velocity(document.querySelector("#buttonBig hr:nth-child(2)"),{opacity:"1"},{duration:250,delay:260,easing:"linear"}),Velocity(document.querySelector("#buttonBig hr:nth-child(3)"),{rotateZ:"0deg"},{duration:250,easing:"linear"}),Velocity(document.querySelector("#buttonBig hr:nth-child(3)"),{translateX:"0px",translateY:"0dpx"},{duration:250,delay:260,easing:"linear"}),Velocity(document.getElementById("contents"),"fadeOut",250);for(var e=0,t=document.querySelectorAll("#contents,#bg1");e<t.length;e++)Velocity(t[e],"slideUp",500);Velocity(document.getElementById("buttonBig"),{backgroundColor:"transparent"},500),nav("hide",null),css(document.getElementById("mainPage"),{overflow:"visible"}),window.scrollTo(0,loc),intervalId=setInterval(live.all,1e3),menushrink()}function menushrink(){if(0===menuswitch2){var e=window.innerHeight/5;60>e&&(e=60),window.pageYOffset>=e?css(document.getElementById("menu"),{position:"fixed",height:"10%"}):css(document.getElementById("menu"),{position:"absolute",height:"30%"}),css(document.getElementById("logo2"),{position:"fixed"}),window.pageYOffset>=logopos?(hide(document.getElementById("logo")),show(document.getElementById("logo2"))):(hide(document.getElementById("logo2")),show(document.getElementById("logo")))}else 1===menuswitch2?(css(document.getElementById("menu"),{position:"fixed",height:"10%"}),hide(document.getElementById("logo")),show(document.getElementById("logo2"))):2===menuswitch2&&(css(document.getElementById("menu"),{position:"absolute",height:"30%"}),hide(document.getElementById("logo2")),show(document.getElementById("logo")),css(document.getElementById("menu"),{transition:"height 0.5s linear"}),setTimeout(function(){css(document.getElementById("menu"),{transition:"all 0s"})}))}function nav(e,t){if("show"==e)"help"==t?0===help?(Velocity(document.getElementById("help"),"slideDown",1e3),Velocity(document.getElementById("menuHelp"),{color:"black",backgroundColor:"rgba(0,0,0,0.1)",fontWeight:"900"},1e3),help=1):(Velocity(document.getElementById("help"),"slideUp",1e3),Velocity(document.getElementById("menuHelp"),{color:"grey",backgroundColor:"white",fontWeight:"100"},1e3),setTimeout(function(){help=0},1e3)):"about"==t?0===about?(Velocity(document.getElementById("about"),"slideDown",1e3),Velocity(document.getElementById("menuAbout"),{color:"black",backgroundColor:"rgba(0,0,0,0.1)",fontWeight:"900"},1e3),about=1):(Velocity(document.getElementById("about"),"slideUp",1e3),Velocity(document.getElementById("menuAbout"),{color:"grey",backgroundColor:"white",fontWeight:"100"},1e3),setTimeout(function(){about=0},1e3)):0===embed?(Velocity(document.getElementById("embed"),"slideDown",1e3),Velocity(document.getElementById("menuEmbed"),{color:"black",backgroundColor:"rgba(0,0,0,0.1)",fontWeight:"900"},1e3),embed=1):(Velocity(document.getElementById("embed"),"slideUp",1e3),Velocity(document.getElementById("menuEmbed"),{color:"grey",backgroundColor:"white",fontWeight:"100"},1e3),setTimeout(function(){embed=0},1e3));else{for(var n=0,o=document.querySelectorAll("#about,#help,#embed");n<o.length;n++)hide(o[n]);for(var n=0,o=document.querySelectorAll("#menuAbout,#menuHelp,#menuEmbed");n<o.length;n++)css(o[n],{color:"grey","background-color":"white","font-weight":"100"});help=0,about=0,embed=0}}function trigenter(e){13===e.keyCode&&(input.receive(),input.check(refresh.all))}function linkshare(){Velocity(document.getElementById("pageUrl"),"fadeIn"),Velocity(document.getElementById("bg2"),"fadeIn")}function chartbutton(){0===firstload?(document.getElementById("showchart").innerHTML="LOADING...",rudi.getScript("https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.0.2/Chart.min.js",0,0,function(){firstload=1,chartbutton()})):0===chartswitch?(isChart=1,Velocity(document.getElementById("charts"),{height:"40vh"},500),hide(document.getElementById("showchart")),Velocity(document.getElementById("hidechart"),"fadeIn",500),show(document.getElementById("myChart-wrapper")),chartswitch=1):(document.getElementById("showchart").innerHTML="SHOW TREND",live.myLineChart.destroy(),Velocity(document.getElementById("charts"),{height:"15vh"},500),Velocity(document.getElementById("showchart"),"fadeIn",500),hide(document.getElementById("hidechart")),hide(document.getElementById("myChart-wrapper")),chartswitch=0,isChart=0)}for(var images=document.getElementsByTagName("img"),pl=0;pl<images.length;pl++)!images[pl].src&&images[pl].id&&"instruct"!=images[pl].id&&(images[pl].src="/images/"+images[pl].id+".png");!function(){function e(e){var t="focus"===e.type?"focusin":"focusout",n=new CustomEvent(t,{bubbles:!0,cancelable:!1});n.c1Generated=!0,e.target.dispatchEvent(n)}function t(n){n.c1Generated||(o.removeEventListener("focus",e,!0),o.removeEventListener("blur",e,!0),o.removeEventListener("focusin",t,!0),o.removeEventListener("focusout",t,!0)),setTimeout(function(){o.removeEventListener("focusin",t,!0),o.removeEventListener("focusout",t,!0)})}var n=window,o=n.document;void 0===n.onfocusin&&(o.addEventListener("focus",e,!0),o.addEventListener("blur",e,!0),o.addEventListener("focusin",t,!0),o.addEventListener("focusout",t,!0))}();var dispValue,extraState=0;window.addEventListener("resize",function(){0===arrowvar?window.innerWidth>800?1!==extraState&&(css(document.getElementById("extra"),{width:"4vw",height:"4vw"}),extraState=1):2!==extraState&&(css(document.getElementById("extra"),{width:"10vw",height:"10vw"}),extraState=2):window.innerWidth>800?3!==extraState&&(css(document.getElementById("extra"),{width:"80%",height:"35vw"}),extraState=3):4!==extraState&&(css(document.getElementById("extra"),{width:"98%",height:"88vw"}),extraState=4)}),document.getElementById("instruct").src="/images/instruct.png",(window.top!==window.self||window.top.location!=window.self.location||"youcount.github.io"!=window.location.hostname||"youcount.github.io"!=window.top.location.hostname)&&(window.top.location=window.self.location),"https:"!=window.location.protocol&&(window.location.href="https:"+window.location.href.substring(window.location.protocol.length));var emailParts=["manas.khurana20","gmail","com","&#46;","&#64;"];document.getElementById("email").innerHTML=emailParts[0]+emailParts[4]+emailParts[1]+emailParts[3]+emailParts[2],document.getElementById("email").href="mailto:"+document.getElementById("email").innerHTML,document.getElementById("buttonBig").addEventListener("click",function(){menubuttonfunc()}),document.getElementById("fb").addEventListener("click",function(){window.open("https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(document.querySelector("#pageUrl input").getAttribute("value")),"_blank")}),document.getElementById("tw").addEventListener("click",function(){window.open("https://twitter.com/share?text="+document.getElementById("username").value+" now has "+live.actualCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")+" subscribers!&url="+encodeURIComponent(document.querySelector("#pageUrl input").getAttribute("value"))+"&hashtags=YouCount","_blank")}),document.getElementById("lnkdIn").addEventListener("click",function(){window.open("https://www.linkedin.com/shareArticle?mini=true&url="+encodeURIComponent(document.querySelector("#pageUrl input").getAttribute("value"))+"&title="+encodeURIComponent(channelname)+"'s%20Live%20Subscriber%20Count&source=YouCount","_blank")}),document.getElementById("tb").addEventListener("click",function(){window.open("http://www.tumblr.com/share/link?url="+encodeURIComponent(document.querySelector("#pageUrl input").getAttribute("value")),"_blank")}),document.getElementById("rdit").addEventListener("click",function(){window.open("http://www.reddit.com/submit?url="+encodeURIComponent(document.querySelector("#pageUrl input").getAttribute("value"))+"&title="+encodeURIComponent(channelname)+"'s%20Live%20Subscriber%20Count","_blank")}),document.getElementById("link").addEventListener("click",function(){linkshare()});for(var i=0,x=document.querySelectorAll("#menuHelp,#menuAbout,#menuEmbed");i<x.length;i++)x[i].addEventListener("click",function(){nav("show",this.className)});document.querySelector("#input button").addEventListener("click",function(){input.receive(),input.check(refresh.all)}),document.getElementById("bg2").addEventListener("click",function(){Velocity(document.getElementById("pageUrl"),"fadeOut"),hide(document.getElementById("bg2"))});for(var i=0,x=document.querySelectorAll(".suggest");i<x.length;i++)x[i].addEventListener("click",function(){username=this.dataset.id;var e="https://www.googleapis.com/youtube/v3/channels?part=snippet&id="+this.dataset.id+"&fields=items/snippet&key="+rudi.getKey();rudi.getText(e,function(e){rudi.changeText(document.querySelector("#username"),e.items[0].snippet.title),input.receive(),refresh.all(e.items[0].snippet)})});document.getElementById("arrowCircle").addEventListener("click",function(){arrowfunc()});for(var i=0,x=document.querySelectorAll("#logo,#logo2");i<x.length;i++)x[i].addEventListener("click",function(){rudi.getUsername(),input.check(refresh.all)});for(var i=0,x=document.querySelectorAll("#showchart,#hidechart");i<x.length;i++)x[i].addEventListener("click",function(){chartbutton()});var shareswitch=0;document.getElementById("shareLi").addEventListener("click",function(){if(0===shareswitch){css(document.getElementById("sharebox"),{height:"auto"});for(var e=0,t=document.querySelectorAll("#sharebox li");e<t.length;e++)"shareLi"!=t[e].id&&Velocity(t[e],"fadeIn",200);shareswitch=3}else{css(document.getElementById("sharebox"),{height:"10vh"});for(var e=0,t=document.querySelectorAll("#sharebox li");e<t.length;e++)"shareLi"!=t[e].id&&Velocity(t[e],"fadeOut",200);setTimeout(function(){shareswitch=0},200)}}),document.getElementsByTagName("body")[0].addEventListener("click",function(){if(0!==shareswitch&&(--shareswitch,1==shareswitch)){css(document.getElementById("sharebox"),{height:"10vh"});for(var e=0,t=document.querySelectorAll("#sharebox li");e<t.length;e++)"shareLi"!=t[e].id&&Velocity(t[e],"fadeOut",200);setTimeout(function(){shareswitch=0},200)}}),document.getElementById("username").addEventListener("focusin",function(){document.getElementById("input").style.backgroundColor="rgba(255,0,0,0.4)",Velocity(document.querySelector("#input button"),"fadeIn",250),document.querySelector("#username").select()}),document.getElementById("username").addEventListener("focusout",function(){document.getElementById("input").style.backgroundColor="rgba(0,0,0,0.3)",Velocity(document.getElementById("suggest"),"fadeOut",{duration:250,complete:function(e){document.getElementById("suggest").style.opacity="1"}}),Velocity(document.querySelector("#input button"),"fadeOut",250)}),document.getElementById("username").addEventListener("keyup",function(){var e=document.getElementById("username").value;return e.trim()&&"Not Found!"!=e.trim()&&"Loading..."!=e.trim()?(show(document.getElementById("suggest")),void rudi.getText("https://www.googleapis.com/youtube/v3/search?part=snippet&q="+encodeURIComponent(e)+"&type=channel&maxResults=5&relevanceLanguage=en&key="+rudi.getKey(),function(e){if(!(e.pageInfo.totalResults<1))for(var t=document.querySelectorAll(".suggest"),n=0;5>n;n++)try{show(t[n]),t[n].dataset.id=e.items[n].snippet.channelId.trim(),document.querySelectorAll(".suggest div")[n].textContent=e.items[n].snippet.title,document.querySelectorAll(".suggestImg")[n].src=e.items[n].snippet.thumbnails["default"].url}catch(o){hide(t[n])}})):void hide(document.getElementById("suggest"))});var arrowvar=0,menuswitch1=0,menuswitch2=0,loc,menushrinkvar=0;setInterval(function(){1===menushrinkvar&&(menushrinkvar=0,menushrink())},100);var logopos=document.getElementById("logo").getBoundingClientRect().top;window.addEventListener("scroll",function(){menushrinkvar=1}),menushrink();var help=0,about=0,embed=0,chartswitch=0,firstload=0;