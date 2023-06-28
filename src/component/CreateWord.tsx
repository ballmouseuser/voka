import React, { useEffect, useRef, useState } from "react";
import { useHistory } from 'react-router';
import useFetch from "../hooks/useFetch";
import { IDay } from "./CreateDay";
import Select from "./Select";
import DayHeader from "./DayHeader";

export interface ICreateWord {
    day: string;
}

const CreateWord = (props: ICreateWord) => {
    const days: IDay[] = useFetch('http://localhost:3001/days');
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [selectValue, setSelectValue] = useState({
        day: '1',
    });
    
    useEffect(()=> {
        if(days.length > 0){
            setSelectValue({day: days[0].day});
        }

    }, [days]);

    const getResult = (obj: {day: string}) => {
        setSelectValue(obj);
    }
    
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if(!isLoading 
            && selectValue.day && engRef.current && engRef.current.value && korRef.current && korRef.current.value
            ){
            setIsLoading(true)

            const day = selectValue.day;
            const eng = engRef.current.value;
            const kor = korRef.current.value;
            
            fetch(`http://localhost:3001/words/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json',
                    },
                    body: JSON.stringify({
                        day : day,
                        eng : eng,
                        kor : kor,
                        isDone : false,
                    })
                })
            .then(res => {
                if(res.ok) {
                    alert('생성이 완료 되었습니다.');
                    history.push(`/day/${day}`)
                    setIsLoading(false);
                }
            });
        }
        else {
            alert('입력값을 확인해주세요.')
        }
    }

    const engRef = useRef<HTMLInputElement>(null);
    const korRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <div>
                <DayHeader />
                <form onSubmit={onSubmit}>
                    <div className="input_area">
                        <label>Eng</label>
                        <input type="text" placeholder="computer" ref={engRef}></input>
                    </div>
                    <div className="input_area">
                        <label>Kor</label>
                        <input type="text" placeholder="컴퓨터" ref={korRef}></input>
                    </div>
                    <Select className="input_area" labelName="day" selectList={days} value={selectValue.day} getResult={getResult}/>
                    <button style={{
                        opacity: isLoading ? 0.3 : 1
                    }}>{isLoading ? 'Saving...' : '저장'}</button>
                </form>
            </div>
        </>
    );
}

export default CreateWord;