import { useEffect } from "react";
import { ILatLng, useFetch } from "./NaverMap";

const KakaoMap = () => {
    const { data } = useFetch('http://localhost:3001/accidentDeath');
    let map = null;

    useEffect(()=> {
        const container = document.getElementById('map');
        const options = {
            center: new window.kakao.maps.LatLng(37.4774850239682, 126.94857097090423), //지도의 중심좌표.
	        level: 14 //지도의 레벨(확대, 축소 정도)
        };

        map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

        const clusterer = new window.kakao.maps.MarkerClusterer({
            map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
            averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
            minLevel: 10, // 클러스터 할 최소 지도 레벨
        });

        if(data && data.length > 0) {
            // 데이터에서 좌표 값을 가지고 마커를 표시합니다.
            // 마커 클러스터러로 관리할 마커 객체는 생성할 때 지도 객체를 설정하지 않습니다.
            for(let i = 0; i < 1000; i ++){}
            const markers = data.map((el: ILatLng, idx: number)=> {
                if(idx < 1000){
                    return new window.kakao.maps.Marker({
                        position: new window.kakao.maps.LatLng(el.grd_la, el.grd_lo)
                    });
                }
            });

            clusterer.addMarkers(markers);
        }
    }, [data]);

    return (
        <>
            <div>
                <div id="map" style={{width: '100%',height: '500px'}}></div>
            </div>
        </>
    )
}

export default KakaoMap;