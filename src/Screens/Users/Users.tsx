import {IUsersProps} from "./IUsersProps";
import classes from "./Users.module.css"
import {useEffect, useState} from "react";
import {UserEntity} from "../../Entities/UserEntity";
import {GetAll} from "../../Swapi/SwapiUsers";
import {List} from "../../Components/List/List";
import Button from "../../Components/Buttons/Button/Button";
import Add from "../../Components/Forms/Add/Add";
export default function Users(props: IUsersProps){
    const ids = {
        buttons:
            {
                add: `${props.id}-btn-add`
            }
    }
    const [users, setUsers] = useState<UserEntity[]>([]);
    const [list, setList] = useState<JSX.Element>()
    const [isAddUser, setIsAddUser] = useState<boolean>(false);
    useEffect(() => {
        (() => {
            setUsers(GetAll());
        })()
    }, []);
    useEffect(() => {
        (() => {
            setList(<List list={users as UserEntity[]}
                          onUpdate={update}/>)
        })()
    }, [users]);
    const update = () => {
        setUsers(GetAll());
    }
    const add = () => {
        setUsers(GetAll());
        setIsAddUser(false);
    }
    const cancel = () => {
        setIsAddUser(false);
    }
    return(
        <div className={classes.content}>
            <div className={`${classes.title}`}>
                Пользователи
            </div>
            <div className={`${classes.list}`}>
                {list}
            </div>
            {
                !isAddUser ?
                    <div className={`row`}>
                        <div className={`col-2`}></div>
                        <div className={`col`}>
                            <Button id={ids.buttons.add}
                                    text={"Добавить пользователя"}
                                    size={"s"}
                                    theme={"dark"}
                                    onClick={() => {setIsAddUser(true)}}
                                    disabled={false} />
                        </div>
                        <div className={`col-2`}></div>
                    </div>
                    :
                    <div className={`row ${classes.subContent}`}>
                        <div className={`col-2`}></div>
                        <div className={`col`}>
                            <Add onUpdate={add}
                                 onCancel={cancel} />
                        </div>
                        <div className={`col-2`}></div>
                    </div>
            }
        </div>
    )
}