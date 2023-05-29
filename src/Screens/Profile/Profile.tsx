import classes from "./Profile.module.css";
import Logo from "../../Components/Logo/Logo";
import Input from "../../Components/Input/Input";
import React, {useEffect, useState} from "react";
import {IProfileProps} from "./IProfileProps";
import {UserEntity} from "../../Entities/UserEntity";
import ButtonIcon from "../../Components/Buttons/ButtonIcon/ButtonIcon";
import iconAccept from "../../Images/IconAccept/Done.svg";
import iconCancel from "../../Images/IconCross/WhiteVersion/CrossActive.svg"
import {
    CheckLogin, UpdateAge,
    UpdateLogin,
    UpdateName,
    UpdatePassword,
    UpdatePatronymic,
    UpdateSurname
} from "../../Swapi/SwapiAccount";
import {Hint} from "../../Functions";
import {CheckOnLength} from "../../Checks";

export default function Profile(props: IProfileProps){
    const ids = {
        login: {
            input: "profile-login-input",
            error: "profile-login-error",
            label: "profile-login-label",
            buttons: {
                accept: "profile-login-btn-accept",
                cancel: "profile-login-btn-cancel"
            }
        },
        password: {
            input: "profile-password-input",
            error: "profile-password-error",
            label: "profile-password-label",
            buttons: {
                accept: "profile-password-btn-accept",
                cancel: "profile-password-btn-cancel"
            }
        },
        name: {
            input: "profile-name-input",
            error: "profile-name-error",
            label: "profile-name-label",
            buttons: {
                accept: "profile-name-btn-accept",
                cancel: "profile-name-btn-cancel"
            }
        },
        surname: {
            input: "profile-surname-input",
            error: "profile-surname-error",
            label: "profile-surname-label",
            buttons: {
                accept: "profile-surname-btn-accept",
                cancel: "profile-surname-btn-cancel"
            }
        },
        patronymic: {
            input: "profile-patronymic-input",
            error: "profile-patronymic-error",
            label: "profile-patronymic-label",
            buttons: {
                accept: "profile-patronymic-btn-accept",
                cancel: "profile-patronymic-btn-cancel"
            }
        },
        age: {
            input: "profile-age-input",
            error: "profile-age-error",
            label: "profile-age-label",
            buttons: {
                accept: "profile-age-btn-accept",
                cancel: "profile-age-btn-cancel"
            }
        }
    }

    const [entity, setEntity] = useState<UserEntity>();

    const [login, setLogin] = useState<string>("");
    const [correctLogin, setCorrectLogin] = useState<boolean>(false);

    const [password, setPassword] = useState<string>("");
    const [correctPassword, setCorrectPassword] = useState<boolean>(false);

    const [name, setName] = useState<string>("");
    const [correctName, setCorrectName] = useState<boolean>(false);

    const [surname, setSurname] = useState<string>("");
    const [correctSurname, setCorrectSurname]= useState<boolean>(false);

    const [patronymic, setPatronymic] = useState<string>("");
    const [correctPatronymic, setCorrectPatronymic] = useState<boolean>(false);

    const [age, setAge] = useState<string>("")
    const [correctAge, setCorrectAge] = useState<boolean>(false);

    const correctFunctions: React.Dispatch<React.SetStateAction<boolean>>[] = [setCorrectLogin, setCorrectPassword,
        setCorrectName, setCorrectSurname, setCorrectPatronymic, setCorrectAge]

    useEffect(() => {
        (() => {
            let token = localStorage.getItem("token") as string;
            let tmp = JSON.parse(localStorage.getItem(token) as string);
            let user = tmp as UserEntity
            setEntity(user);

        })()
    }, [])
    useEffect(() => {
        (() => {
            if(entity){
                setLogin(entity.email);
                setPassword(entity.password);
                setName(entity.name);
                setSurname(entity.surname);
                setPatronymic(entity.patronymic);
                setAge(entity.age.toString());
            }
        })()
    }, [entity])

    const closeInputs = () => {
        correctFunctions.forEach(element => {
            element(false);
        })
    }
    return(
        <div>
            <div className={`${classes.logo}`}>
                <Logo />
            </div>
            <div className={classes.content}>
                <div className={`${classes.title} ${classes.section}`}>
                    <span className={classes.textTitle}>Личный кабинет</span>
                </div>
                <div className={classes.fields}>
                    <div className={classes.section}>
                        <div className={`row ${classes.field}`}>
                            <div className={`col-2 ${classes.text}`}>
                                <div>Логин:</div>
                            </div>
                            {
                                !correctLogin ?
                                    <div className={`col`}>
                                        <span className={`${classes.value}`}
                                              onClick={() => {
                                                  closeInputs();
                                                  setCorrectLogin(!correctLogin);
                                              }}>
                                            {login}
                                        </span>
                                    </div>
                                    :
                                    <div className={`col`}>
                                        <div className={`row`} >
                                            <div className={`col`}>
                                                <Input id={ids.login.input}
                                                       idError={ids.login.error}
                                                       type={"text"}
                                                       setValue={setLogin}
                                                       value={login}/>
                                            </div>
                                            <div className={`col-2`} style={{alignContent: "center", display: "flex", justifyContent: "flex-end"}}>
                                                <ButtonIcon id={ids.login.buttons.accept}
                                                            icon={iconAccept}
                                                            width={20}
                                                            onClick={() => {
                                                                debugger
                                                                if(!CheckOnLength(login)){
                                                                    Hint(ids.login.error, "Поле не заполнено", "show");
                                                                    return;
                                                                }
                                                                if(CheckLogin(login)){
                                                                    Hint(ids.login.error, "Данный пользователь зарегистрирован", "show");
                                                                    return;
                                                                }
                                                                let newEntity = UpdateLogin(localStorage.getItem("token") as string, login);
                                                                if(!newEntity) {
                                                                    Hint(ids.login.error, "Не удалось обновить логин", "show");
                                                                    return;
                                                                }
                                                                localStorage.setItem("token", newEntity.email);
                                                                setEntity(newEntity);
                                                                closeInputs();
                                                            }}
                                                            theme={"Success"} />
                                            </div>
                                            <div className={`col-2`} style={{alignContent: "Center", display: "flex", justifyContent: "flex-start"}}>
                                                <ButtonIcon id={ids.login.buttons.cancel}
                                                            icon={iconCancel}
                                                            width={15}
                                                            onClick={() => {
                                                                closeInputs();
                                                                setLogin(entity?.email as string);
                                                                console.log(entity);
                                                            }}
                                                            theme={"Cancel"} />
                                            </div>
                                        </div>
                                    </div>
                            }
                            <div className={`col-1`}></div>
                        </div>
                        <div className={`row ${classes.field}`}>
                            <div className={`col-2 ${classes.text}`}>
                                <div>Пароль:</div>
                            </div>
                            {
                                !correctPassword ?
                                    <div className={`col`}>
                                        <span className={`${classes.value}`}
                                              onClick={() => {
                                                  closeInputs();
                                                  setCorrectPassword(!correctPassword);
                                              }}>
                                            ********
                                        </span>
                                    </div>
                                    :
                                    <div className={`col`}>
                                        <div className={`row`} >
                                            <div className={`col`}>
                                                <Input id={ids.password.input}
                                                       idError={ids.password.error}
                                                       type={"password"}
                                                       setValue={setPassword}
                                                       value={password}/>
                                            </div>
                                            <div className={`col-2`} style={{alignContent: "center", display: "flex", justifyContent: "flex-end"}}>
                                                <ButtonIcon id={ids.password.buttons.accept}
                                                            icon={iconAccept}
                                                            width={20}
                                                            onClick={() => {
                                                                debugger
                                                                if(!CheckOnLength(password, 8)){
                                                                    Hint(ids.password.error, "Поле не заполнено", "show");
                                                                    return;
                                                                }
                                                                let newEntity = UpdatePassword(localStorage.getItem("token") as string, password);
                                                                if(!newEntity) {
                                                                    Hint(ids.password.error, "Не удалось обновить логин", "show");
                                                                    return;
                                                                }
                                                                setEntity(newEntity);
                                                                closeInputs();
                                                            }}
                                                            theme={"Success"} />
                                            </div>
                                            <div className={`col-2`} style={{alignContent: "Center", display: "flex", justifyContent: "flex-start"}}>
                                                <ButtonIcon id={ids.password.buttons.cancel}
                                                            icon={iconCancel}
                                                            width={15}
                                                            onClick={() => {
                                                                closeInputs();
                                                                setPassword(entity?.password as string);
                                                                console.log(entity);
                                                            }}
                                                            theme={"Cancel"} />
                                            </div>
                                        </div>
                                    </div>
                            }
                            <div className={`col-1`}></div>
                        </div>
                    </div>
                    <div className={`${classes.section}`}>
                        <span style={{fontSize:"32px"}}>Личные данные</span>
                        <hr style={{marginTop: "-6px", marginBottom: "25px"}}/>
                        <div className={`row ${classes.field}`}>
                            <div className={`col-2 ${classes.text}`}>
                                <div>Имя:</div>
                            </div>
                            {
                                !correctName ?
                                    <div className={`col`}>
                                        <span className={`${classes.value}`}
                                              onClick={() => {
                                                  closeInputs();
                                                  setCorrectName(!correctName);
                                              }}>
                                            {name}
                                        </span>
                                    </div>
                                    :
                                    <div className={`col`}>
                                        <div className={`row`} >
                                            <div className={`col`}>
                                                <Input id={ids.name.input}
                                                       idError={ids.name.error}
                                                       type={"text"}
                                                       setValue={setName}
                                                       value={name}/>
                                            </div>
                                            <div className={`col-2`} style={{alignContent: "center", display: "flex", justifyContent: "flex-end"}}>
                                                <ButtonIcon id={ids.name.buttons.accept}
                                                            icon={iconAccept}
                                                            width={20}
                                                            onClick={() => {
                                                                debugger
                                                                if(!CheckOnLength(name)){
                                                                    Hint(ids.name.error, "Поле не заполнено", "show");
                                                                    return;
                                                                }
                                                                let newEntity = UpdateName(localStorage.getItem("token") as string, name);
                                                                if(!newEntity) {
                                                                    Hint(ids.name.error, "Не удалось обновить логин", "show");
                                                                    return;
                                                                }
                                                                setEntity(newEntity);
                                                                closeInputs();
                                                            }}
                                                            theme={"Success"} />
                                            </div>
                                            <div className={`col-2`} style={{alignContent: "Center", display: "flex", justifyContent: "flex-start"}}>
                                                <ButtonIcon id={ids.name.buttons.cancel}
                                                            icon={iconCancel}
                                                            width={15}
                                                            onClick={() => {
                                                                closeInputs();
                                                                setName(entity?.name as string);
                                                                console.log(entity);
                                                            }}
                                                            theme={"Cancel"} />
                                            </div>
                                        </div>
                                    </div>
                            }
                            <div className={`col-1`}></div>
                        </div>
                        <div className={`row ${classes.field}`}>
                            <div className={`col-2 ${classes.text}`}>
                                <div>Фамилия:</div>
                            </div>
                            {
                                !correctSurname ?
                                    <div className={`col`}>
                                        <span className={`${classes.value}`}
                                              onClick={() => {
                                                  closeInputs();
                                                  setCorrectSurname(!correctSurname);
                                              }}>
                                            {surname}
                                        </span>
                                    </div>
                                    :
                                    <div className={`col`}>
                                        <div className={`row`} >
                                            <div className={`col`}>
                                                <Input id={ids.surname.input}
                                                       idError={ids.surname.error}
                                                       type={"text"}
                                                       setValue={setSurname}
                                                       value={surname}/>
                                            </div>
                                            <div className={`col-2`} style={{alignContent: "center", display: "flex", justifyContent: "flex-end"}}>
                                                <ButtonIcon id={ids.surname.buttons.accept}
                                                            icon={iconAccept}
                                                            width={20}
                                                            onClick={() => {
                                                                debugger
                                                                if(!CheckOnLength(name)){
                                                                    Hint(ids.surname.error, "Поле не заполнено", "show");
                                                                    return;
                                                                }
                                                                let newEntity = UpdateSurname(localStorage.getItem("token") as string, surname);
                                                                if(!newEntity) {
                                                                    Hint(ids.surname.error, "Не удалось обновить логин", "show");
                                                                    return;
                                                                }
                                                                setEntity(newEntity);
                                                                closeInputs();
                                                            }}
                                                            theme={"Success"} />
                                            </div>
                                            <div className={`col-2`} style={{alignContent: "Center", display: "flex", justifyContent: "flex-start"}}>
                                                <ButtonIcon id={ids.surname.buttons.cancel}
                                                            icon={iconCancel}
                                                            width={15}
                                                            onClick={() => {
                                                                closeInputs();
                                                                setSurname(entity?.surname as string);
                                                                console.log(entity);
                                                            }}
                                                            theme={"Cancel"} />
                                            </div>
                                        </div>
                                    </div>
                            }
                            <div className={`col-1`}></div>
                        </div>
                        <div className={`row ${classes.field}`}>
                            <div className={`col-2 ${classes.text}`}>
                                <div>Отчество:</div>
                            </div>
                            {
                                !correctPatronymic ?
                                    <div className={`col`}>
                                        <span className={`${classes.value}`}
                                              onClick={() => {
                                                  closeInputs();
                                                  setCorrectPatronymic(!correctPatronymic);
                                              }}>
                                            {patronymic}
                                        </span>
                                    </div>
                                    :
                                    <div className={`col`}>
                                        <div className={`row`} >
                                            <div className={`col`}>
                                                <Input id={ids.patronymic.input}
                                                       idError={ids.patronymic.error}
                                                       type={"text"}
                                                       setValue={setPatronymic}
                                                       value={patronymic}/>
                                            </div>
                                            <div className={`col-2`} style={{alignContent: "center", display: "flex", justifyContent: "flex-end"}}>
                                                <ButtonIcon id={ids.patronymic.buttons.accept}
                                                            icon={iconAccept}
                                                            width={20}
                                                            onClick={() => {
                                                                debugger
                                                                if(!CheckOnLength(name)){
                                                                    Hint(ids.patronymic.error, "Поле не заполнено", "show");
                                                                    return;
                                                                }
                                                                let newEntity = UpdatePatronymic(localStorage.getItem("token") as string, patronymic);
                                                                if(!newEntity) {
                                                                    Hint(ids.patronymic.error, "Не удалось обновить логин", "show");
                                                                    return;
                                                                }
                                                                setEntity(newEntity);
                                                                closeInputs();
                                                            }}
                                                            theme={"Success"} />
                                            </div>
                                            <div className={`col-2`} style={{alignContent: "Center", display: "flex", justifyContent: "flex-start"}}>
                                                <ButtonIcon id={ids.patronymic.buttons.cancel}
                                                            icon={iconCancel}
                                                            width={15}
                                                            onClick={() => {
                                                                closeInputs();
                                                                setPatronymic(entity?.patronymic as string);
                                                                console.log(entity);
                                                            }}
                                                            theme={"Cancel"} />
                                            </div>
                                        </div>
                                    </div>
                            }
                            <div className={`col-1`}></div>
                        </div>
                        <div className={`row ${classes.field}`}>
                            <div className={`col-2 ${classes.text}`}>
                                <div>Возраст:</div>
                            </div>
                            {
                                !correctAge ?
                                    <div className={`col`}>
                                        <span className={`${classes.value}`}
                                              onClick={() => {
                                                  closeInputs();
                                                  setCorrectAge(!correctAge);
                                              }}>
                                            {age}
                                        </span>
                                    </div>
                                    :
                                    <div className={`col`}>
                                        <div className={`row`} >
                                            <div className={`col`}>
                                                <Input id={ids.age.input}
                                                       idError={ids.age.error}
                                                       type={"text"}
                                                       setValue={setAge}
                                                       value={age}/>
                                            </div>
                                            <div className={`col-2`} style={{alignContent: "center", display: "flex", justifyContent: "flex-end"}}>
                                                <ButtonIcon id={ids.age.buttons.accept}
                                                            icon={iconAccept}
                                                            width={20}
                                                            onClick={() => {
                                                                debugger
                                                                if(!CheckOnLength(name)){
                                                                    Hint(ids.age.error, "Поле не заполнено", "show");
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
                                                                }
                                                                    let newEntity = UpdateAge(localStorage.getItem("token") as string, ageNumb);
                                                                if(!newEntity) {
                                                                    Hint(ids.age.error, "Не удалось обновить логин", "show");
                                                                    return;
                                                                }
                                                                setEntity(newEntity);
                                                                closeInputs();
                                                            }}
                                                            theme={"Success"} />
                                            </div>
                                            <div className={`col-2`} style={{alignContent: "Center", display: "flex", justifyContent: "flex-start"}}>
                                                <ButtonIcon id={ids.patronymic.buttons.cancel}
                                                            icon={iconCancel}
                                                            width={15}
                                                            onClick={() => {
                                                                closeInputs();
                                                                setAge(entity?.age.toString() as string);
                                                                console.log(entity);
                                                            }}
                                                            theme={"Cancel"} />
                                            </div>
                                        </div>
                                    </div>
                            }
                            <div className={`col-1`}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}