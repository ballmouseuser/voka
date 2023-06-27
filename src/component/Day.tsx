import React, { useEffect } from "react";
import { useHistory, useParams } from 'react-router-dom';
import Word, { IWord } from './Word';
import useFetch from '../hooks/useFetch';

const Day = () => {
    const history = useHistory();
    const { day } = useParams<{day: string}>();
    const words: IWord[] = useFetch(`http://localhost:3001/words?day=${day}`);

    const deleteDay = () => {
        if(words.length > 0) {
            alert('영단어가 남아있어 삭제할 수 없습니다.');
            return;
        }

        if(window.confirm('삭제하시겠습니까?')){
            fetch(`http://localhost:3001/days/${day}`, {
                method: 'DELETE',
            })
            .then(res => {
                if(res.ok){
                    history.push('/');
                }
            });
        }
    }

    return (
        <>
            <h2>Day {day}</h2>
            {
                words.length === 0 && <span>Loading..</span>

            }
            <br/>
            {
                words.length === 0 && <button onClick={deleteDay}>Delete Day</button>

            }
            <table>
                <tbody>
                    {words.map(word => (
                        <Word word={word} key={word.id} />
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Day;