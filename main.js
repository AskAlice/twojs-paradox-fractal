var triangle2, triangle, params, two, s,t,sides,lowest,ls,inc,prefs;
function hsv2hsl(hue,sat,val){
    return[ //[hue, saturation, lightness]
            //Range should be between 0 - 1
        hue, //Hue stays the same

        //Saturation is very different between the two color spaces
        //If (2-sat)*val < 1 set it to sat*val/((2-sat)*val)
        //Otherwise sat*val/(2-(2-sat)*val)
        //Conditional is not operating with hue, it is reassigned!
        sat*val/((hue=(2-sat)*val)<1?hue:2-hue), 
		
        hue/2 //Lightness is (2-sat)*val/2
        //See reassignment of hue above
    ]

}
s=0.999;
t=0;
lowest = 1;
sides = 3;
inc=false;
prefs = {};
	prefs.sides = Math.floor(Math.random()*6)+3;
	prefs.speed = 1.5; 
	prefs.size = 300;
	prefs.stroke = true;
	prefs.strokeColor = 'rgba(255,255,255,0.45)';
	prefs.fill = [255,30,255];
	prefs.fill = {h:255,s:1,v:0.2};
	prefs.fillOpacity = 75;
	prefs.strokeOpacity = 75;
	prefs.stroke = [255,255,255];
	prefs.realFill=hsv2hsl(prefs.fill.h,prefs.fill.s,prefs.fill.v)

$(document).ready(function(){
	var gui = new dat.GUI();
	gui.add(prefs, 'sides', 3, 12).step(1);
	gui.add(prefs, 'size', 30, 5000).step(1);
	gui.add(prefs, 'speed');
	gui.addColor(prefs,'stroke')
	gui.add(prefs, 'strokeOpacity', 0, 100).step(1);
	gui.addColor(prefs,'fill');
	gui.add(prefs, 'fillOpacity', 0, 100).step(1);
});

params = { width: $(window).width(), height: $(window).height() };
two = new Two(params).appendTo($('body')[0]);
triangle = two.makePolygon($(window).height()/2,$(window).width()/2,100)
two.bind('update', function(frameCount) {
	t+= .025;
	two.clear();
	triangle = two.makePolygon((params.width/2),params.height/2,prefs.size,prefs.sides);
	params = { width: $(window).width(), height: $(window).height() };
	triangle.fill='hsl(255,100%,50%)';
		prefs.realFill=hsv2hsl(prefs.fill.h,prefs.fill.s,prefs.fill.v)

	triangle.fill = 'hsla('+(100*t)%255+','+Math.floor(100*prefs.fill.s)+'%,'+Math.floor(100*prefs.fill.v)+'%,'+1/100*prefs.fillOpacity+')';
	triangle.stroke = 'rgba('+100*Math.floor(1/100*prefs.stroke[0])+','+100*Math.floor(1/100*prefs.stroke[1])+','+100*Math.floor(1/100*prefs.stroke[2])+','+1/100*prefs.strokeOpacity+')';
	
	l=200;
	var tc=0;
	while(l>2){
	triangle2 = triangle.clone();
	for(i = 0; i<prefs.sides; i++){
	if(i == prefs.sides-1) triangle2.vertices[i].lerp(triangle.vertices[0], s);
	else triangle2.vertices[i].lerp(triangle.vertices[i+1], s);
	}
	l = triangle2.length/prefs.sides;
	//triangle2.fill = 'hsl('+(t*(127.5*Math.cos(1/13*tc)+127.5))%255+','+'100%,50%)';
	triangle2.fill = 'hsla('+(100*t+(5*tc))%255+','+Math.floor(100*prefs.realFill[1])+'%,'+100*prefs.realFill[2]+'%,'+1/100*prefs.fillOpacity+')';
	//console.log(triangle2.fill)
	triangle = triangle2;
	tc++;
	}
	s=.48*Math.cos(1/10*prefs.speed*t)+.5000000000002

}).play();  // Finally, start the animation loop
two.update();
