// elementlerı secme
const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");
const github = new Github;
const ui = new UI;

eventListeners();

function eventListeners() {
    githubForm.addEventListener("submit", getData);
    clearLastUsers.addEventListener("click", clearAllSearched);
    document.addEventListener("DOMContentLoaded", getAllSearched);


};

function getData(e) {
    let username = nameInput.value.trim();
    if (username === "") {
        alert("lutfen gecerlı bır kullanıcı adı gırınız");
    } else {



        github.getGithubData(username)
            .then(Response => {
                if (Response.user.message === "Not Found") {
                    // hata mesajı
                    ui.showError("Kullanıcı bulunamadı...");
                } else {
                    ui.addSearchedUserToUI(username);
                    Storage.addSearchedUserToStorage(username);
                    ui.showUserInfos(Response.user);
                    ui.showReposInfos(Response.repo);
                }


            })
            .catch(err => ui.showError(err));

    }




    ui.clearInput(); //input temızleme
    e.preventDefault();
};

function clearAllSearched() {
    //  tum arananları temızle
    if (confirm("Arananları temızlemek istediğinizden eminmisiniz?")) {
        Storage.clearAllSearchedFromStorage();
        ui.clearAllSearchedFromUI();
    }

};

function getAllSearched() {
    // arananları storegeden uı ye ekleme
    let users = Storage.getSearchedUsersFromStorage();
    let result = "";

    users.forEach(user => {
        result += `<li class="list-group-item">${user}</li>
    `;
    });
    lastUsers.innerHTML = result;
};