import {IUsersProps} from "./IUsersProps";
import classes from "./Users.module.css"
import {useEffect, useState} from "react";
import {UserEntity} from "../../Entities/UserEntity";
import {GetAll} from "../../Swapi/SwapiUsers";
import {List} from "../../Components/List/List";
export default function Users(props: IUsersProps){
    const [users, setUsers] = useState<UserEntity[]>();
    useEffect(() => {
        (() => {
            setUsers(GetAll());
        })()
    }, [])
    return(
        <div className={classes.content}>
            <div className={`${classes.title}`}>
                Пользователи
            </div>
            <div>
                <List list={users as UserEntity[]}/>
            </div>
        </div>
    )
}