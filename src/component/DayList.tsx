import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { IDay } from "./CreateDay";
import DayHeader from "./DayHeader";

const DayList = () => {
    const days: IDay[] = useFetch('http://localhost:3001/days');

    if(days.length === 0){
        return <span>Loading...</span>
    }

    return (
        <>
            <div>
                <DayHeader />
                <ul className="list_day">
                    {days.map(day => (
                    <li key={day.id}>
                        <Link to={`/day/${day.day}`}>Day {day.day}</Link>
                    </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default DayList;