(function () {

    document.addEventListener('DOMContentLoaded', init, false);

    function init() {
        // init
        var controller = new ScrollMagic.Controller();

        // build scene
        var scene1 = new ScrollMagic.Scene({
            triggerElement: "#trigger2"
        })
            .setTween("#animate2", 1.1, { scale: 1.1 }) // trigger a TweenMax.to tween
            .addTo(controller);

    }
})();