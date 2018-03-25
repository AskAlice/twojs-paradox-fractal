var triangle2, triangle, params, two, s,t,sides;
s=0.999;
sides = 4;
params = { width: $(window).width(), height: $(window).height() };
two = new Two(params).appendTo($('body')[0]);
triangle = two.makePolygon($(window).height()/2,$(window).width()/2,100)
two.bind('update', function(frameCount) {
	two.clear();
	triangle = two.makePolygon($(window).height()/4,$(window).width()/2,100,sides)

	l = 200;
	while(l>1){
	triangle2 = triangle.clone();
	for(i = 0; i<sides; i++){
	if(i == sides-1)
	triangle2.vertices[i].lerp(triangle.vertices[0], s);
	else
	triangle2.vertices[i].lerp(triangle.vertices[i+1], s);
	}
	l = triangle2.length/sides;
	triangle = triangle2;
	}
	s-=.01;
	if(s < 0 || s > 1){
		s = 0.99;
	}
}).play();  // Finally, start the animation loop
two.update();
