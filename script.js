//just to ensure that the correct page is loaded iframe and http is checked again
if (window.top !== window.self || window.top.location != window.self.location || window.location.hostname !='youcount.github.io' || window.top.location.hostname != 'youcount.github.io')
window.top.location = window.self.location;
if(window.location.protocol != "https:")
window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);

//this is to hide email from spam bots
var emailParts = ["manas.khurana20", "gmail", "com", "&#46;", "&#64;"];
document.getElementById('email').innerHTML = emailParts[0] + emailParts[4] + emailParts[1] + emailParts[3] + emailParts[2];
document.getElementById('email').href = "mailto:" + document.getElementById('email').innerHTML;

//below, the elements are assigned their onclicks.
$('#buttonBig').on("click", function() {
	menubuttonfunc();
});
$('#fb').on("click", function() {
	window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(document.querySelector('#pageUrl input').getAttribute("value")), '_blank');
});
$('#tw').on("click", function() {
	window.open('https://twitter.com/share?text=' + document.getElementById('username').value + ' now has ' + actualCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' subscribers!&url=' + encodeURIComponent(document.querySelector('#pageUrl input').getAttribute("value")) + '&hashtags=YouCount', '_blank');
});
$('#lnkdIn').on("click", function() {
	window.open('https://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(document.querySelector('#pageUrl input').getAttribute("value")) + '&title=' + encodeURIComponent(channelname) + '\'s%20Live%20Subscriber%20Count&source=YouCount', '_blank');
});
$('#tb').on("click", function() {
	window.open('http://www.tumblr.com/share/link?url=' + encodeURIComponent(document.querySelector('#pageUrl input').getAttribute("value")), '_blank');
});
$('#rdit').on("click", function() {
	window.open('http://www.reddit.com/submit?url=' + encodeURIComponent(document.querySelector('#pageUrl input').getAttribute("value")) + '&title=' + encodeURIComponent(channelname) + '\'s%20Live%20Subscriber%20Count', '_blank');
});
$('#link').on("click", function() {
	linkshare();
});
$('#menuHelp,#menuAbout,#menuEmbed').on("click", function() {
	nav('show', this.className);
});
$('#input button').on("click", function() {
	getValue();
});
$('.suggest').on("click", function() {
	username = this.dataset.id;
	rawInput= this.dataset.id;
	var url = "https://www.googleapis.com/youtube/v3/channels?part=snippet&id=" + this.dataset.id + "&fields=items/snippet&key=" + getKey();
	getText(url, function(e) {
		//set channel name in input box and title
		channelname = e.items[0].snippet.title;
		document.title = channelname + "'s YouTube Live Subscriber Count - YouCount";
		changeText(document.querySelector("#username"), channelname);
		
		//resetting charts so it loads again.
		if(isChart===2){
			isChart = 1;
		}
		//running live manually to get updated info immediately
		live();
		
		//set date of starting youtube with months in text (jan, feb, etc)
		var pubDate = e.items[0].snippet.publishedAt.split("T")[0];
		pubDate = pubDate.split("-");
		if(pubDate[1]=='01')pubDate[1]='Jan'; else if(pubDate[1]=='02')pubDate[1]='Feb'; else if(pubDate[1]=='03')pubDate[1]='Mar'; else if(pubDate[1]=='04')pubDate[1]='Apr'; else if(pubDate[1]=='05')pubDate[1]='May'; else if(pubDate[1]=='06')pubDate[1]='Jun'; else if(pubDate[1]=='07')pubDate[1]='Jul'; else if(pubDate[1]=='08')pubDate[1]='Aug'; else if(pubDate[1]=='09')pubDate[1]='Sep'; else if(pubDate[1]=='10')pubDate[1]='Oct'; else if(pubDate[1]=='11')pubDate[1]='Nov'; else if(pubDate[1]=='12')pubDate[1]='Dec';
		changeText(document.getElementById('pubDate'), pubDate[2] + '-' + pubDate[1] + '-' + pubDate[0]);
		
		//set profile picture of channel
		document.getElementById("dp").src = e.items[0].snippet.thumbnails.default.url;
		
		if(popstatevar == 1) {
			var urlCandidate, urlFinalName;
			if(e.items[0].snippet.customUrl) {
				urlCandidate =  e.items[0].snippet.customUrl.trim();
			} else {
				urlCandidate =  channelname.trim().replace(/\s+/g, '+');
			}
			var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + encodeURIComponent(urlCandidate) + "&type=channel&maxResults=1&key=" + getKey();
			getText(url, function(f) {
				if((f.pageInfo.totalResults < 1) || (f.items[0].snippet.channelId.trim() != username)){
					urlFinalName = username;
				} else {
					urlFinalName = urlCandidate;
				}
				history.pushState(null, null, "#!/" + urlFinalName);
				//also sets iframe src url for embedding and url for sharing.
				changeText(document.getElementById('embedUrl'), '<iframe src="https://youcount.github.io/e/#!/' + urlFinalName + '" height="100" width="250" frameborder="0"></iframe>');
				changeText(document.querySelector('#pageUrl input'), 'https://youcount.github.io/#!/' + urlFinalName);
			});
		}
		popstatevar = 1;//resetting of popstatevar
		var url2 = "https://www.googleapis.com/youtube/v3/channels?part=statistics&id=" + username + "&fields=items/statistics&key=" + getKey();
		getText(url2, function(e) {
			changeText(document.getElementById("totalVideos"), e.items[0].statistics.videoCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
			changeText(document.getElementById("totalViews"), e.items[0].statistics.viewCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
		});
	});
});
$('#logo').on("click", function() {
	rawInput = preSelect[Math.floor(Math.random() * preSelect.length)];
	queryName();
});
$('#showextra,#hideextra').on("click", function() {
	extrabutton();
});
//these 2 functions give the share button its clicking function. if the button is clicked, the sharing features are shown, next time, they are hidden. The function after that checks if sharing features are being shown. If they are, it hides them whenever the body is clicked.
var shareswitch = 0;
$("#share").on("click", function() {
	if(shareswitch === 0) {
		$("#fb,#tw,#lnkdIn,#tb,#rdit,#link").fadeIn(200);
		shareswitch = 3;
	} else {
		$("#fb,#tw,#lnkdIn,#tb,#rdit,#link").fadeOut(200);
		setTimeout(function() {
			shareswitch = 0;
		}, 200);
	}
});
$("body").on("click", function() {
	if(shareswitch !== 0) {
		--shareswitch;
		if(shareswitch == 1) {
			$("#fb,#tw,#lnkdIn,#tb,#rdit,#link").fadeOut(200);
			setTimeout(function() {
				shareswitch = 0;
			}, 200);
		}
	}
});
//this thing gives the search box it's effects (material design thing + fading in search button) when it is clicked or focussed upon and effectively hides them as well.
$("#username").focusin(function() {
	$("#input").css({
		"background-color": "rgba(255,0,0,0.4)"
	});
	$("#input button").fadeIn(250);
	$("#username").select();
});
$("#username").focusout(function() {
	$("#input").css({
		"background-color": "rgba(0,0,0,0.3)"
	});
	$("#input button, #suggest").fadeOut(250);
});
$("#username").on( "keyup",
function(){
		var value = document.getElementById('username').value;
	if(!value.trim()){
		$("#suggest").hide();
		return;
	} else {
		$("#suggest").show();
	}
	if(value.trim() == "Not Found!" || value.trim() == "Loading...")
		return;
	getText("https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + encodeURIComponent(value) + "&type=channel&maxResults=5&relevanceLanguage=en&key=" + getKey(),
	function(e) {
		if(e.pageInfo.totalResults < 1) {//if no result found, return
			return;
		}//else
		//show results in suggestions
		for(var x=0;x<5;x++){
			try {
				document.querySelectorAll(".suggest")[x].style.display="block";
				document.querySelectorAll(".suggest")[x].dataset.id = e.items[x].snippet.channelId.trim();	
				document.querySelectorAll(".suggest div")[x].textContent=e.items[x].snippet.title;
				document.querySelectorAll(".suggestImg")[x].src = e.items[x].snippet.thumbnails.default.url;
			} catch(error){
				document.querySelectorAll(".suggest")[x].style.display="none";
			}
		}
	});
});

//these 3 functions below store the y-axis location of the page (where it has been scrolled) then slide down the menu, set overflowing content in the main thing to hidden (so this menu thing can work properly) and do the vice versa as well
var menuswitch1 = 0, menuswitch2 = 0;
var loc;

function menubuttonfunc() {
	if(menuswitch1 === 0) {
		showmenu();
	} else {
		hidemenu();
	}
}

function showmenu() {
	loc = $("#buttonBig").offset().top;
	setTimeout(function() {
		$("#mainPage").css({
			"overflow": "hidden"
		});
		$("#contents").css({
			"position": "absolute"
		});
		menuswitch1 = 1;
	}, 500);
	menuswitch2 = 1;
	$("#buttonBig").addClass("cross");
	$("#contents").css({
		"position": "fixed"
	});
	$('#contents').fadeIn(750);
	$('#bg1').slideDown(500);
	$("#buttonBig").css({
		"background-color": "rgba(0,0,0,0.5)"
	});
}

function hidemenu() {
	setTimeout(function() {
		menuswitch1 = 0;
	}, 500);
	menuswitch2 = 0;
	$("#buttonBig").removeClass("cross");
	$('#contents').fadeOut(250);
	$('#contents,#bg1').slideUp(500);
	$("#buttonBig").css({
		"background-color": "transparent"
	});
	nav("hide", null);
	$("#mainPage").css({
		"overflow": "visible"
	});
	window.scrollTo(0, loc);
}

//nav shows and hides the pages in the menu. the last 'else' hides every page and is called when menu is closed
var articleStates = [0,0,0];

function nav(func, page) {
	if(func == "show") {
		var articles = ["#help","#about","#embed"], lis = ["#menuHelp","#menuAbout","#menuEmbed"];
		page = Number(page[1]);
		if(articleStates[page]==0){
			$(articles[page]).slideDown(1000);
			$(lis[page]).css({
				'color': 'black',
				'background-color': 'rgba(0,0,0,0.1)',
				'font-weight': '900'
			});
			articleStates[page]=1;
		} else {
			$(articles[page]).slideUp(1000);
			$(lis[page]).css({
				'color': 'grey',
				'background-color': 'white',
				'font-weight': '100'
			});
			articleStates[page]=0;
		}
	} else {
		$("#about,#help,#embed").hide();
		$("#menuAbout,#menuHelp,#menuEmbed").css({
			'color': 'grey',
			'background-color': 'white',
			'font-weight': '100'
		});
		articleStates = [0,0,0];
	}
}

//this allows inputting of value using enter.
function trigenter(e) {
	if(e.keyCode === 13) {
		getValue();
	}
}

//this shows/hides the sharable link of the page.
function linkshare() {
	$("#pageUrl").fadeIn();
	$("#bg2").fadeIn();
	$("#bg2").on("click", function() {
		$("#pageUrl").fadeOut();
		$("#bg2").hide();
		$("bg2").off("click");
	});
}
var views = [];
for(var l=0;l<50;l++)views[l]=50-l;
function pushViews(url,i,auto) {
	getText(url, function(e) {
		views[i] = e.items[0].statistics.viewCount;
		if(auto=="auto"&&i==((vids*2)-1))upCharts();
	});
}
//this is used to show/hide the chart. if the chart is loading for the first time (ie firstload=0) first the script of chart is downloaded and then it is loaded. 
var extraswitch = 0,
	myLineChart2,
	myLineChart3,
	vids=5;
function extrabutton() {
	if(firstload === 0) {
		$("#showextra").html("LOADING...");
		var reqType = (username.length >= 24 && username.substr(0, 2).toUpperCase() == "UC") ? "id" : "forUsername";
		var url = "https://www.googleapis.com/youtube/v3/channels?part=contentDetails&" + reqType + "=" + username + "&fields=items/contentDetails/relatedPlaylists/uploads&key=" + getKey();
		getText(url, function(e) {
			var url = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=" + e.items[0].contentDetails.relatedPlaylists.uploads + "&maxResults=50&fields=items/snippet/resourceId/videoId&key=" + getKey();
			getText(url, function(e) {
				for(var i=0; e.items[i]; i++){
					var url = "https://www.googleapis.com/youtube/v3/videos?part=statistics&id=" + e.items[i].snippet.resourceId.videoId + "&fields=items/statistics/viewCount&key=" + getKey();
					pushViews(url,i);
				}
				$.getScript("https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.js", function() {
					isChart = 1;
					$("#extra").removeClass("extraCol");
					$("#extra").addClass("extraExp");
					$("#showextra").fadeOut();
					$("#hideextra").fadeIn();
					extraswitch = 1;
					
					var data1=[],labels1=[];
					for(var i=0;i<vids;i++){data1[i]=views[i];labels1[i]='';}	
					var myLineChart2Data = {
						labels: labels1,
						datasets: [{
							label: "Views of last " + vids + " videos",
							fill:false,
							borderColor: "rgba(255,50,50,0.5)",
							pointBorderColor: "rgba(255,50,50,0.5)",
							pointBackgroundColor:"rgba(255,50,50,1)",
							data: data1
						}]
					};
					myLineChart2 = new Chart(document.getElementById("myChart2").getContext("2d"), {
						type:"line",
						data: myLineChart2Data, 
						gridLines:{display: false},
						responsive: true,
						maintainAspectRatio: false
					});
					var totviews = [(function(){var tot=0;for(var i=0;i<vids;i++)tot+=Number(views[i]);return tot;})(),(function(){var tot=0;for(var i=vids;i<(vids*2);i++)tot+=Number(views[i]);return tot;})()],
					data2 = [Math.floor(totviews[0]/vids),Math.floor(totviews[1]/vids)],
					labels2 = ["last "+vids+" videos","last to last "+vids+" videos"],
					myLineChart3Data = {
						labels: labels2,
						datasets: [{
							label: "Average Views",
							borderColor: ["rgba(0,0,255,1)","rgba(0,255,0,1)"],
							backgroundColor:["rgba(50,50,255,0.2)","rgba(50,255,50,0.2)"],
							hoverBackgroundColor:["rgba(0,0,255,1)","rgba(0,255,0,1)"],
							data: data2
						}]
					};
					myLineChart3 = new Chart(document.getElementById("myChart3").getContext("2d"), {
						type:"bar",
						data: myLineChart3Data, 
						gridLines:{display: false},
						responsive: true,
						maintainAspectRatio: false
					});
					var data3 = [totviews[0],totviews[1]],
					labels3 = ["last "+vids+" videos (total views)","last to last "+vids+" videos (total views)"],
					myLineChart4Data = {
						labels: labels3,
						datasets: [{
							label: "Total Views",
							borderColor: ["rgba(0,0,255,1)","rgba(0,255,0,1)"],
							backgroundColor:["rgba(50,50,255,0.2)","rgba(50,255,50,0.2)"],
							hoverBackgroundColor:["rgba(0,0,255,1)","rgba(0,255,0,1)"],
							data: data3
						}]
					};
					myLineChart4 = new Chart(document.getElementById("myChart4").getContext("2d"), {
						type:"doughnut",
						data: myLineChart4Data, 
						gridLines:{display: false},
						responsive: true,
						maintainAspectRatio: false
					});
					changeText(document.getElementById('pubDate'), channeldate);
					var url2 = "https://www.googleapis.com/youtube/v3/channels?part=statistics&" + reqType + "=" + username + "&fields=items/statistics(videoCount,viewCount)&key=" + getKey();
					getText(url2, function(e) {
						changeText(document.getElementById("totalVideos"), e.items[0].statistics.videoCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
						changeText(document.getElementById("totalViews"), e.items[0].statistics.viewCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
					});
				});
			});
		});
		$("#extraContent").fadeTo("fast",1);
		$("#charts").fadeIn(500);
		firstload = 1;
	} else {
		$("#showextra").html("SHOW STATS");
		if(extraswitch === 0) {
			isChart = 1;
			$("#extra").removeClass("extraCol");
			$("#extra").addClass("extraExp");
			$("#showextra").fadeOut();
			$("#hideextra").fadeIn();
			$("#extraContent").fadeTo("fast",1);
			extraswitch = 1;
		} else {
			myLineChart1.destroy();
			$("#extra").removeClass("extraExp");
			$("#extra").addClass("extraCol");
			$("#showextra").fadeIn();
			$("#hideextra").fadeOut(100);
			$("#extraContent").fadeTo(0,0);
			extraswitch = 0;
			isChart = 0;
		}
	}
}

function upCharts() {
	if(Number($("#vids").val())>25)return;
	vids = Number($("#vids").val());
	var sum1=0,sum2=0;
	for(var i=0;i<vids;i++){
		myLineChart2.data.labels[i]='';
		myLineChart2.data.datasets[0].data[i]=views[i];
		sum1+=Number(views[i]);
	}
	for(i=vids;i<(vids*2);i++)sum2+=Number(views[i]);
	myLineChart2.data.labels.splice(vids);
	myLineChart2.data.datasets[0].data.splice(vids);
	myLineChart2.data.datasets[0].label = "Views of last " + vids + " videos";
	
	myLineChart3.data.labels= ["last "+vids+" videos","last to last "+vids+" videos"];
	myLineChart3.data.datasets[0].data[0] = Math.floor(sum1/vids);
	myLineChart3.data.datasets[0].data[1] = Math.floor(sum2/vids);
	
	myLineChart4.data.labels= ["last "+vids+" videos (total views)","last to last "+vids+" videos (total views)"];
	myLineChart4.data.datasets[0].data[0] = sum1;
	myLineChart4.data.datasets[0].data[1] = sum2;
	
	myLineChart2.update();
	myLineChart3.update();
	myLineChart4.update();
}

//images are loaded after the whole page is loaded (since it has a big download size and sends multiple requests).
var images = document.getElementsByTagName("img");
for(var pl=0;pl<images.length;pl++){
	if(!images[pl].src && images[pl].id && images[pl].id!="instruct"){
		images[pl].src = '/images/' + images[pl].id + '.png';
	}
}
document.getElementById("instruct").src="/images/instruct.png";