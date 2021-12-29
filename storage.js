class Storage {

    static getSearchedUsersFromStorage() {
        // tüm kullanıcılar alma

        let users;
        if (localStorage.getItem("searched") === null) {
            users = [];
        } else {
            users = JSON.parse(localStorage.getItem("searched"));

        }
        return users;
    };


    static addSearchedUserToStorage(username) {
        // Kullanıcı ekle
        let users = this.getSearchedUsersFromStorage();

        // indexof
        if (users.indexOf(username) === -1) {
            users.push(username);

        }
        localStorage.setItem("searched", JSON.stringify(users));
    };

    static clearAllSearchedFromStorage() {
        // tüm kullanıcıları silme işlemi
        localStorage.removeItem("searched");
    };



}