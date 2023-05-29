import {IMenuProps} from "./IMenuProps";
import classes from "./Menu.module.css";
import Button from "./Button/Button";
import iconUsers from "../../Images/Person/iconPerson.svg"
import iconPA from "../../Images/PersonalArea/iconPersonalArea.svg";
import iconLogout from "../../Images/IconLogout/IconLogout.svg";
export default function Menu(props: IMenuProps){
    const ids = {
        buttons:{
            btnUsers: `${props.id}-btnUsers`
        }
    }
    return (
        <div className={`row ${classes.content}`}>
            <div className={`${classes.buttons}`}>
                <div className={`col`}>
                    <Button id={ids.buttons.btnUsers}
                            text={"Личный кабинет"}
                            icon={iconPA} height={50}
                            onClick={props.actions[1]}/>
                </div>
                <div className={`col`}>
                    <Button id={ids.buttons.btnUsers}
                            text={"Пользователи"}
                            icon={iconUsers} height={50}
                            onClick={props.actions[0]}/>
                </div>
                <div className={`col`}>
                    <Button id={ids.buttons.btnUsers}
                            text={""}
                            icon={iconLogout} height={50}
                            onClick={props.actions[2]}/>
                </div>
            </div>
        </div>
    )
}