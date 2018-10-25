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