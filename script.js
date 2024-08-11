console.log("Hello God this is my first script of my first project");

let currentsong = new Audio();
async function getsongs() {
    let a = await fetch("http://127.0.0.1:3000/songs");
    let response = await a.text();
    let divhtml = document.createElement("div");
    divhtml.innerHTML = response;
    let as = divhtml.getElementsByTagName("a");
    let songs = [];
    for (let i = 0; i < as.length; i++) {
        const Element1 = as[i];
        if (Element1.href.endsWith("mp3")) {
            songs.push(Element1.href.split("/songs/")[1]);
        }
    }
    console.log(songs);
    return songs;
}
function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.floor(seconds % 60);

    const a=String(minutes).padStart(2,'0');
    const b=String(remainingSeconds).padStart(2,'0')

    return `${a}:${b}`;
}


function playsong(track,pause=false) {
    currentsong.src = "/songs/" + track;
    if(!pause){
    currentsong.play();
    playbutton.src = "pause.svg"
}
    //updating track name and song duration
    document.querySelector(".trackname").innerHTML = decodeURI(track);
   
    currentsong.addEventListener("timeupdate", () => {
       
       document.querySelector(".songtime").innerHTML=`${formatTime(currentsong.currentTime)}/${formatTime(currentsong.duration)}`
       let dure=(currentsong.currentTime/currentsong.duration)*100;
       console.log(dure);
       
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
    
    let songs = await getsongs();
    
    playsong(songs[7],true)
    let cardhtml = document.querySelector(".cardcont");
    for (const song of songs) {
        cardhtml.innerHTML = cardhtml.innerHTML + `   <div class="card">
    <div class="playbutt">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48"
            color="#000000" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="0" fill="#1fdf64" />
            <path
                d="M15.4531 12.3948C15.3016 13.0215 14.5857 13.4644 13.1539 14.3502C11.7697 15.2064 11.0777 15.6346 10.5199 15.4625C10.2893 15.3913 10.0793 15.2562 9.90982 15.07C9.5 14.6198 9.5 13.7465 9.5 12C9.5 10.2535 9.5 9.38018 9.90982 8.92995C10.0793 8.74381 10.2893 8.60868 10.5199 8.53753C11.0777 8.36544 11.7697 8.79357 13.1539 9.64983C14.5857 10.5356 15.3016 10.9785 15.4531 11.6052C15.5156 11.8639 15.5156 12.1361 15.4531 12.3948Z"
                stroke="currentColor" stroke-width="0.9" stroke-linejoin="round" />
        </svg>
    </div><!-- playbutton ends -->

    <img src="https://4.bp.blogspot.com/-mHnxl74Ba5o/WOkioGBTXcI/AAAAAAAAPdM/Dq9FkVpvBmYsltLY7LYfZT5aezPzmVzbgCLcB/s1600/maxresdefault.jpg" alt="">
    <h2>${song.replaceAll("%20", " ").slice(0, 5)}</h2>
    <p>2017 Various Artist</p>

</div>`
    }
    
    
    
    let songsUL = document.querySelector(".songslist").getElementsByTagName("ul")[0];
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
    Array.from(document.querySelector(".songslist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            console.log(e.querySelector(".songinfo").firstElementChild.innerHTML);
            playsong(e.querySelector(".songinfo").firstElementChild.innerHTML)
        })

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
    return songs;

    
    
}



let songs = main("Lord huron")