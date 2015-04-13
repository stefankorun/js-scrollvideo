$(function () {
    var accelamount = 0.05; //How fast the video will try to catch up with the target position. 1 = instantaneous, 0 = do nothing.

    var videoWrapper = $('.videoWrapper');
    var videoElement = videoWrapper.find('video');
    var intervalId = null;

    var pixelDuration = 3; // miliseconds per pixel
    var targetPosition = 0;
    var currentPosition = 0;
    var velocity = 0;


    videoElement.on('loadedmetadata', function () {
        // Initializing scroll size
        // adding frameScroll size to compensate for scroll size
        var videoDuration = (this.duration + pixelDuration) * 1000;
        videoWrapper.height(videoDuration / pixelDuration);
    });

    $(window).scroll(function () {
        if (!intervalId) {
            intervalId = setInterval(moveVideo, 100);
        }
        targetPosition = this.scrollY;
    });


    function moveVideo() {

        // Accelerate towards the target
        var distance = targetPosition - currentPosition;
        velocity += distance * accelamount;

        // clamp the acceleration so that it doesnt go too fast
        var accMax = 100;
        if (velocity > accMax) velocity = accMax;
        if (velocity < -accMax) velocity = -accMax;

        // check if next tick is skipping the target frame and wrap to it if true
        if (Math.abs(velocity) > Math.abs(distance)) {
            currentPosition = targetPosition;
            clearInterval(intervalId);
            intervalId = null;
            velocity = 0;
        } else {
            currentPosition = (currentPosition + velocity);
        }

        //update video playback
        console.log(targetPosition, currentPosition, velocity);
        videoElement[0].currentTime = (currentPosition * pixelDuration) / 1000;
    }

});

/*
 * version 1

 $(function () {
 var videoWrapper = $('.videoWrapper');
 var videoElement = videoWrapper.find('video');
 var frameScrollSize = 2;

 handleScroll = _.throttle(function (newLocation) {
 console.log('handling scroll');
 videoElement[0].currentTime = (newLocation * frameScrollSize) / 1000;
 }, 90, {trailing: false});

 videoElement.on('loadedmetadata', function (event) {
 console.log(this);

 // adding frameScroll size to compensate for scroll size
 var videoDuration = (this.duration + frameScrollSize) * 1000;
 videoWrapper.height(videoDuration / frameScrollSize);
 });
 $(window).scroll(function (event) {
 //console.log($(this).height());
 handleScroll(this.scrollY);
 });



 // testing supported intervals
 var section = window.location.hash.split('#')[1] || 100;
 setInterval(function () {
 video[0].currentTime += section / 1000;
 }, section)

 });
 */

