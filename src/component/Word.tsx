import React, { useEffect } from "react";
import { useState } from "react";
import MUIButton from '@mui/material/Button'
import { Theme, makeStyles } from "@material-ui/core";
import Button from "./Button";

interface IProps {
    word : IWord;
}

export interface IWord {
    id: number;
    day: number;
    eng: string;
    kor: string;
    isDone: boolean;
}

const Word = ({word: w}: IProps) => {
    const [word, setWord] = useState(w);
    const [isShow, setIsShow] = useState(false);
    const [isDone, setIsDone] = useState(word.isDone);

    const toggleShow = () => {
        setIsShow(!isShow);
    }

    const toggleDone = () => {
        // setIsDone(!isDone);
        fetch(`http://localhost:3001/words/${word.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    ...word,
                    isDone : !isDone,
                })
            })
        .then(res => {
            if(res.ok) {
                setIsDone(!isDone);
            }
        });
    }

    const del = () => {
        if(window.confirm('삭제하시겠습니까?')){
            fetch(`http://localhost:3001/words/${word.id}`, {
                method: 'DELETE',
            })
            .then(res => {
                if(res.ok){
                    setWord({
                        ...word, id: 0
                    });
                }
            });
        }
    }

    if(word.id === 0){
        return null;
    }

    const defaultButtonClass = {
        fontWeight: 'bold',
        fontSize: '18px',
        cursor: 'pointer',
        border: '0 none',
        borderRadius: '6px',
        padding: '10px 20px',
        color: '#fff',
        backgroundColor: 'dodgerblue',
    }


    return (
        <tr className={isDone ? 'off' : ''}>
            <td>
                <input type="checkbox" checked={isDone} onChange={toggleDone}/>
            </td>
            <td>{word.eng}</td>
            <td>{isShow && word.kor}</td>
            <td>
                <Button style={
                    defaultButtonClass
                } value={isShow ? '뜻 숨기기' : '뜻 보기'}
                clickEvent={toggleShow}/>
                <Button style={
                    {...defaultButtonClass,
                        marginLeft: 10,
                        color: '#fff',
                        backgroundColor: 'firebrick',}
                } value="삭제"
                clickEvent={del}/>

            </td>
        </tr>
    );
}

export default Word;