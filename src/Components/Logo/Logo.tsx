import classes from "./Logo.module.css";

export default function Logo(){
    return(
        <div>
            <span className={`${classes.firstWord}`}>App</span>
            <span className={`${classes.secondWord}`}>.react</span>
        </div>
    )
}