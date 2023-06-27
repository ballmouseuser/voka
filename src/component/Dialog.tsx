import { useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

export interface IDialog {
    open: boolean;
    close: () => void;
    data: IDialogData;
}

export interface IDialogData {
    year: number;
    grd_lo: string;
    grd_la: string;
}

const AlertDialog = (props: IDialog) => {
    const {open, close, data} = props;

    return (
        <>
            <div>
                <Dialog
                    open={open}>
                        <Button onClick={close}>닫기</Button>
                        <DialogTitle>
                            {props.data.year}
                        </DialogTitle>
                        <DialogContent>
                            {props.data.grd_lo} , {props.data.grd_la}
                        </DialogContent>
                </Dialog>
            </div>
        </>
    )
}

export default AlertDialog;