
class User {
    constructor(readonly name, readonly email){}
    
    public isValidName() {
        return this.name != null && this.name != "";
    }

    public isValidEmail() : boolean {
        return !String(this.email)
        .toLocaleLowerCase()
        .match('^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$');
    }


}

export default User;