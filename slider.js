class Slider{
	constructor(x, y, width, height, range, startValue, minValue, color,txt) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.range = range - minValue;
		this.minValue = minValue;
		this.color = color;
        this.txt=txt;
		this.horizontal = false;
		
		if (this.width > this.height) {
			this.horizontal = true;
		}
		
		this.value = startValue - minValue;
		
		this.isMoving = false;
		this.moved = 0;
		
		this.knobDiameter = this.width*0.8;
		if (this.horizontal) {
			this.knobPos = map(this.value, 0, this.range, 0, this.width - this.height);
		} else {
			this.knobPos = map(this.value, 0, this.range, 0, this.height - this.width);
		}
		
		this.active = true;
		
		this.mousePos = 0;
		
		if (this.horizontal) {
			this.knobDiameter = this.height*0.8;
			this.startY = this.x + this.width - this.height/2;
		}
	}
	
	update() {
		let isOn;
		if (this.horizontal) {
			isOn = mouseX > this.x + this.height/2 && mouseY > this.y && mouseX < this.x + this.width - this.height/2  && mouseY < this.y + this.height;
		} else {
			isOn = mouseX > this.x && mouseY > this.y + this.width/2 && mouseX < this.x + this.width && mouseY < this.y + this.height - this.width/2;
		}
		
		if (mouseIsPressed && !this.isMoving && isOn) {
			this.isMoving = true;
		}
		if (this.isMoving) {
			if (this.horizontal) {
				this.knobPos = mouseX - this.x - this.height/2;
			} else {
				this.knobPos = this.height - this.width - (mouseY - this.y - this.width/2);
			}
		}
		if (!mouseIsPressed) {
			this.isMoving = false;
		}
		
		//Calculating absolute value of current knobPos
		this.knobPos += this.moved;
		if (this.horizontal) {
			this.value = map(this.knobPos, 0, this.width - this.height, 0, this.range) + this.minValue;
		} else {
			this.value = map(this.knobPos, 0, this.height - this.width, 0, this.range) + this.minValue;
		}
		
		this.checkForLimits();
		this.show();
	}
	
	show() {
		rectMode(CORNER);
      
		push();
		translate(this.x, this.y);
     
		noFill();
		noStroke();
		strokeWeight(3);
      fill(100);
		rect(0, 0, this.width, this.height, width/2);
		
			push();
      
       fill(this.color);
      rect(0,0,this.knobPos+ this.knobDiameter,this.height, width/2);
      
			if (!this.horizontal) {
				translate(this.width/2, this.height - this.width/2 - this.knobPos);
			} else {
				translate(this.height/2 + this.knobPos, this.height/2);
			}
     rectMode(CENTER)
      stroke(100)
      strokeWeight(2);
			ellipse(0, 0, this.knobDiameter);
      
			pop();
		
// 		text(round(this.value), this.width+10, 7);
      text(this.txt+' : '+round(this.value), 0, 30);
		pop();
		rectMode(CENTER);
	}
	
	toggle() {
		if (this.active) {
			this.active = false;
		} else {
			this.active = true;
		}
	}
	
	checkForLimits() {
		if (this.value > this.range + this.minValue) {
			this.value = this.range + this.minValue;
			if (!this.horizontal) {
				this.knobPos = this.height - this.width;
			} else {
				this.knobPos = this.width - this.height;
			}
			this.moved = 0;
		 
		} else if (this.value < this.minValue) {
			this.value = this.minValue;
			this.knobPos = 0;
			this.moved = 0;
		}
	}
}
