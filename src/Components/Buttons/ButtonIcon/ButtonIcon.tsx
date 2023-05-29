import {IButtonIconProps} from "./IButtonIconProps";
import classes from "./ButtonIcon.module.css"
import {useEffect, useState} from "react";
export default function ButtonIcon(props: IButtonIconProps){
    const [width, setWidth] = useState<number>(props.width)
    const [theme, setTheme] = useState<string>();

    useEffect(() => {
        (() => {
            switch (props.theme) {
                case "Success":
                    setTheme(classes.success);
                    break;
                case "Cancel":
                    setTheme(classes.cancel);
                    break;
            }
        })()
    }, [])
    const onClick = () => {
        setWidth(width * 0.8);
        props.onClick();
    }
    useEffect(() => {
        (() => {
            setInterval(() => { setWidth(props.width);}, 1250);
        })()
    }, [width])
    return(
        <button id={props.id} className={`${classes.content} ${theme}`} onClick={onClick}>
            <img src={props.icon} style={{width: `${width}px`, height: props.height ? `${props.height}px` : ''}}/>
        </button>
    )
}