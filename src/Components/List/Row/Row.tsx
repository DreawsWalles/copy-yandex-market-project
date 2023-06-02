import {IRowProps} from "./IRowProps";
import {useState} from "react";
import {IsOwner} from "../../../Swapi/SwapiUsers";
import ButtonIcon from "../../Buttons/ButtonIcon/ButtonIcon";
import iconEdit from "../../../Images/IconEdit/icon.svg";
import iconCross from "../../../Images/IconCross/BlackVersion/CrossActive.svg";
import classes from "./Row.module.css";
import Information from "../../Forms/Information/Information";
import Edit from "../../Forms/Edit/Edit";
import {RemoveUser} from "../../../Swapi/SwapiAccount";
import {Hint} from "../../../Functions";

export default function Row(props: IRowProps){

    const ids = {
        edit: `${props.data.email}-edit`,
        button:
            {
                edit: `${props.data.email}-btn-edit`,
                remove: `${props.data.email}-btn-remove`
            },
        error: `${props.data.email}-error`
    }
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [token] = useState(localStorage.getItem("token") as string);
    const [subContent, setSubContent] = useState<JSX.Element>();
    const update = () => {
        setIsOpen(false);
        props.onUpdate();
    }
    const cancel = () => {
        setIsOpen(false);
    }
    const remove = () => {
       let result = RemoveUser(props.data.email);
        if(!result){
            Hint(ids.error, "Не удалось удалить пользователя", "show");
            setInterval(() => {
                Hint(ids.error, "", "hide");
            }, 5000);
            return;
        }
        props.onUpdate();
    }
    return(
        <div className={`row ${classes.content}`}>
            <div className={`col-6 ${classes.text} ${isOpen ? classes.isOpen : ''}`}
                 onClick={() => {
                     setIsOpen(!isOpen);
                     setSubContent(<Information data={props.data} />);
                 }}>
                {props.data.email}
            </div>
            <div className={`col-6`}>
                <div className={`row`}>
                    <div className={`col`}></div>
                    <div className={`col-1`}>
                        <ButtonIcon id={ids.button.edit}
                                    icon={iconEdit}
                                    width={15}
                                    onClick={() => {
                                        setIsOpen(true);
                                        setSubContent(<Edit id={ids.edit}
                                                            data={props.data}
                                                            onUpdate={update}
                                                            onCancel={cancel} />);
                                    }} />
                    </div>
                    <div className={`col-1`}>
                        {
                            !IsOwner(token, props.data.email)
                            &&
                            <ButtonIcon id={ids.button.remove}
                                        icon={iconCross}
                                        width={15}
                                        onClick={() => {remove();}} />
                        }
                    </div>
                </div>
            </div>
            {
                isOpen &&
                <div className={`col ${classes.subContent}`}>
                    {subContent}
                </div>
            }
            <div id={ids.error}
                 className={`col ${classes.error}`}>
            </div>
        </div>
    )
}