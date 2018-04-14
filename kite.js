var windspeed1='',
	windspeed2='',
	windspeed3='',
	windspeed4='',
	windspeed5=''


	$.get({
		url: "https://foweexlbzi.execute-api.ap-southeast-2.amazonaws.com/Stage/wind",
		async: false,
		timeout: 7000,
		error: function(){
						console.log("no wind data");
						return true;
				},
		success: function(responseData,status) {

		var wind=JSON.parse(responseData);
		//console.log('wind',wind);

	 windspeed1=wind[0]+" "+wind[1]+"~"+wind[2]+wind[3];
	 windspeed2=wind[4]+" "+wind[5]+"~"+wind[6]+wind[7];
	 windspeed3=wind[8]+" "+wind[9]+"~"+wind[10]+wind[11];
	 windspeed4=wind[12]+" "+wind[13]+"~"+wind[14]+wind[15];
	 windspeed5=wind[16]+" "+wind[17]+"~"+wind[18]+wind[19];
	 windspeed1 = windspeed1.split("/");
	 windspeed2 = windspeed2.split("/");
	 windspeed3 = windspeed3.split("/");
	 windspeed4 = windspeed4.split("/");
	 windspeed5 = windspeed5.split("/");
	 document.getElementById("replace").innerHTML = "Day "+windspeed1[0]+"<br><br>"+windspeed1[1]+"<br><br>"+windspeed2[1]+"<br><br>"+windspeed3[1]+"<br><br>"+windspeed4[1]+"<br><br>"+windspeed5[1];

}});

window.addEventListener('resize', resize, false);
//canvas init
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var W = window.innerWidth;
var H = window.innerHeight;
var myintervalid;


function resize() {
	clearInterval(myintervalid);

	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	W = window.innerWidth;
	H = window.innerHeight;

	console.log('resized',W,H);
	bubbles();
}

function bubbles() {

	//canvas dimensions

	canvas.width = W;
	canvas.height = H;


	//drink bubbles
	var mp = 250,
	airbubbles = [],
	x=0,
	y=0,
	r=0,
	d=0,
	p=0,
	angle=0


	for(var i = 0; i < mp; i++)
	{
		airbubbles.push({
			x: Math.random()*W, //x-coordinate
			y: Math.random()*H, //y-coordinate
			r: Math.random()*5+1, //radius
			d: Math.random()*mp //density
		})
	}
	console.log ('bubbles');

	//Lets draw the flakes
	function draw()
	{
		ctx.clearRect(0, 0, W, H);

		ctx.fillStyle = "rgba(0,0,0,.2)";
		ctx.beginPath();
		for(var i = 0; i < mp; i++)
		{
			var p = airbubbles[i];
			ctx.moveTo(p.x, p.y);
			ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
		}
		ctx.fill();
		update();
	}


	var angle = 0;
	function update()
	{
		//angle += 0.01;
		for(var i = 0; i < mp; i++)
		{
			var p = airbubbles[i];

			p.y += Math.cos(angle+p.d) - 1 - p.r/2;
			if(p.x > W+5 || p.x < -5 || p.y < 0)
			{

					airbubbles[i] = {x: Math.random()*W, y: H, r: p.r, d: p.d};

			}
		}
	}
	myintervalid = setInterval(draw, 30);
}
resize();
//bubbles();
