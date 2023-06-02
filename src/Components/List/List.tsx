import {IListProps} from "./IListProps";
import {useEffect, useState} from "react";
import Row from "./Row/Row";

export function List(props: IListProps){
    return(
        <div>
            {props.list.map((element) => <Row data={element} onUpdate={props.onUpdate} />)}
        </div>
    )
}