$(function () {
    // ---- Values you can tweak: ----
    var accelamount = 0.05; //How fast the video will try to catch up with the target position. 1 = instantaneous, 0 = do nothing.
    var bounceamount = 0.9; //value from 0 to 1 for how much backlash back and forth you want in the easing. 0 = no bounce whatsoever, 1 = lots and lots of bounce

    var videoWrapper = $('.videoWrapper');
    var videoElement = videoWrapper.find('video');

    var pixelDuration = 3; // miliseconds per pixel
    var targetPosition = 0;
    var currentPosition = 0;
    var accel = 0;


    videoElement.on('loadedmetadata', function () {
        // Initializing scroll size
        // adding frameScroll size to compensate for scroll size
        var videoDuration = (this.duration + pixelDuration) * 1000;
        videoWrapper.height(videoDuration / pixelDuration);
    });
    $(window).scroll(function () {
        targetPosition = this.scrollY;
    });


    setInterval(function () {

        // Accelerate towards the target
        var distance = targetPosition - currentPosition;
        accel += distance * accelamount;

        // clamp the acceleration so that it doesnt go too fast
        var accMax = 100;
        if (accel > accMax) accel = accMax;
        if (accel < -accMax) accel = -accMax;

        console.log(targetPosition, currentPosition, accel);

        // check if next tick is skipping the target frame and wrap to it if true
        if (Math.abs(accel) > Math.abs(distance)) {
            currentPosition = targetPosition;
            accel = 0;
        } else {
            currentPosition = (currentPosition + accel);
        }


        //update video playback
        videoElement[0].currentTime = (currentPosition * pixelDuration) / 1000;
    }, 60);

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

