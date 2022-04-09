console.log("Welcome to Spotify");

let i = 1;
let songIndex = 1;
let previousSong  = 0;
let songState = "";
let folder = "static/songs/";  
let first_song = folder.concat("",songs_data[0]);
let songs = [];

songs_data.forEach(myFunction);
function myFunction(value, index, array) {
    let filepath = folder.concat("",value);
    songs.push({songName: value, filePath: filepath, songid:index+1});
}
let audioElement = new Audio(first_song);
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');



masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        // masterPlay.classList.remove('fa-play-circle');
        // masterPlay.classList.add('fa-pause-circle');
        document.getElementById("masterPlay").src="../static/pause-circle-regular.png";
        // el.classList.remove('fa-play-circle');
        // el.classList.add('fa-pause-circle');
        let el = document.getElementById(songIndex)
        el.src="../static/pause-circle-regular.png"
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        // masterPlay.classList.remove('fa-pause-circle');
        // masterPlay.classList.add('fa-play-circle');
        document.getElementById("masterPlay").src="../static/play-circle-regular.png";
        gif.style.opacity = 0;
        // el.classList.remove('fa-pause-circle');
        // el.classList.add('fa-play-circle');
        let el = document.getElementById(songIndex)
        el.src="../static/play-circle-regular.png"
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
    if (audioElement.currentTime==audioElement.duration){
        // let e = document.getElementById(songIndex)
        // e.classList.remove("fa-pause-circle")
        // e.classList.add("fa-play-circle")
        let el = document.getElementById(songIndex)
        el.src="../static/play-circle-regular.png"
        songIndex = songIndex+1;
        if (songIndex>songs.length){
            songIndex = 1;
        }
        // let ele = document.getElementById(songIndex)
        // ele.classList.remove('fa-play-circle');
        // ele.classList.add('fa-pause-circle');
        let ele = document.getElementById(songIndex)
        ele.src="../static/pause-circle-regular.png"
        songState = "playin ${songIndex}";
        audioElement.pause();
        songs.forEach(getname);
        // masterPlay.classList.remove('fa-play-circle');
        // masterPlay.classList.add('fa-pause-circle');
        document.getElementById("masterPlay").src="../static/pause-circle-regular.png";
    }
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        // element.classList.remove('fa-pause-circle');
        // element.classList.add('fa-play-circle');
        let el = document.getElementById(songIndex)
        el.src="../static/play-circle-regular.png"
    })
}

Array.from(document.getElementsByClassName('songItemimg')).forEach((element)=>{
    // console.log(element.id);
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        previousSong = songIndex;
        songIndex = parseInt(e.target.id);
        if (previousSong==songIndex){
            if (songState=="paused ${songIndex}"){
                // e.target.classList.remove('fa-play-circle');
                // e.target.classList.add('fa-pause-circle');
                let el = document.getElementById(songIndex)
                el.src="../static/pause-circle-regular.png"
                audioElement.play();
                songState = "playin ${songIndex}";
                // masterPlay.classList.remove('fa-play-circle');
                // masterPlay.classList.add('fa-pause-circle');
                document.getElementById("masterPlay").src="../static/pause-circle-regular.png";
                gif.style.opacity = 1;
            }
            else{
                // e.target.classList.remove('fa-pause-circle');
                // e.target.classList.add('fa-play-circle');
                let el = document.getElementById(songIndex)
                el.src="../static/play-circle-regular.png"
                audioElement.pause()
                songState = "paused ${songIndex}";
                // masterPlay.classList.remove('fa-pause-circle');
                // masterPlay.classList.add('fa-play-circle');
                document.getElementById("masterPlay").src="../static/play-circle-regular.png";
                gif.style.opacity = 0;
            }
        }
        else{
            // e.target.classList.remove('fa-play-circle');
            // e.target.classList.add('fa-pause-circle');
            let el = document.getElementById(songIndex)
            el.src="../static/pause-circle-regular.png"
            songs.forEach(getname);
            songState = "playin ${songIndex}";
            // masterPlay.classList.remove('fa-play-circle');
            // masterPlay.classList.add('fa-pause-circle');
            document.getElementById("masterPlay").src="../static/pause-circle-regular.png";
            gif.style.opacity = 1;
        }
        
        
    })
})

function getname(value,index,array){
    if(index+1 ==songIndex){
        let val = JSON.parse(JSON.stringify(value));
        let length = val["songName"].length;
        let song_name = val["songName"].slice(0,length-4);
        if(audioElement.paused || audioElement.currentTime<=0){
            audioElement.src= val["filePath"];
            masterSongName.innerText =song_name;
            audioElement.currentTime = 0;
            audioElement.play();
        }
        else
        {
            audioElement.pause()
            audioElement.src= val["filePath"];
            masterSongName.innerText = song_name;
            audioElement.currentTime = 0;
            audioElement.play();
        }
    }
}

document.getElementById('next').addEventListener('click', ()=>{
    // let e = document.getElementById(songIndex)
    // e.classList.remove("fa-pause-circle")
    // e.classList.add("fa-play-circle")
    let el = document.getElementById(songIndex)
    el.src="../static/play-circle-regular.png"
    songIndex = songIndex+1;
    if (songIndex>songs.length){
        songIndex = 1;
    }
    // let ele = document.getElementById(songIndex)
    // ele.classList.remove('fa-play-circle');
    // ele.classList.add('fa-pause-circle');
    let ele = document.getElementById(songIndex)
    ele.src="../static/pause-circle-regular.png"
    songState = "playin ${songIndex}";
    audioElement.pause();
    songs.forEach(getname);
    // masterPlay.classList.remove('fa-play-circle');
    // masterPlay.classList.add('fa-pause-circle');
    document.getElementById("masterPlay").src="../static/pause-circle-regular.png";

})

document.getElementById('previous').addEventListener('click', ()=>{
    // let e = document.getElementById(songIndex)
    // e.classList.remove("fa-pause-circle")
    // e.classList.add("fa-play-circle")
    let el = document.getElementById(songIndex)
    el.src="../static/play-circle-regular.png"
    songIndex = songIndex-1;
    if (songIndex==0){
        songIndex = songs.length;
    }
    // let ele = document.getElementById(songIndex)
    // ele.classList.remove('fa-play-circle');
    // ele.classList.add('fa-pause-circle');
    let ele = document.getElementById(songIndex)
    ele.src="../static/pause-circle-regular.png"
    songState = "playin ${songIndex}";
    audioElement.pause();
    songs.forEach(getname);
    // masterPlay.classList.remove('fa-play-circle');
    // masterPlay.classList.add('fa-pause-circle');
    document.getElementById("masterPlay").src="../static/pause-circle-regular.png";
})


let volume = document.querySelector("#volume-control");
volume.addEventListener("change", function(e) {
audioElement.volume = e.currentTarget.value / 100;
})
