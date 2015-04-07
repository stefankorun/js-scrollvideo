$(function () {
    var videoWrapper = $('.videoWrapper');
    var videoElement = videoWrapper.find('video');
    var frameScrollSize = 0.5;

    handleScroll = _.throttle(function (newLocation) {
        console.log('handling scroll');
        videoElement[0].currentTime = (newLocation * frameScrollSize) / 1000;
    }, 90, {trailing: true});

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
    /*var section = window.location.hash.split('#')[1] || 100;
    setInterval(function () {
        video[0].currentTime += section / 1000;
    }, section)*/

});