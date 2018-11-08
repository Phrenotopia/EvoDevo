// 
class Util {

    constructor() { }

    static getUserName() {
        username = Util.getCookie('username');
        return username;
    }

    static getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }

            if (c.indexOf(name) === 0) {
                let cookie = c.substring(name.length, c.length);
                return cookie;
            }
        }
        return null;
    }

    static setCookie(name, value) {
        document.cookie = name + '=' + value;
    }

    static getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    static getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    static testCanvas(cvs) {
        var randomColor = Util.getRandomColor();
        console.log(randomColor);
        var c = cvs.getContext('2d');
        c.fillStyle = randomColor;
        c.fillRect(0, 0, cvs.width, cvs.height);
    }

    static generateRandomToken() {
        //https:/ /www.fiznool.com/blog/2014/11/16/short-id-generation-in-javascript/
        var ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

        var ID_LENGTH = 8;

        var rtn = '';
        for (var i = 0; i < ID_LENGTH; i++) {
            rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
        }
        return rtn;
    }

    static test(ref) {
        console.log('Test static successfully called from ' + ref);
    }
}
