import Menu from "../../Components/Menu/Menu";
import Logo from "../../Components/Logo/Logo";
import { useState} from "react";
import classes from './Layout.module.css'
import {Navigate} from "react-router-dom";
import {ILayoutProps} from "./ILayoutProps";
import Profile from "../Profile/Profile";
import Users from "../Users/Users";

export default function Layout(props:ILayoutProps){
    debugger
    const ids = {
        menu: "layout-menu",
        content: "layout-content"
    }
    const [content, setContent] = useState<JSX.Element>(props.content);
    const setContentProfile = () =>{
        setContent(<Profile id={ids.content} />)
    }
    const setContentUsers = () => {
        setContent(<Users id={ids.content}/>);
    }
    const Logout = () => {
        localStorage.setItem("token", "");
        setContent(<Navigate to="/" />)
    }
    return (
        <div>
            <div className={classes.logo}>
                <Logo />
            </div>
            <Menu id={ids.menu}
                  actions={[setContentUsers, setContentProfile, Logout]}/>
            {content}
        </div>
    )
}