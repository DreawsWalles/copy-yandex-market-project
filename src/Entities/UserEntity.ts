export class UserEntity
{
    name: string;
    surname: string;
    patronymic: string;
    age: number;
    email: string;
    password: string;
    constructor(name: string, surname: string, patronymic: string, age: number, email: string, password: string) {
        this.name = name;
        this.surname = surname;
        this.patronymic = patronymic;
        this.age = age;
        this.email = email;
        this.password = password;
    }
}