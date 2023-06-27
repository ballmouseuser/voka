import React from "react";
import { Theme, makeStyles } from "@material-ui/core";
import MUIButton from '@mui/material/Button'

export interface IButton {
    style: object;
    clickEvent: Function;
    value: string;
}


const Button = (props: IButton) => {
    return (
        <>
            <MUIButton style={props.style} onClick={() => {
                props.clickEvent()
            }}>{props.value}</MUIButton>
        </>
    )
};

export default Button;