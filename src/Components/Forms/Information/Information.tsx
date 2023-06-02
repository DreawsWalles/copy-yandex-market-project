import {IInformationProps} from "./IInformationProps";
import classes from "./Information.module.css";
export default function Information(props: IInformationProps){
    return(
        <div className={`${classes.content}`}>
            <div className={`row ${classes.row}`}>
                <div className={`col ${classes.element}`}>
                    <div>
                        {props.data.name}
                    </div>
                    <div className={`${classes.label}`}>
                        Имя
                    </div>
                </div>
                <div className={`col-1`}></div>
                <div className={`col ${classes.element}`}>
                    <div>
                        {props.data.surname}
                    </div>
                    <div className={`${classes.label}`}>
                        Фамилия
                    </div>
                </div>
            </div>
            <div className={`row ${classes.row}}`}>
                <div className={`col-9 ${classes.element}`}>
                    <div>
                        {props.data.patronymic}
                    </div>
                    <div className={`${classes.label}`}>
                        Отчество
                    </div>
                </div>
                <div className={`col-1`}></div>
                <div className={`col ${classes.element}`}>
                    <div>
                        {props.data.age}
                    </div>
                    <div className={`${classes.label}`}>
                        Возраст
                    </div>
                </div>
            </div>
        </div>
    )
}