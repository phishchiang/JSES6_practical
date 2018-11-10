let lib = {};
lib.Plane = function(){
  this.x = ctx.canvas.width/2;
  this.y = ctx.canvas.height/2;
  this.size = 20;
  this.update = function(){
    let speed = 1;
    if(game.key.a){
      speed=4;
    }
    // 這邊用 if 而不是 else if 讓狀態可以重複
    // 而對於鍵盤觸發則是不可能會同時觸發所以用 else if 也可以
    if(game.key.left){
      this.x-=speed;
    }
    if(game.key.up){
      this.y-=speed;
    }
    if(game.key.right){
      this.x+=speed;
    }
    if(game.key.down){
      this.y+=speed;
    }
    if(this.x<0){
      this.x=0;
    }
    if(this.y<0){
      this.y=0;
    }
    if(this.x>ctx.canvas.width){
      this.x=ctx.canvas.width;
    }
    if(this.y>ctx.canvas.height){
      this.y=ctx.canvas.height;
    }
    return false;
  };
  this.draw = function(){
    ctx.save();
    let img = res.img.plane;
    if(game.key.a){
      img = res.img.smoke;
    }
    ctx.drawImage(img, this.x-this.size/2, this.y-this.size/2, this.size, this.size);
    ctx.restore();
  }
}