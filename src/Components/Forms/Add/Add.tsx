import {IAddProps} from "./IAddProps";
import classes from "./Add.module.css";
import {useState} from "react";
import {CheckOnLength} from "../../../Checks";
import {Hint} from "../../../Functions";
import {CheckLogin} from "../../../Swapi/SwapiAccount";
import {Register} from "../../../Swapi/SwapiAuthorize";
import {UserEntity} from "../../../Entities/UserEntity";
import Input from "../../Input/Input";
import {Label} from "../../Input/IInputProps";
import Button from "../../Buttons/Button/Button";

export default function Add(props: IAddProps){
    const ids = {
        login: {
            input: "add-login-input",
            error: "add-login-error",
            label: "add-login-label"
        },
        password: {
            input: "add-password-input",
            error: "add-password-error",
            label: "add-password-label",
        },
        name:{
            input: "add-name-input",
            error: "add-name-error",
            label: "add-name-label",
        },
        surname:{
            input: "add-surname-input",
            error: "add-surname-error",
            label: "add-surname-label",
        },
        patronymic:{
            input: "add-patronymic-input",
            error: "add-patronymic-error",
            label: "add-patronymic-label",
        },
        age:{
            input: "add-age-input",
            error: "add-age-error",
            label: "add-age-label",
        },
        buttons: {
            btnLogin: "add-btn-login"
        }
    }


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
        let result = Register(new UserEntity(name, surname, patronymic, ageNumb, login, password))
        if(!result){
            Hint(ids.patronymic.error, "Невозможно добавить пользователя", "show");
            return;
        }
        props.onUpdate();
    }
    return(
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
                                text={"Добавить"}
                                size={"s"}
                                theme={"success"}
                                onClick={onSubmit}
                                disabled={false}/>
                    </div>
                    <div className={`col`}>
                        <Button id={ids.buttons.btnLogin}
                                text={"Отменить"}
                                size={"s"}
                                theme={"cancel"}
                                onClick={() => {
                                    props.onCancel();
                                }}
                                disabled={false}/>
                    </div>
                    <div className={`col-2`}></div>
                </div>
            </div>
        </div>

    )
}