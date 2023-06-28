import { Link, useLocation } from "react-router-dom"

const IndexPage = () => {
    const pageList = [
        {name: '데이 리스트', link: '/dayList'},
        {name: '네이버 지도', link: '/naver_map'},
        {name: '카카오 지도', link: '/kakao_map'},
        {name: '리스트 더보기', link: '/pagination'},
    ]
    return (
        <>
            <ul className="list_day">
                {pageList.map(data => (
                    <li key={data.link}>
                        <Link to={data.link}>{data.name}</Link>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default IndexPage;