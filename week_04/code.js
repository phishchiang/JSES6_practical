
let cvs, ctx;
window.addEventListener('load', function(){
  cvs=document.querySelector('#cvs');
  ctx=cvs.getContext('2d');
})

function oepnPicker(){
  let input=document.querySelector('#file');
  input.click();
}

function openFile(input){
  let file=input.files[0]; // files 屬性是固定的，也可以多選
  // URL.createObjectURL (檔案物件或 Blob 物件)
  let src=URL.createObjectURL(file);
  loadImage(src);
}
function loadImage(src){
  // 把圖檔畫到畫布上
  let img=new Image();
  img.src=src;
  img.addEventListener('load', function(){
    // console.log(img.width, img.height);
    // 根據載入的圖片尺寸來調整 canvas 的尺寸
    cvs.width=img.width;
    cvs.height=img.height;
    ctx.drawImage(img, 0, 0, cvs.width, cvs.height);
  });
}
function grayscale(){
  // 取得　ImageData 物件
  let pixels=ctx.getImageData(0, 0, cvs.width, cvs.height);
  // 取得　ImageData 物件中的顏色資料
  let data=pixels.data;
  console.log(data);
  // 以像素為單位來處理顏色:一次往前跳四個編號
  let avg;
  for(let i=0; i<data.length;i=i+4){
    avg=(data[i]+data[i+1]+data[i+2])/3;
    data[i+0]=avg; // R
    data[i+1]=avg; // G
    data[i+2]=avg; // B
    /*
    data[i+0]; // R
    data[i+1]; // G
    data[i+2]; // B
    data[i+3]; // A
    */
  }
  // 因為是陣列的關係，所以data改了pixel.data也會一起跟著改
  // pixels.data = data;
  ctx.putImageData(pixels, 0, 0);
}
function invert(){
  let pixels=ctx.getImageData(0, 0, cvs.width, cvs.height);
  let data=pixels.data;
  console.log(data);
  for(let i=0; i<data.length;i=i+4){
    data[i+0]=255-data[i+0]; // R
    data[i+1]=255-data[i+1]; // G
    data[i+2]=255-data[i+2]; // B
  }
  ctx.putImageData(pixels, 0, 0);
}
function downloadFile(){
  // 把畫布的資料轉換成 Blob 物件：JavaScript　內部用來儲存二進位資料的物件，不是文字的資料
  cvs.toBlob(function(blob){ // 透過　callback　函式傳遞轉換好的 Blob 物件，非同步的方式
    // 取得　Blob 資料的後續動作
    let src=URL.createObjectURL(blob);
    // 設定好下載的資訊，並觸發下載的動作
    let link=document.querySelector('#download-link');
    link.href=src;
    link.download="image.jpg";
    // png 適合logo 有透明度
    // jpg 適合大圖　檔案小
    link.click();
  }, "image/jpeg"); // 預設格式是 png
}