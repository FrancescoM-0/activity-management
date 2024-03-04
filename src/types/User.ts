class User {
  id: number;
  name: string;
  email: string;
  role: string;
  password: string;

  constructor(
    id: number,
    name: string,
    email: string,
    role: string,
    password: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.password = password;
  }

  /*static encryptPassword(password: string): string {
    let bcrypt = require("bcryptjs");
    let salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  static checkPassword(plainTextPassword: string, passwordToCompare: string) {
    let bcrypt = require("bcryptjs");
    return bcrypt.compareSync(plainTextPassword, passwordToCompare);
  }*/

  static generateInitialPassword(length: number): string {
    let initialPassword: string = "";
    const characters: string =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength: number = characters.length;
    for (let i = 0; i < length; i++) {
      initialPassword += characters.charAt(
        Math.floor(Math.random() * charactersLength)
      );
    }
    return initialPassword;
  }
}

export default User;
