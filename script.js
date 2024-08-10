console.log("Hello God this is my first script of my first project");

let currentsong=new Audio();
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
function playsong(track) {
    // let audio = new Audio("/songs/"+track);
    currentsong.src="/songs/"+track;
    currentsong.play();
}
async function main() { 
    currentsong;
    let songs = await getsongs();
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
    Array.from(document.querySelector(".songslist").getElementsByTagName("li")) .forEach(e=>{
        e.addEventListener("click",element=>{
            console.log(e.querySelector(".songinfo").firstElementChild.innerHTML);
            playsong(e.querySelector(".songinfo").firstElementChild.innerHTML)
        })
        
    });

    return songs;
}



main().then(songs => {
    document.getElementById("playbutton").addEventListener("click", () => playsong(songs));
});
