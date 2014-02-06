
function CanvasRect(canvas,x,y,w,h){
	this.x=x;
	this.y=y;
	this.w=w;
	this.h=h;
	this.canvas=canvas;
}

CanvasRect.prototype={
  
	draw:function(){
		var ctx=this.canvas.getContext("2d");
		ctx.strokeRect(this.x,this.y,this.w,this.h); 
	}
	
}