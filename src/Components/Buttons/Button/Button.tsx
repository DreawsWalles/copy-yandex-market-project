import classes from "./Button.module.css"
import {IButtonProps} from "./IButtonProps";
import {useEffect, useState} from "react";
export default function Button(props: IButtonProps){
    const [size, setSize] = useState("");
    const [theme, setTheme] = useState("");
    useEffect(() => {
        (() => {
            switch (props.size)
            {
                case "s":
                    setSize(classes.s);
                    break
            }
            switch (props.theme)
            {
                case "dark":
                    setTheme(classes.dark);
                    break;
                case "white":
                    setTheme(classes.white);
                    break
            }
        })()
    }, [])
    return(
        <button id={props.id}
                className={`btn ${classes.content} ${size} ${theme}`} onClick={props.onClick} disabled={props.disabled}>
            {props.text}
        </button>
    )
}