module.exports = class UserDto {
    id;
    email;
    name;
    lastname;
    role;

    constructor(userModel) {
        this.id = userModel.id;
        this.email = userModel.email;
        this.name = userModel.name;
        this.lastname = userModel.lastname;
        this.role = userModel.role.name;
    }
}
