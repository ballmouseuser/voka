import React from "react";
import useFetch from "../hooks/useFetch";
import { useHistory } from 'react-router';
import DayHeader from './DayHeader'

export interface IDay {
    id: string;
    day: string;
}

const CreateDay = () => {
    const history = useHistory();
    const days: IDay[] = useFetch('http://localhost:3001/days/')

    const addDay = () => {
        fetch(`http://localhost:3001/days/`, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    day : days.length + 1,
                })
            })
        .then(res => {
            if(res.ok) {
                alert('생성이 완료 되었습니다.');
                history.push(`/dayList`)
            }
        });
    }

    return (
        <>
            <div>
                <DayHeader />
                <h3>현재일수 : {days.length}</h3>
                <button onClick={addDay}>Day 추가</button>
            </div>
        </>
    )
}

export default CreateDay;