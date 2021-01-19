window.onload = function () {
    const mediaQuery = window.matchMedia('(max-width: 961px)')
    if (window.addEventListener) {
        window.addEventListener('resize', function () {
            if (mediaQuery.matches) {
                document.querySelector('.nav ul').style.display = 'none'
            }
            else {
                document.querySelector('.nav ul').style.display = 'inline-block'
            }
        });
    }
    else if (window.addEventListener) {
        window.addEventListener('resize', function () {
            console.log('addEventListener - resize');
        }, true);
    }
    else {
        //The browser does not support Javascript event binding
    }

    var otherContainers = document.querySelectorAll('.container');
    document.querySelector('#check').addEventListener('change', function () {
        if (document.querySelector('.nav ul').style.display !== 'block') {
            document.querySelector('.nav ul').style.display = 'block'
            for (i = 1; i < otherContainers.length; i++) {
                otherContainers[i].style.display = 'none'
            }
        }
        else {
            document.querySelector('.nav ul').style.display = 'none'
            for (i = 1; i < otherContainers.length; i++) {
                otherContainers[i].style.display = 'block'
            }
        }

    })

}