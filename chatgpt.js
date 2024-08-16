console.log("Hello God this is my first script of my first project");

let currentsong = new Audio();
let songs;
let currentfolder;
let folders;
let NoPlays=1;
async function getsongs(folder) {
    currentfolder=folder
    let a = await fetch(`http://192.168.255.36:3000/songs/${folder}/`);
    let response = await a.text();
    let divhtml = document.createElement("div");
    divhtml.innerHTML = response;
    let as = divhtml.getElementsByTagName("a");
     songs = [];
    for (let i = 0; i < as.length; i++) {
        const Element1 = as[i];
        if (Element1.href.endsWith("mp3")) {
            songs.push(Element1.href.split(`/${folder}/`)[1]);
        }
    }
    console.log(songs);
    // for updating songs in library section
    let songsUL = document.querySelector(".songslist").getElementsByTagName("ul")[0];
    songsUL.innerHTML="";
    for (const song of songs) {
        songsUL.innerHTML = songsUL.innerHTML + `   
        <li>
                        <img class="invert" src="music.svg" alt="">
                        <div class="songinfo">
                            <div >${song.replaceAll("%20", " ")}</div>
                            <div>By Dhanesh</div>
                            
                            
                        </div><!-- song info closes here -->
                        <div class="playnow">
                           <span> Play Now </span>
                        <img class="invert" src="play.svg" alt="">
                    </div></li>`;
    }
     // for  event listen song list play 
     Array.from(document.querySelector(".songslist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            console.log(e.querySelector(".songinfo").firstElementChild.innerHTML);
            playsong(e.querySelector(".songinfo").firstElementChild.innerHTML)
        })

    });
    // playsong(songs[0],false)
    return songs;
}
async function getfolders(){
    let a = await fetch(`http://192.168.255.36:3000/songs/`);
    a=await a.text();
    divhtml=document.createElement("div")
    divhtml.innerHTML=a;
    a=divhtml.getElementsByTagName("a");
    folders=[];
    let cardhtml = document.querySelector(".cardcont");
    for (let i = 0; i < a.length; i++) {
        const Element1 = a[i];
            
            if (Element1.href.includes("/songs")){
            // folders.push(Element1.href.split("/").slice(-2)[0]);
            let foldername=Element1.href.split("/").slice(-2)[0];
            // console.log(foldername);
            
            let b1 = await fetch(`http://192.168.255.36:3000/songs/${foldername}/info.json`);
            let json1=await b1.json();
            console.log(json1);
            
           
    
            cardhtml.innerHTML = cardhtml.innerHTML + `   <div data-folder="${foldername}" class="card">
        <div class="playbutt">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48"
                color="#000000" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="0" fill="#1fdf64" />
                <path
                    d="M15.4531 12.3948C15.3016 13.0215 14.5857 13.4644 13.1539 14.3502C11.7697 15.2064 11.0777 15.6346 10.5199 15.4625C10.2893 15.3913 10.0793 15.2562 9.90982 15.07C9.5 14.6198 9.5 13.7465 9.5 12C9.5 10.2535 9.5 9.38018 9.90982 8.92995C10.0793 8.74381 10.2893 8.60868 10.5199 8.53753C11.0777 8.36544 11.7697 8.79357 13.1539 9.64983C14.5857 10.5356 15.3016 10.9785 15.4531 11.6052C15.5156 11.8639 15.5156 12.1361 15.4531 12.3948Z"
                    stroke="currentColor" stroke-width="0.9" stroke-linejoin="round" />
            </svg>
        </div><!-- playbutton ends -->
    
        <img src="/songs/${foldername}/thumbnail.jpeg" alt="">
        <h2>${json1.title}</h2>
        <p>${json1.Artist}</p>
    
    </div>`
            }
           
    
    }
    
    // console.log(folders);
    
}
function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.floor(seconds % 60);

    const a=String(minutes).padStart(2,'0');
    const b=String(remainingSeconds).padStart(2,'0')

    return `${a}:${b}`;
}


function playsong(track,pause=false) {
    currentsong.src = `songs/${currentfolder}/` + track;
    if(!pause){
    currentsong.play();
    NoPlays++;
    playbutton.src = "pause.svg"
}
console.log(NoPlays);

    //updating track name and song duration
    document.querySelector(".trackname").innerHTML = decodeURI(track);
   
    currentsong.addEventListener("timeupdate", () => {
       
       document.querySelector(".songtime").innerHTML=`${formatTime(currentsong.currentTime)}/${formatTime(currentsong.duration)} <img src="volume.svg" alt=""><input type="range" name="volume" class="volume-slider" style="display: none;">`
       let dure=(currentsong.currentTime/currentsong.duration)*100;
    //    console.log(dure);
       //timine and seek bar control
       
        if(dure==100){
            currentsong.pause()
            let index=songs.indexOf(currentsong.src.split("/").slice(-1)[0])
            if(index+1<songs.length)playsong(songs[index+1]);
            
        }
       
       document.querySelector(".circle").style.left=`${dure}%`;

    })
    document.querySelector(".seekbar").addEventListener("click",e=>{
        let a = (e.offsetX / e.target.getBoundingClientRect().width);
        a=currentsong.duration*a
        // console.log(a);
        document.querySelector(".circle").style.left=`${a}%`;
        currentsong.currentTime=a;
        
    })

}
async function main(string1) {
        // currentfolder="sad"
        await getfolders();
      await getsongs("Sad%20AF");
    
    playsong(songs[0],true)
    
    
    
    
    
    // for playlist when card is clicked
        Array.from(document.getElementsByClassName("card")).forEach((e)=>{
            e.addEventListener("click",async item=>{
                const folderValue = e.dataset.folder;
                // console.log(folderValue);
                songs=await getsongs(`${folderValue}`)
            let temp1=document.querySelector(".left");
                if(temp1.style.left!="0%"){
                    temp1.style.left="-40%"
                    setTimeout(() => {
                        temp1.style.left="-100%"
                    }, 500);
                    console.log("gand mareya");
                    
                }
                // else console.log("chiutya pa");

                if(currentsong.paused&&NoPlays==1){
                    playsong(songs[0],true);
                }
                
                
            })
        })
   
 //event listner for swipe on right
 let startX;

 document.querySelector(".right").addEventListener("touchstart", (e) => {
     startX = e.touches[0].clientX;
 });
 
 document.querySelector(".right").addEventListener("touchend", (e) => {
     let endX = e.changedTouches[0].clientX;
     let diffX = startX - endX;
 
     if (Math.abs(diffX) > 50) { // You can adjust the swipe threshold as needed
         let temp1 = document.querySelector(".left");
         if (temp1.style.left !== "0%") {
             temp1.style.left = "0%";
         }
     }
 });


 
    document.getElementById("playbutton").addEventListener("click", () => {

        if (currentsong.paused) {
            currentsong.play();
            playbutton.src = "pause.svg"
        }
        else {
            currentsong.pause();
            playbutton.src = "play.svg"
        }
    })
    //hamburder settings
    document.querySelector(".hamburger").addEventListener("click",()=>{
        document.querySelector(".left").style.left="0";
    })

    //close button
    document.querySelector(".close").addEventListener("click",()=>{
        document.querySelector(".left").style.left="-100%";
    })
    
    // previoyus and next button    
    prevbutton.addEventListener("click",()=>{
        currentsong.pause()
        let index=songs.indexOf(currentsong.src.split("/").slice(-1)[0])
        if(index-1>-1) playsong(songs[index-1]);
        else alert("no previos song is htheir")
    })
    nextbutton.addEventListener("click",()=>{
        currentsong.pause()
        let index=songs.indexOf(currentsong.src.split("/").slice(-1)[0])
        if(index+1<songs.length)playsong(songs[index+1]);
        else alert("no song is present nex");

    })

   document.querySelector(".right").addEventListener("click",()=>{
    // Select the element with class 'left'
    // console.log("right is clicked");
    
const element = document.querySelector(".left");

// Get the computed style of the element
const computedStyle = window.getComputedStyle(element);

// Check if the 'left' property is '0'
const isLeftZero = computedStyle.left === "0px";

if(isLeftZero){
    document.querySelector(".left").style.left="-100%";

}
   
   })
    
    // volume rocker
    // Show the volume slider when hovering over the volume image
document.querySelector(".volume-image").addEventListener("mouseover", () => {
    document.querySelector(".volume-slider").style.display = "block";
});

// Hide the volume slider when the mouse leaves the volume image
document.querySelector(".volume-image").addEventListener("mouseout", () => {
    document.querySelector(".volume-slider").style.display = "none";
});

// Show the volume slider when hovering over the volume image
document.querySelector(".volume-slider").addEventListener("mouseover", () => {
    document.querySelector(".volume-slider").style.display = "block";
});

// Hide the volume slider when the mouse leaves the volume image
document.querySelector(".volume-slider").addEventListener("mouseout", () => {
    document.querySelector(".volume-slider").style.display = "none";
});

    document.querySelector(".volume-slider").addEventListener("change",(e)=>{
        // console.log("change",e);
       currentsong.volume=parseInt(e.target.value)/100; 
    })



}



 main("Lord huron")