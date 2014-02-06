
function CanvasGraphics(canvas){
	this.canvas=canvas;
	this.object_arr=new Array();
}

CanvasGraphics.prototype={
  
	addObject:function(object){
		this.object_arr.push(object);
	},

	drawPoint:function(x,y){
		this.addObject(new CanvasPoint(this.canvas,x,y));
	},
	
	drawLine:function(x1,y1,x2,y2){
		this.addObject(new CanvasLine(this.canvas,x1,y1,x2,y2));
	},
	
	drawRect:function(x1,y1,w,h){
		this.addObject(new CanvasRect(this.canvas,x1,y1,w,h));
	},
	
	drawCircle:function(x,y,r){
		this.addObject(new CanvasCircle(this.canvas,x,y,r));
	},
	
	clear:function(){
		this.object_arr=new Array();
		var ctx=this.canvas.getContext("2d");
		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},
	
	
	draw:function(){
		for(var i=0; i<this.object_arr.length; i++){
			this.object_arr[i].draw();
		}
	}
  
}