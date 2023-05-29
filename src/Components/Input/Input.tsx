import {IInputProps} from "./IInputProps";
import classes from './Input.module.css'
import globalClasses from '../../App.module.css';
import {Hint} from "../../Functions";
export default function Input(props: IInputProps){
    const onChange = (e: any) => {
        props.setValue(e.target.value);
        Hint(props.idError, "", "hide");
    }
    return (
        <div className={`${classes.content}`}>
            <div className={`row`}>
                {
                    props.value ?
                        <input id={props.id}
                               className={`col ${classes.input}`}
                               type={props.type}
                               onInput={onChange} value={props.value}/>
                        :
                        <input id={props.id}
                               className={`col ${classes.input}`}
                               type={props.type}
                               onInput={onChange} />
                }

                {
                    props.label &&

                    <label id={props.label.id} className={classes.label}>{props.label.text}</label>
                }
            </div>
            <div className={`row`}>
                <span id={props.idError}
                      className={`col ${classes.error} ${globalClasses.none}`}></span>
            </div>
        </div>
    )
}