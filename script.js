// key=API_KEY 
// AIzaSyANHM14qC8bQYa0C6Av_CwjTPotc3VgIok
// --------------------------------API FETCHING PART-----------------------

const video_container = document.querySelector('.video_content');

let API_KEY = "AIzaSyANHM14qC8bQYa0C6Av_CwjTPotc3VgIok";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

fetch(video_http + new URLSearchParams({
    key: API_KEY,
    part: 'snippet',      //we will get video related data
    chart: 'mostPopular',           //to fetch mos popular videos
    maxResults: 70,                      //maxresults with s set this to a number so we can understand the dta structure easily
    regionCode: 'IN'         //to specify from which region we are fetching data
}))
    .then(res => res.json())
    .then(data => {
        // console.log(data);
        data.items.forEach(item => {
            getChannelIcon(item);
        })
    })
    .catch(err => console.log(Error));

const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key: API_KEY,
        part: 'snippet',
        id: video_data.snippet.channelId,
    }))
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
            // console.log(video_data);
            makeVideoCard(video_data);
        })
}

const makeVideoCard = (data) => {
    video_container.innerHTML += `
    <div class="video_items " onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
                    <img class="thumbnail" src="${data.snippet.thumbnails.high.url}" alt="">

                <div class="details flex">
                    
                        <img class="img" src="${data.channelThumbnail}" alt="">
                    
                    <div class="heading">
                        <p class="title" >${data.snippet.title}</p>
                        <span><i class="fa fa-circle-check"></i></span>
                        <span class="channel_name">${data.snippet.channelTitle}</span>
                    </div>
                </div>
                </div>
    `;
}
// --------------------------------API FETCHING PART-----------------------



const showMenu = (headerToggle, navbarId) => {
    const toggleBtn = document.getElementById(headerToggle);
    nav = document.getElementById(navbarId);

    if (headerToggle && navbarId) {
        toggleBtn.addEventListener('click', () => {
            nav.classList.toggle('show-menu')
            toggleBtn.classList.toggle('fa-times')
        })
    }
}

showMenu('header-toggle', 'navbar')

const linkcolor = document.querySelectorAll('.nav_link');

function colorLink() {
    linkcolor.forEach(l => l.classList.remove('active'))
    this.classList.add('active')
}

linkcolor.forEach(l => l.addEventListener('click', colorLink))