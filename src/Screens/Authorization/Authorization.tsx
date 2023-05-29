import classes from "./Authorization.module.css"
import {useEffect, useState} from "react";
import Input from "../../Components/Input/Input";
import {Label} from "../../Components/Input/IInputProps";
import {Navigate} from "react-router-dom";
import ButtonIcon from "../../Components/Buttons/ButtonIcon/ButtonIcon";
import iconArrowNext from "../../Images/IconArrows/iconNext.svg"
import {Hint} from "../../Functions";
import {CheckLogin} from "../../Swapi/SwapiAccount";
import {CheckOnLength} from "../../Checks";
import Logo from "../../Components/Logo/Logo";
import Button from "../../Components/Buttons/Button/Button";
import {LoginEntity} from "../../Entities/LoginEntity";
import {Login} from "../../Swapi/SwapiAuthorize";
export default function Authorization(){
    const ids = {
        login: {
            input: "authorization-login-input",
            error: "authorization-login-error",
            label: "authorization-login-label"
        },
        password: {
            input: "authorization-password-input",
            error: "authorization-password-error",
            label: "authorization-password-label",
            module: "authorization-password",
        },
        buttons:{
            btnNext: "authorization-btn-next",
            btnLogin: "authorization-btn-login"
        }
    }
    const [isAuthorize, setIsAuthorize] = useState<boolean>();
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordisOpen, setPasswordIsOpen] = useState<boolean>(false);
    useEffect(() => {
        (() => {
            let token = localStorage.getItem("token");
            if(token || token === ""){
                setIsAuthorize(false);
            }else {
                setIsAuthorize(true);
            }
            let element = document.getElementById(ids.password.module);
            if(element){
                element.classList.remove(classes.inputClose);
                element.classList.add(classes.inputOpen);
            }
        })()
    }, [])
    const clickOnLogin = () => {
        let tmp: boolean = CheckOnLength(login);
        if(!tmp){
            Hint(ids.login.error, "Поле не заполнено", "show");
            return;
        }
        tmp = CheckLogin(login);
        if(!tmp){
            Hint(ids.login.error, "Данного пользователя не зарегистрировано", "show");
            return;
        }
        openPassword();
    }
    useEffect(() => {
        (() => {
            let element = document.getElementById(ids.password.module);
            if(element){
                if(passwordisOpen){
                    element.classList.remove(classes.inputClose);
                    element.classList.add(classes.inputOpen);
                }
                else{
                    element.classList.remove(classes.inputOpen);
                    element.classList.add(classes.inputClose);
                }
            }
        })()
    }, [passwordisOpen])
    const openPassword = () => {
        setPasswordIsOpen(!passwordisOpen);
    }
    const onSubmit = () => {
        let isCorrect = new Set<boolean>();
        let tmp: boolean = CheckOnLength(login);
        if(!tmp){
            Hint(ids.login.error, "Поле не заполнено", "show");
        }
        isCorrect.add(tmp);
        tmp = CheckLogin(login);
        if(!tmp){
            Hint(ids.login.error, "Данного пользователя не зарегистрировано", "show");
        }
        isCorrect.add(tmp);
        tmp = CheckOnLength(password, 8);
        if(tmp){
            Hint(ids.password.error, "Пароль слишком короткий", "show");
        }
        if(isCorrect.has(false)){
            return;
        }
        debugger
        let result = Login(new LoginEntity(login, password))
        if(!result){
            Hint(ids.password.error, "Невозможно авторизоваться", "show");
            return;
        }
        localStorage.setItem("token", result);
        setIsAuthorize(true);
    }
    if(!isAuthorize) {
        return (
            <div className={`${classes.content}`}>
                <div className={`${classes.title}`}>
                   <Logo />
                </div>
                <div className={`row ${classes.input} ${classes.section}`}>
                    <div className={``}>
                        <Input id={ids.login.input}
                               type={"text"}
                               idError={ids.login.error}
                               setValue={setLogin}
                               label={new Label(ids.login.label, "Логин")}
                               value={""}/>
                    </div>
                    <div className={`${classes.btnInInput}`}>
                        <ButtonIcon id={ids.buttons.btnNext}
                                    icon={iconArrowNext} width={9} onClick={clickOnLogin}/>
                    </div>
                </div>
                <div id={ids.password.module} className={`row ${classes.input} ${classes.section} ${classes.inputClose}`}>
                    <div className={``}>
                        <Input id={ids.password.input}
                               type={"password"}
                               idError={ids.password.error}
                               setValue={setPassword}
                               label={new Label(ids.password.label, "Пароль")}
                               value={""}/>
                    </div>
                </div>
                <div style={{top: passwordisOpen ? '' : '-83px'}}
                     className={`row ${classes.section} ${classes.buttons}`}>
                    <div className={`col`}>
                        <Button id={ids.buttons.btnLogin}
                                text={"Войти"}
                                size={"s"}
                                theme={"white"}
                                onClick={onSubmit}
                                disabled={!passwordisOpen}/>
                    </div>
                    <div className={`col`}>
                        <Button id={ids.buttons.btnLogin}
                                text={"Зарегистрироваться"}
                                size={"s"}
                                theme={"dark"}
                                onClick={() => {document.location='/registration'}}
                                disabled={false}/>
                    </div>
                </div>
            </div>
        )
    }else{
        return (<Navigate to={"/profile"} />)
    }
}