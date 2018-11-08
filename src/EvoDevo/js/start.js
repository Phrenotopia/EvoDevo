
var username;
var userid;
CheckStatus();
CheckUser();

function CheckUser() {
    console.log('calling method CheckUser()');
    username = Util.getCookie('username');
    userid = Util.getCookie('userid'); //TODO: login token / shared secret 
    if (userid !== null) {
        console.log('api/player/' + userid);
        fetch('api/player/' + userid)
            .then(response => {
                return response.json();
            })
            .then(jsondata => {
                console.log({ jsondata });
                setTimeout(userdata => {
                    WelcomeUser(userdata);
                }, 1000);
            }).catch(error => {
                console.log(error);
                setTimeout(x => {
                    document.getElementById('status').innerHTML = 'User not found! <br/>' + x;
                }, 1000);
            });
    }
}

function CheckStatus() {
    console.log('checking status...');
    var urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has('status')) {
        let status = urlParams.get('status');
        if (status === 'nouser') {
            NotLoggedIn();
        }
    }
}

function NotLoggedIn() {
    ClearUser();
    console.log('no user logged in...');
    document.getElementById('login').hidden = false;
    document.getElementById('status').innerHTML = 'User not logged in!';
    document.getElementById('loggedin').hidden = true;
    document.getElementById('spanUsername').innerText = '';
    document.getElementById('btnEnterGame').disabled = true;
    document.getElementById('btnEnterGame').class = 'button';
}

function LogIn() {
    console.log('calling method LogIn()');
    username = document.getElementById('txtUsername').value;
    if (username !== '' && username !== undefined) {
        console.log('api/player/name/' + username);
        fetch('api/player/name/' + username)
            .then(response => {
                return response.json();
            })
            .then(jsondata => {
                console.log({ jsondata });
                WelcomeUser(jsondata);
            }).catch(error => {
                console.log(error.message);
                setTimeout(x => {
                    document.getElementById('status').innerHTML = 'User not found!';
                }, 1000);
            });
        document.getElementById('status').innerHTML = 'Checking...';
    }
    else {
        document.getElementById('status').innerHTML = 'Please enter a username.';
    }
}

function WelcomeUser(userdata) {
    console.log('welcome-user: ' + { userdata });
    if (userdata !== undefined) {
        if (username !== "" && username !== undefined) {
            console.log("welcoming user: " + username);
            userid = userdata.id;
            username = userdata.userName;

            document.getElementById('login').hidden = true;
            document.cookie = "username=" + username;
            document.cookie = "userid=" + userid;
            document.cookie = "authtoken=" + GenerateRandomToken();
            document.getElementById('loggedin').hidden = false;
            document.getElementById('spanUsername').innerText = username;
            document.getElementById('status').innerHTML = '';
            document.getElementById('btnEnterGame').disabled = false;
            document.getElementById('btnEnterGame').className = 'button-primary';

            userdata.lastSeen = Date.now();
            UpdateUser(userdata);
        }
        else NotLoggedIn();
    }
    else NotLoggedIn();
}

function UpdateUser(userdata) {
    var options = {
        //credentials: 'same-origin', // 'include', default: 'omit'
        method: 'PUT',
        body: JSON.stringify(userdata),
        headers: new Headers({ 'Content-Type': 'application/json' })
    };

    fetch('api/player/' + userid, options).
        then(response => response.json())
        .then(response => console.log(response));
}

function LogOut() {
    ClearUser();
    NotLoggedIn();
}

function ClearUser() {
    userid = -1;
    username = '';
    document.cookie = "username=";
    document.cookie = "userid=" + userid;
    //document.cookie = "sharedSecret=";
}

function EnterGame() {
    console.log('calling method EnterGame()');
    usercookie = Util.GetUserName();
    if (usercookie !== '') {
        console.log('user checks out: ' + usercookie);
        console.log('will be redirecting...');
        document.getElementById('status').innerHTML = 'Wait 3 seconds...';
        setTimeout(Redirect, 3000);
    }
    else
        NotLoggedIn();
}

function Redirect() {
    console.log('calling method Redirect()');
    console.log('redirect');
    window.location.href = "play.html";
}
