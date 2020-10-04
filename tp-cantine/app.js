var logBtn = document.getElementById('log-btn');
var userListItemWrapper = document.getElementsByClassName('userList-item-wrapper');
var btnTest = document.getElementById('btnTest');


var API = 'http://localhost:8080/lunchtime';

var token = '';
var log = logBtn.nextElementSibling;

function init() {
    login();
}

function getUsers() {

    // var informations = document.createElement('div');

    // var allUsers = [];

    var options = {
        headers: { "Authorization": token }
    };
    fetch(API + '/user/findall', options)
        .then(res => {
            if (res.status === 401) {
                log.innerText = "Il faut se logguer d'abord"
            }
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(users => {
            // console.log(users);
            // allUsers = users;
            // console.log(allUsers);
            displayUsers(users);
        })

    // return informations;
}

// function addUser(user) {
//     getUserFirstname(user);
//     getUserName(user);
//     getUserWallet(user);
// }

function getUserName(user) {
    var name = document.createElement('div');
    name.innerText = user.name;
    name.classList.add('user-name');

    return name;
}

function getUserFirstname(user) {
    var firstname = document.createElement('div');
    firstname.innerText = user.firstname;
    firstname.classList.add('user-firstname');

    return firstname;
}

function getUserWallet(user) {
    var wallet = document.createElement('div');
    wallet.innerText = user.wallet;
    wallet.classList.add('user-wallet');

    return wallet;
}

function displayUsers(users) {
    // var users = getUsers();
    // console.log(users);
    var informations = document.createElement('div');

    for (var i = 0; i < users.length; i++) {
        // console.log(users[i]);
        var row = document.createElement('div');
        row.classList.add('user-item-wrapper');

        for (var j = 0; j < users.length; j++) {
            row.appendChild(getUserFirstname(users[i]));
            row.appendChild(getUserName(users[i]));
            row.appendChild(getUserWallet(users[i]));
        }

        informations.appendChild(row);
    }
    return informations;
}

function login() {
    var credentials = {
        email: 'toto@gmail.com',
        password: 'bonjour'
    };
    var options = {
        method: 'POST',
        body: JSON.stringify(credentials)
    };
    fetch(API + '/login', options)
        .then(res => {
            token = res.headers.get('Authorization');
            if (token) {
                log.innerText = "Vous êtes connecté"
            } else {
                log.innerText = "Erreur d'authentification"
            }
        })   
}

function addSections() {
    var newDiv = document.createElement("div");
  // et lui donne un peu de contenu
    var newContent = document.createTextNode('Hi there and greetings!');
  // ajoute le nœud texte au nouveau div créé
    newDiv.appendChild(newContent);
  
  // ajoute le nouvel élément créé et son contenu dans le DOM
    var parentDiv = userListItemWrapper.parentNode;
    var currentDiv = document.getElementById('userList-item-wrapper');
    parentDiv.insertBefore(newDiv, currentDiv.nextSibling);

}

logBtn.addEventListener('click', getUsers);
btnTest.addEventListener('click', addSections);

init();