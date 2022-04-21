let i = 1;
let songIndex = 1;
let previousSong = 0;
let repeat = 0
let songState = "paused";
let folder = "static/songs/";  
let first_song = folder.concat("",songs_data[0]);
let songs = [];

songs_data.forEach(myFunction);
function myFunction(value, index) {
    let filepath = folder.concat("",value);
    songs.push({songName: value, filePath: filepath, songid:index+1});
}
let audioElement = new Audio(first_song);
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let masterSongTime = document.getElementById('masterSongTime');
let search = document.querySelector('#search')
let rep = document.getElementById('repeat')
let vol = document.getElementById('volume-control');
audioElement.volume = vol.value/100;


masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        document.getElementById("masterPlay").src="../static/pause-circle-regular.png";
        let el = document.getElementById(songIndex)
        el.src="../static/pause-circle-regular.png"
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        document.getElementById("masterPlay").src="../static/play-circle-regular.png";
        gif.style.opacity = 0;
        let el = document.getElementById(songIndex)
        el.src="../static/play-circle-regular.png"
    }
})

rep.addEventListener('click',()=>{
    if (repeat ==0){
        rep.src="../static/repeat1.png";
        repeat =1;
    }
    else if(repeat ==1){
        rep.src="../static/repeat.png";
        repeat = 0;
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
    if (audioElement.currentTime==audioElement.duration){
        if (repeat==0){
            songIndex = songIndex+1;
            if (songIndex>songs.length){
                songIndex = 1;
            }
        }
        else if (repeat == 1){
            songIndex = songIndex;
        }
        let el = document.getElementById(songIndex)
        el.src="../static/play-circle-regular.png"
        let ele = document.getElementById(songIndex)
        ele.src="../static/pause-circle-regular.png"
        songState = "playin ${songIndex}";
        audioElement.pause();
        songs.forEach(getname);
        document.getElementById("masterPlay").src="../static/pause-circle-regular.png";
    }
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

audioElement.addEventListener('timeupdate',()=>{
    let ti = parseInt(audioElement.currentTime)
    if (ti<10){
        masterSongTime.innerText="00:0"+ti+"/"+time_data[songIndex-1];
    }
    else if(ti>=10 && ti<60){
        masterSongTime.innerText="00:"+ti+"/"+time_data[songIndex-1];
    }
    else if(ti>=60){
        let t = parseInt(ti/60);
        ti = parseInt(ti%60);
        if (ti<10 && t<10){
            masterSongTime.innerText="0"+t+":0"+ti+"/"+time_data[songIndex-1];
        }
        else if(ti>=10 && t<10){
            masterSongTime.innerText="0"+t+":"+ti+"/"+time_data[songIndex-1];
        }
    }
    else{
        masterSongTime.innerText="00:0/"+time_data[songIndex-1];
    }
    
})

Array.from(document.getElementsByClassName('songItemimg')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        previousSong = songIndex;
        let el = document.getElementById(previousSong)
        el.src="../static/play-circle-regular.png"
        songIndex = parseInt(e.target.id);
        if (previousSong==songIndex){
            if (songState=="paused"){
                let el = document.getElementById(songIndex)
                el.src="../static/pause-circle-regular.png"
                audioElement.play();
                songState = "playin";
                document.getElementById("masterPlay").src="../static/pause-circle-regular.png";
                gif.style.opacity = 1;
            }
            else{
                let el = document.getElementById(songIndex)
                el.src="../static/play-circle-regular.png"
                audioElement.pause()
                songState = "paused";
                document.getElementById("masterPlay").src="../static/play-circle-regular.png";
                gif.style.opacity = 0;
            }
        }
        else{
            let el = document.getElementById(songIndex)
            el.src="../static/pause-circle-regular.png"
            songs.forEach(getname);
            songState = "playin";
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
            masterSongTime.innerText="00:00/"+time_data[index];
            audioElement.currentTime = 0;
            audioElement.play();
        }
        else
        {
            audioElement.pause()
            audioElement.src= val["filePath"];
            masterSongName.innerText = song_name;
            masterSongTime.innerText="00:00/"+time_data[index];
            audioElement.currentTime = 0;
            audioElement.play();
        }
    }
}

document.getElementById('next').addEventListener('click', ()=>{
    let el = document.getElementById(songIndex)
    el.src="../static/play-circle-regular.png"
    songIndex = songIndex+1;
    if (songIndex>songs.length){
        songIndex = 1;
    }
    let ele = document.getElementById(songIndex)
    ele.src="../static/pause-circle-regular.png"
    songState = "playin ${songIndex}";
    audioElement.pause();
    songs.forEach(getname);
    document.getElementById("masterPlay").src="../static/pause-circle-regular.png";

})

document.getElementById('previous').addEventListener('click', ()=>{
    let el = document.getElementById(songIndex)
    el.src="../static/play-circle-regular.png"
    songIndex = songIndex-1;
    if (songIndex==0){
        songIndex = songs.length;
    }
    let ele = document.getElementById(songIndex)
    ele.src="../static/pause-circle-regular.png"
    songState = "playin ${songIndex}";
    audioElement.pause();
    songs.forEach(getname);
    document.getElementById("masterPlay").src="../static/pause-circle-regular.png";
})

function setcss() {
    let songit = document.getElementsByClassName("songItem");
    let songN = document.getElementsByClassName("songName");
    let times = document.getElementsByClassName("timestamp");
    let tiimg = document.getElementsByClassName("songItemimg");
}

search.addEventListener('input',()=>{
    const valu = search.value;
    var value = valu.toLowerCase();
    songs.forEach((element)=>{
        let name = element["songName"].toLowerCase();
        let c = document.getElementById('songItem'+element["songid"]);
        if(name.includes(value)){
            c.style.display='';
        }
        else{
            c.style.display='none';
        }
    })
        
})

vol.addEventListener("change", ()=> {
audioElement.volume = vol.value / 100;
})
