
function Line(ax,ay,bx,by,uid){
	this.ax=ax;
	this.ay=ay;
	this.bx=bx;
	this.by=by;
	this.uid=uid;
}

Line.prototype={

	drawDivLine:function(){
			
		this.ay=ay+$("#db_structure").scrollTop();
		this.by=by+$("#db_structure").scrollTop();
		
		if(this.ax==this.bx){
			this.ax+=((Math.random()*100)-50);
			this.bx+=((Math.random()*100)-50);
		}

		if (this.ax > this.bx) {
			this.bx = this.ax + this.bx;
			this.ax = this.bx - this.ax;
			this.bx = this.bx - this.ax;
			this.by = this.ay + this.by;
			this.ay = this.by - this.ay;
			this.by = this.by - this.ay;
		}

		var angle = Math.atan((this.ay - this.by) / (this.bx - this.ax));

		angle = (angle * 180 / Math.PI);
		angle = -angle;

		var length = Math.sqrt((this.ax - this.bx) * (this.ax - this.bx) + (this.ay - this.by) * (this.ay - this.by));

		var style = ""
		style += "cursor:pointer;left:" + (this.ax) + "px;"
		style += "top:" + (this.ay) + "px;"
		style += "width:" + length + "px;"
		style += "height:3px;"
		style += "background-color:rgb(200,200,200);"
		style += "position:absolute;"
		style += "transform:rotate(" + angle + "deg);"
		style += "-ms-transform:rotate(" + angle + "deg);"
		style += "transform-origin:0% 0%;"
		style += "-moz-transform:rotate(" + angle + "deg);"
		style += "-moz-transform-origin:0% 0%;"
		style += "-webkit-transform:rotate(" + angle + "deg);"
		style += "-webkit-transform-origin:0% 0%;"
		style += "-o-transform:rotate(" + angle + "deg);"
		style += "-o-transform-origin:0% 0%;"
		style += "-webkit-box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, .1);"
		style += "box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, .1);"
		style += "z-index:10;"

		
		$("<div id='line"+this.uid+"' style='" + style + "'></div>").appendTo('#db_structure');
	}

}