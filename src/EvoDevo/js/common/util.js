
function GetUserName() {
    //console.log('check user cookie');
    username = GetCookie('username');
    //console.log('username cookie: ' + username);
    
    return username;
}

function GetCookie(cname)
{
    //console.log('getting cookie:' + cname);
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++)
    {
        var c = ca[i];
        //console.log(c);
        while (c.charAt(0) === ' ')
        {
            c = c.substring(1);
        }

        if (c.indexOf(name) === 0)
        {
            let cookie = c.substring(name.length, c.length);
            //console.log('cookie acquired: ' + cookie);
            return cookie;
        }
    }
    //console.log('cookie not found');
    return null;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

//function resizeCanvas(evt) {
//    console.log(evt.target.id);
//    evt.target.width = document.documentElement.clientWidth;
//    evt.target.height = document.documentElement.clientHeight;
//}

function TestCanvas(cvs) {
    var randomColor = getRandomColor();
    console.log(randomColor);
    var c = cvs.getContext('2d');
    c.fillStyle = randomColor;
    c.fillRect(0, 0, cvs.width, cvs.height);
}

function GenerateRandomToken() {
    //https:/ /www.fiznool.com/blog/2014/11/16/short-id-generation-in-javascript/
    var ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    var ID_LENGTH = 8;

    var rtn = '';
    for (var i = 0; i < ID_LENGTH; i++) {
        rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
    }
    return rtn;
}

function Test(ref) {
    console.log('Test function successfully called from ' + ref);
}
