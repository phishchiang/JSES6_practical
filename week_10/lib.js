let lib = {};
// 設計彈幕系統
lib.BulletSystem = function(){
  this.bullets = []; // 儲存彈幕中的子彈
  this.update=function(){
    // 每 3 回合新增一顆子彈
    if(game.circle%5==0){
      this.bullets.push(new lib.Bullet());
    }
    // 每回合新增一顆子彈
    // this.bullets.push(new lib.Bullet());
    // 更新每一顆子彈
    for(let i =0; i<this.bullets.length; i++){
      if(this.bullets[i].update()){
        this.bullets.splice(i, 1);
        i--;
      }
    }
    // 碰撞偵測
    let bullet, threshold, distance;
    for(let i =0; i<this.bullets.length; i++){
      bullet = this.bullets[i];
      threshold = bullet.size + game.plane.size/2;
      distance = Math.sqrt(
        Math.pow(game.plane.x-bullet.x, 2)+
        Math.pow(game.plane.y-bullet.y, 2)
      );
      if(distance<=threshold){
        game.over = true; // 表示 Game Over
        console.log('Game Over!'); 
        break; // 結束迴圈，跳出這個 Loop
      }
    }
  }
  this.draw = function(){
    // 重畫每一顆子彈
    for(let i =0; i<this.bullets.length; i++){
      this.bullets[i].draw();
    }
  }
};
lib.Bullet = function(){
  let seed = Math.random();
  if(seed>0.75){ // 25% 機率 左>右
    this.x = 0;
    this.y = Math.random()*ctx.canvas.height;
    this.vx = Math.random()*1+0.5; // 0.5 ~ 1.5
    this.vy = Math.random()*2-1; // -1 ~ 1
  }else if(seed>0.5){ // 25% 機率 右>左
    this.x = ctx.canvas.width;
    this.y = Math.random()*ctx.canvas.height;
    this.vx = Math.random()*1-1.5; // -0.5 ~ -1.5
    this.vy = Math.random()*2-1; // -1 ~ 1
  }else if(seed>0.25){ // 25% 機率 上>下
    this.x = Math.random()*ctx.canvas.width;
    this.y = 0;
    this.vx = Math.random()*2-1; // -1 ~ 1
    this.vy = Math.random()*1+0.5; // 0.5 ~ 1.5
  }else{ // 25% 機率 下>上
    this.x = Math.random()*ctx.canvas.width;
    this.y = ctx.canvas.height;
    this.vx = Math.random()*2-1; // -1 ~ 1
    this.vy = Math.random()*1-1.5; // 0.5 ~ 1.5
  }

  this.size = 15;

  this.update = function(){
    this.x+=this.vx;
    this.y+=this.vy;
    // 清除條件:子彈的座標超出畫面
    return this.x<0 || this.x>ctx.canvas.width
    || this.y<0 || this.y>ctx.canvas.height;
  }
  this.draw = function(){
    ctx.save();
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI); //圓心座標 半徑 起始角度 最終角度
    ctx.fill();
    ctx.restore();
  }
};
// 設計飛機
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
    // if(game.key.a){
    //   img = res.img.smoke;
    // }
    ctx.drawImage(img, this.x-this.size/2, this.y-this.size/2, this.size, this.size);
    ctx.restore();
  }
}