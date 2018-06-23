(function () {

    var upButton = document.querySelector('#up-button');

    window.addEventListener('scroll', function () {
        upButton.classList.toggle('up-button--hidden', window.pageYOffset < 500);
    });

    function elYPosition(el) {
        if (el.name === 'title') {
            return 0;
        }
        var y = el.offsetTop;
        var node = el;
        while (node.offsetParent && node.offsetParent != document.body) {
            node = node.offsetParent;
            y += node.offsetTop;
        }
        y -= 30;
        return y;
    }

    function smoothScroll(el) {
        var startY = window.pageYOffset;
        var stopY = elYPosition(el);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY);
            return;
        }
        var acceleration = 0.2;
        var speed = 0;
        var step = Math.round(distance / 500);
        var nextY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for (var i = startY; i < stopY; i += step) {
                setTimeout('window.scrollTo(' + window.pageXOffset + ', ' + nextY + ')', timer * 16);
                speed += acceleration
                step += speed;
                nextY += Math.round(step);
                if (nextY > stopY) nextY = stopY;
                timer++;
            }
        } else {
            for (var i = startY; i > stopY; i -= step) {
                setTimeout('window.scrollTo(' + window.pageXOffset + ', ' + nextY + ')', timer * 16);
                speed += acceleration
                step += speed;
                nextY -= Math.round(step);
                if (nextY < stopY) nextY = stopY;
                timer++;
            }
        }
        setTimeout('window.scrollTo(' + window.pageXOffset + ', ' + stopY + ')', timer * 16);
    }

    window.addEventListener('click', function (e) {
        if (e.target.tagName.toLowerCase() !== 'a' || e.target.href.indexOf('#') === -1) {
            return;
        }
        e.preventDefault();
        var destName = e.target.href.slice(e.target.href.indexOf('#')+1)
        var destEl = document.querySelector('a[name=' + destName + ']')
        smoothScroll(destEl);
        if (destName === 'title' && window.innerWidth > 1100) {
            document.querySelector('#chapter-list').classList.add('chapter-list--right');
        }
        if (destName === 'title') {
            history.pushState({}, document.title, location.pathname);
        } else {
            history.pushState({}, document.title, location.pathname + '#' + destName);
        }
    });

})();
