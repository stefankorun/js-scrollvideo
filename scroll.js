$(function () {
    var video = $('video');

    video.on('loadedmetadata', function(e) {
        console.log(e, this);
    });


    var section = window.location.hash.split('#')[1] || 100;
    setInterval(function () {
        video[0].currentTime += section / 1000;
    }, section)
});