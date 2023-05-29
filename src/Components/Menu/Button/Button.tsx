import {IButtonProps} from "./IButtonProps";
import classes from "./Button.module.css"
export default function Button(props: IButtonProps){
    return(
        <div id={props.id} className={`row ${classes.content}`} onClick={props.onClick}>
            <div className={`col ${classes.icon}`}>
                <img style={{height: `${props.height}px`, width: "auto"}} src={props.icon}/>
            </div>
            <div className={`col ${classes.text}`}>
                {props.text}
            </div>
        </div>
    )
}