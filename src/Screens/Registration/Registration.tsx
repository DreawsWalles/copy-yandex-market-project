import classes from "./Registration.module.css"
import Logo from "../../Components/Logo/Logo";
import Input from "../../Components/Input/Input";
import {useState} from "react";
import {Label} from "../../Components/Input/IInputProps";
import Button from "../../Components/Buttons/Button/Button";
import {CheckOnLength} from "../../Checks";
import {Hint} from "../../Functions";
import {CheckLogin} from "../../Swapi/SwapiAccount";
import {UserEntity} from "../../Entities/UserEntity";
import {Navigate} from "react-router-dom";
import {Register} from "../../Swapi/SwapiAuthorize";
export default function Registration(){
    const ids = {
        login: {
            input: "registration-login-input",
            error: "registration-login-error",
            label: "registration-login-label"
        },
        password: {
            input: "registration-password-input",
            error: "registration-password-error",
            label: "registration-password-label",
        },
        name:{
            input: "registration-name-input",
            error: "registration-name-error",
            label: "registration-name-label",
        },
        surname:{
            input: "registration-surname-input",
            error: "registration-surname-error",
            label: "registration-surname-label",
        },
        patronymic:{
            input: "registration-patronymic-input",
            error: "registration-patronymic-error",
            label: "registration-patronymic-label",
        },
        age:{
            input: "registration-age-input",
            error: "registration-age-error",
            label: "registration-age-label",
        },
        buttons: {
            btnLogin: "authorization-btn-login"
        }
    }

    const [isRegistered, setIsRegistered] = useState<boolean>(false);

    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [patronymic, setPatronymic] = useState<string>("");
    const [age, setAge] = useState<string>("")
    const onSubmit = () => {
        debugger
        let isCorrect = new Set<boolean>();
        let tmp: boolean = CheckOnLength(login);
        if(!tmp){
            Hint(ids.login.error, "Поле не заполнено", "show");
        }
        isCorrect.add(tmp);
        tmp = CheckLogin(login);
        if(tmp){
            Hint(ids.login.error, "Данный пользователь зарегистрирован", "show");
        }
        isCorrect.add(!tmp);
        tmp = CheckOnLength(password, 8);
        if(!tmp){
            Hint(ids.password.error, "Пароль слишком короткий. Минимальная длина 8 символов", "show");
        }
        isCorrect.add(tmp);
        tmp = CheckOnLength(name, );
        if(!tmp){
            Hint(ids.name.error, "Поле не заполнено", "show");
        }
        isCorrect.add(tmp);
        tmp = CheckOnLength(surname, );
        if(!tmp){
            Hint(ids.surname.error, "Поле не заполнено", "show");
        }
        isCorrect.add(tmp);
        tmp = CheckOnLength(patronymic, );
        if(!tmp){
            Hint(ids.patronymic.error, "Поле не заполнено", "show");
        }
        isCorrect.add(tmp);
        tmp = CheckOnLength(age, );
        if(!tmp){
            Hint(ids.age.error, "Поле не заполнено", "show");
        }
        if(isCorrect.has(false)){
            return;
        }
        let ageNumb: number = 0
        try
        {
            ageNumb = Number(age);
        }
        catch (e) {
            console.error(e);
            Hint(ids.age.error, "Некорректное значение", "show");
            isCorrect.add(false);
        }
        if(ageNumb < 6){
            Hint(ids.age.error, "Слишком маленький возраст", "show");
            isCorrect.add(false)
        }
        if(isCorrect.has(false)){
            return;
        }
        debugger
        let result = Register(new UserEntity(name, surname, patronymic, ageNumb, login, password))
        if(!result){
            Hint(ids.patronymic.error, "Невозможно зарегистрироваться", "show");
            return;
        }
        localStorage.setItem("token", result);
        debugger
        setIsRegistered(true);
    }
    if(isRegistered){
        return (<Navigate to={"/profile"} />);
    }
    return(
        <div>
            <div className={`${classes.logo}`}>
                <Logo />
            </div>
            <div className={classes.content}>
                <div className={`${classes.title} ${classes.section}`}>
                    <span className={classes.textTitle}>Регистрация</span>
                </div>
                <div className={classes.fields}>
                    <div className={classes.section}>
                        <div className={`row ${classes.field}`}>
                            <div className={`col-1`}></div>
                            <div className={`col`}>
                                <Input id={ids.login.input}
                                       idError={ids.login.error}
                                       type={"text"}
                                       setValue={setLogin}
                                       label={new Label(ids.login.label, "Логин")}
                                       value={""}/>
                            </div>
                            <div className={`col-1`}></div>

                        </div>
                        <div className={`row ${classes.field}`}>
                            <div className={`col-1`}></div>
                            <div className={`col`}>
                                <Input id={ids.password.input}
                                       idError={ids.password.error}
                                       type={"password"}
                                       setValue={setPassword}
                                       label={new Label(ids.password.label, "Пароль")}
                                       value={""}/>
                            </div>
                            <div className={`col-1`}></div>
                        </div>
                    </div>
                    <div className={`${classes.section}`}>
                        <span style={{fontSize:"32px"}}>Личные данные</span>
                        <hr style={{marginTop: "-6px", marginBottom: "25px"}}/>
                        <div className={`row ${classes.field}`}>
                            <div className={`col-1`}></div>
                            <div className={`col-5`}>
                                <Input id={ids.name.input}
                                       idError={ids.name.error}
                                       type={"text"}
                                       setValue={setName}
                                       label={new Label(ids.name.label, "Имя")}
                                       value={""}/>
                            </div>
                            <div className={`col-1`}></div>
                            <div className={`col-4`}>
                                <Input id={ids.surname.input}
                                       idError={ids.surname.error}
                                       type={"text"}
                                       setValue={setSurname}
                                       label={new Label(ids.surname.label, "Фамилия")}
                                       value={""}/>
                            </div>
                            <div className={`col-1`}></div>
                        </div>
                        <div className={`row ${classes.field}`}>
                            <div className={`col-1`}></div>
                            <div className={`col-7`}>
                                <Input id={ids.patronymic.input}
                                       idError={ids.patronymic.error}
                                       type={"text"}
                                       setValue={setPatronymic}
                                       label={new Label(ids.patronymic.label, "Отчество")}
                                       value={""}/>
                            </div>
                            <div className={`col-1`}></div>
                            <div className={`col-2 `}>
                                <Input id={ids.age.input}
                                       idError={ids.age.error}
                                       type={"text"}
                                       setValue={setAge}
                                       label={new Label(ids.age.label, "Возраст")}
                                       value={""}/>
                            </div>
                            <div className={`col-1`}></div>
                        </div>
                    </div>
                    <div className={`${classes.footer}`}>
                        <div className={`row`}>
                            <div className={`col-2`}></div>
                            <div className={`col`}>
                                <Button id={ids.buttons.btnLogin}
                                        text={"Зарегистрироватья"}
                                        size={"s"}
                                        theme={"dark"}
                                        onClick={onSubmit}
                                        disabled={false}/>
                            </div>
                            <div className={`col-2`}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}