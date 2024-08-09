console.log("Hello God this is my first script of my first projec");

async function getsongs(){
let a=await fetch("http://127.0.0.1:3000/songs")
let response=await a.text();
// console.log(response);
let divhtml=document.createElement("div")
divhtml.innerHTML=response;
let as=divhtml.getElementsByTagName("a")
let songs=[];
for(let i=0;i<as.length;i++){
    const Element1=as[i]
    if(Element1.href.endsWith("mp3")){
        songs.push(Element1.href);
    }
}
console.log(songs);
return songs
}
async function main(){
    let songs= await getsongs();
    var audio = new Audio(songs[0]);
 audio.play();
}



document.getElementById("playbutton").addEventListener("click",main);
