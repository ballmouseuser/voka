import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { ILatLng } from "./NaverMap";
import Header from "./Header";

interface IPagination extends ILatLng{
    id: string,
}

const Pagination = () => {
    const [pageNo, setPageNo] = useState(1);
    const [pageData, setPageData]  = useState<IPagination[]>([]);

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        fetchData();
    }, [pageNo]);

    const fetchData = () => {
        const apiFetch = async () => {
            const response = await fetch('http://localhost:3001/accidentDeath');
            const json: ILatLng[] = await response.json();
            return json;
        }

        apiFetch().then(data => {
            const list: IPagination[] = [];
            for(let i = (pageNo - 1) * 10 ; i < (pageNo - 1) * 10 + 10; i++){
                const id = i;
                list.push({...data[i], id: `list${id}`});
            }
            setPageData([...pageData, ...list]);
        });
    };

    return (
        <>
            <div>
                <Header />
                <div>
                    {pageData.map(data => (
                        <h3 key={data.id}>
                            {data.year} {data.grd_la} {data.grd_lo}
                        </h3>
                    ))}
                </div>
                <Button onClick={ () => {
                    setPageNo(pageNo + 1);
                }}>더보기</Button>
            </div>
        </>
    )
}

export default Pagination;