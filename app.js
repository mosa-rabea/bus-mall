"use strict"
let imgeSec = document.getElementById('imgSec');
let firstImge = document.getElementById('img1');
let secondImge = document.getElementById('img2');
let thirdImge = document.getElementById('img3');
let listR = document.getElementById('resultSec');
let btn = document.getElementById('result');
let ul = document.createElement('ul');
listR.appendChild(ul);
let imgArray = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg',
    'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png',
    'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];
let click1 = 0;
const time1 = 25;
let index1 = 0;
let index2 = 0;
let index3 = 0;
Product.allObj = [];
function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function Product(name, path,click,veiws) {
    this.name = name;
    this.path = `./img/${path}`;
    this.clickNum = click;
    this.veiws = veiws;
    Product.allObj.push(this);

}

function rendar() {
    let img1 = randomNumber(0, imgArray.length - 1);
    if (img1==index1){
        img1=randomNumber(0, imgArray.length - 1)
    }
    Product.allObj[img1].veiws++;

    let img2 = randomNumber(0, imgArray.length - 1);
    if(img2==index2 || img1==index1){
        img2 = randomNumber(0, imgArray.length - 1)
    }
    while (img1 == img2) {
        img2 = randomNumber(0, imgArray.length - 1)
    }
    Product.allObj[img2].veiws++;

    let img3 = randomNumber(0, imgArray.length - 1);
    if(img3==index3 || img2==index2 || img1==index1){
        img3 = randomNumber(0, imgArray.length - 1)}
    while (img3 == img1 || img3 == img2) {
        img3 = randomNumber(0, imgArray.length - 1)
    }
    Product.allObj[img3].veiws++;



    firstImge.src = Product.allObj[img1].path;
    secondImge.src = Product.allObj[img2].path;
    thirdImge.src = Product.allObj[img3].path;
    index1 = img1;
    index2 = img2;
    index3 = img3;
}

function clickListener(event) {
    if ((event.target.id == 'img1' || event.target.id == 'img2' || event.target.id == 'img3') && click1 < time1){
        if (event.target.id == 'img1') {
            Product.allObj[index1].clickNum++;
            rendar();
            click1++;
        }
    if (event.target.id =='img2') {
        Product.allObj[index2].clickNum++;
        rendar();
        click1++
    }
    if (event.target.id == 'img3') {
        Product.allObj[index3].clickNum++;
        rendar();
        click1++;
    }}else if(click1==time1){
        chartResult();
    }

}
function resultLisener(event) {
    event.preventDefault();
    for (let index = 0; index < Product.allObj.length; index++) {
        let li = document.createElement('li');
        li.textContent = `${Product.allObj[index].name} has ${Product.allObj[index].clickNum} votes ,and was seen ${Product.allObj[index].veiws} `;
        ul.appendChild(li);

    }
    btn.removeEventListener('click', resultLisener);
localStorage.setItem('items',JSON.stringify( Product.allObj));
}

btn.addEventListener('click', resultLisener);
imgeSec.addEventListener('click', clickListener);

function chartResult( ){
    let item =[];
    let watch=[];
    let clk =[];
    for (let index = 0; index <  Product.allObj.length; index++) {
item.push(Product.allObj[index].name);
    watch.push(Product.allObj[index].veiws);  
    clk.push(Product.allObj[index].clickNum);    
        
    }
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels:item,
            datasets: [{
                label: '# of Votes',
                data: watch,
                backgroundColor: 
                    'blue'
                   
                ,
                borderColor:
                    'rgba(255, 99, 132, 1)'
                  
                ,
                borderWidth: 1
            },{
                label: '# of click',
                data: clk,
                backgroundColor: 
                    'rgba(255, 99, 132, 0.2)'
                   
                ,
                borderColor:
                    'rgba(255, 99, 132, 1)'
                  
                ,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });



}
 function getData(){
     let data =JSON.parse(localStorage.getItem('items'));
     if(data){
         for (let i = 0; i < data.length; i++) {
            new Product(data[i].name,((data[i].path).replace('./img/','')),data[i].clickNum,data[i].veiws);
             
         }
         rendar();
        
     }else{for (let j = 0; j< imgArray.length; j++) {
         let itemName=imgArray[j].split('.')[0];
         new Product(itemName,imgArray[j],0,0);
         
     }rendar();

     }
     





 } getData();
//mosa