import { useEffect, useState } from "react";
import { IDay } from "./CreateDay";

export interface ISelect {
    className: string;
    labelName: string;
    value: string;
    selectList: IDay[];
    getResult: (obj: any) => void;
}

const Select = (props: ISelect) => {
    const [select, setSelect] = useState(props);
    
    useEffect(() => {
        setSelect(props)
    }, [props.selectList]);

    return (
        <>
            <div className={select.className}>
                <label>{select.labelName}</label>
                <select
                    value={select.value}
                    onChange={(e) => {
                        setSelect({...select, value: e.target.value})
                    }}
                    onBlur={() => {
                        props.getResult({ day: select.value })
                    }}
                    >
                    {select.selectList.map(day => (
                        <option key={day.id} value={day.day}>{day.day}</option>  
                    ))}
                </select>
            </div>
        </>
    )
}

export default Select;