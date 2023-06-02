import {IEditProps} from "./IEditProps";
import Input from "../../Input/Input";
import ButtonIcon from "../../Buttons/ButtonIcon/ButtonIcon";
import iconAccept from "../../../Images/IconAccept/Done.svg";
import {CheckOnLength} from "../../../Checks";
import {Hint} from "../../../Functions";
import {UpdateAge, UpdateName, UpdatePatronymic, UpdateSurname} from "../../../Swapi/SwapiAccount";
import iconCancel from "../../../Images/IconCross/WhiteVersion/CrossActive.svg";
import React, {useEffect, useState} from "react";
import classes from "./Edit.module.css";
import Button from "../../Buttons/Button/Button";

export default function Edit(props: IEditProps){
    const ids = {
        name:{
            input: `${props.id}-name-input`,
            error: `${props.id}-name-error`,
            buttons:
                {
                    accept: `${props.id}-name-btn-accept`,
                    cancel: `${props.id}-name-btn-cancel`
                }
        },
        surname:{
            input: `${props.id}-surname-input`,
            error: `${props.id}-surname-error`,
            buttons:
                {
                    accept: `${props.id}-surname-btn-accept`,
                    cancel: `${props.id}-surname-btn-cancel`
                }
        },
        patronymic:{
            input: `${props.id}-patronymic-input`,
            error: `${props.id}-patronymic-error`,
            buttons:
                {
                    accept: `${props.id}-patronymic-btn-accept`,
                    cancel: `${props.id}-patronymic-btn-cancel`
                }
        },
        age:{
            input: `${props.id}-age-input`,
            error: `${props.id}-age-error`,
            buttons:
                {
                    accept: `${props.id}-age-btn-accept`,
                    cancel: `${props.id}-age-btn-cancel`
                }
        },
        buttons:{
            save: `btn-save`,
            cancel: `btn-cancel`
        }
    }
    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [patronymic, setPatronymic] = useState<string>("");
    const [age, setAge] = useState<string>("")
    useEffect(() => {
        (() => {
            setName(props.data.name);
            setSurname(props.data.surname);
            setPatronymic(props.data.patronymic);
            setAge(props.data.age.toString());
        })()
    }, [])
    return(
        <div>
            <div className={`${classes.content}`}>
                <div>
                    <div className={`row ${classes.field}`}>
                        <div className={`col-3 ${classes.label}`}>
                            Имя:
                        </div>
                        <div className={`col`}>
                            <div className={`row`} >
                                <div className={`col-7`}>
                                    <Input id={ids.name.input}
                                           idError={ids.name.error}
                                           type={"text"}
                                           setValue={setName}
                                           value={name}/>
                                </div>
                                <div className={`col`}></div>
                                <div className={`col-2`} style={{alignContent: "center", display: "flex", justifyContent: "flex-end"}}>
                                    <ButtonIcon id={ids.name.buttons.accept}
                                                icon={iconAccept}
                                                width={20}
                                                onClick={() => {
                                                    if(!CheckOnLength(name)){
                                                        Hint(ids.name.error, "Поле не заполнено", "show");
                                                        return;
                                                    }
                                                    let newEntity = UpdateName(props.data.email, name);
                                                    if(!newEntity) {
                                                        Hint(ids.name.error, "Не удалось обновить имя", "show");
                                                        return;
                                                    }
                                                    props.onUpdate();
                                                }}
                                                theme={"Success"} />
                                </div>
                                <div className={`col-2`} style={{alignContent: "Center", display: "flex", justifyContent: "flex-start"}}>
                                    <ButtonIcon id={ids.name.buttons.cancel}
                                                icon={iconCancel}
                                                width={15}
                                                onClick={() => {
                                                    setName(props.data.name);
                                                }}
                                                theme={"Cancel"} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`row ${classes.field}`}>
                        <div className={`col-3 ${classes.label}`}>
                            Фамилия:
                        </div>
                        <div className={`col`}>
                            <div className={`row`} >
                                <div className={`col-7`}>
                                    <Input id={ids.surname.input}
                                           idError={ids.surname.error}
                                           type={"text"}
                                           setValue={setSurname}
                                           value={surname}/>
                                </div>
                                <div className={`col`}></div>
                                <div className={`col-2`} style={{alignContent: "center", display: "flex", justifyContent: "flex-end"}}>
                                    <ButtonIcon id={ids.surname.buttons.accept}
                                                icon={iconAccept}
                                                width={20}
                                                onClick={() => {
                                                    if(!CheckOnLength(name)){
                                                        Hint(ids.surname.error, "Поле не заполнено", "show");
                                                        return;
                                                    }
                                                    let newEntity = UpdateSurname(props.data.email, surname);
                                                    if(!newEntity) {
                                                        Hint(ids.surname.error, "Не удалось обновить фамилию", "show");
                                                        return;
                                                    }
                                                }}
                                                theme={"Success"} />
                                </div>
                                <div className={`col-2`} style={{alignContent: "Center", display: "flex", justifyContent: "flex-start"}}>
                                    <ButtonIcon id={ids.surname.buttons.cancel}
                                                icon={iconCancel}
                                                width={15}
                                                onClick={() => {
                                                    setSurname(props.data.surname);
                                                }}
                                                theme={"Cancel"} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`row ${classes.field}`}>
                        <div className={`col-3 ${classes.label}`}>
                            Отчество:
                        </div>
                        <div className={`col`}>
                            <div className={`row`} >
                                <div className={`col-7`}>
                                    <Input id={ids.patronymic.input}
                                           idError={ids.patronymic.error}
                                           type={"text"}
                                           setValue={setPatronymic}
                                           value={patronymic}/>
                                </div>
                                <div className={`col`}></div>
                                <div className={`col-2`} style={{alignContent: "center", display: "flex", justifyContent: "flex-end"}}>
                                    <ButtonIcon id={ids.patronymic.buttons.accept}
                                                icon={iconAccept}
                                                width={20}
                                                onClick={() => {
                                                    if(!CheckOnLength(name)){
                                                        Hint(ids.patronymic.error, "Поле не заполнено", "show");
                                                        return;
                                                    }
                                                    let newEntity = UpdatePatronymic(props.data.email, patronymic);
                                                    if(!newEntity) {
                                                        Hint(ids.patronymic.error, "Не удалось обновить отчество", "show");
                                                        return;
                                                    }
                                                }}
                                                theme={"Success"} />
                                </div>
                                <div className={`col-2`} style={{alignContent: "Center", display: "flex", justifyContent: "flex-start"}}>
                                    <ButtonIcon id={ids.patronymic.buttons.cancel}
                                                icon={iconCancel}
                                                width={15}
                                                onClick={() => {
                                                    setPatronymic(props.data.patronymic);
                                                }}
                                                theme={"Cancel"} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`row ${classes.field}`}>
                        <div className={`col-3 ${classes.label}`}>
                            Возраст:
                        </div>
                        <div className={`col`}>
                            <div className={`row`} >
                                <div className={`col-7`}>
                                    <Input id={ids.age.input}
                                           idError={ids.age.error}
                                           type={"text"}
                                           setValue={setAge}
                                           value={age}/>
                                </div>
                                <div className={`col`}></div>
                                <div className={`col-2`} style={{alignContent: "center", display: "flex", justifyContent: "flex-end"}}>
                                    <ButtonIcon id={ids.age.buttons.accept}
                                                icon={iconAccept}
                                                width={20}
                                                onClick={() => {
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
                                                    let newEntity = UpdateAge(props.data.email, ageNumb);
                                                    if(!newEntity) {
                                                        Hint(ids.age.error, "Не удалось обновить возраст", "show");
                                                        return;
                                                    }
                                                }}
                                                theme={"Success"} />
                                </div>
                                <div className={`col-2`} style={{alignContent: "Center", display: "flex", justifyContent: "flex-start"}}>
                                    <ButtonIcon id={ids.age.buttons.cancel}
                                                icon={iconCancel}
                                                width={15}
                                                onClick={() => {
                                                    setAge(props.data.age.toString());
                                                }}
                                                theme={"Cancel"} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`row`}>
                    <div className={`col-2`}></div>
                    <div className={`col`}>
                        <Button id={ids.buttons.cancel}
                                text={"Отменить"}
                                size={"s"}
                                theme={"cancel"}
                                onClick={() => {props.onCancel();}}
                                disabled={false} />
                    </div>
                    <div className={`col-2`}></div>
                </div>
            </div>
        </div>
    )
}