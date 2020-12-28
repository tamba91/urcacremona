window.onload = function () {
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