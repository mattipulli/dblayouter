
function CanvasCircle(canvas,x,y,r){
	this.x=x;
	this.y=y;
	this.r=r;
	this.canvas=canvas;
}

CanvasCircle.prototype={

	draw:function(){
		var ctx=this.canvas.getContext("2d");
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
		ctx.stroke();
	}
  
}