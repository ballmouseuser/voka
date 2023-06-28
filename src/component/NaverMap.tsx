import { useEffect, useState, useRef, forwardRef } from "react";
import { useAsync } from 'react-async';
import AlertDialog, { IDialog, IDialogData } from './Dialog';
import useDidMountEffect from "../hooks/useDidMountEffect";

export interface ILatLng {
    grd_la: string,
    grd_lo: string,
    year: number,
}

export const useFetch = (url: string) => {
    const [data, setData] = useState<ILatLng[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(url);
            const json = await response.json();
            setData(json);
        }
        fetchData();
    }, [url]);

    return { data };
}

const NaverMap = () => {
    let map: any = null;
    let userLocationMarker: any = null;

    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogData, setDialogData] = useState<IDialogData>({grd_la: '', grd_lo: '', year: 0});

    const { data } = useFetch('http://localhost:3001/accidentDeath');

    
    useDidMountEffect(() => {
        const markers: any = [];

        const container = document.getElementById('content');
        const options = {
            center: new window.naver.maps.LatLng('37.4774850239682', '126.94857097090423'),
            zoom: 15,
            mapDataControl: false,
            scaleControl: false,
        }
        
        map = new window.naver.maps.Map(container, options);

        if(data && data.length > 0){
            for(let i = 0; i < 100; i++){
                const marker = new window.naver.maps.Marker({
                    position: new window.naver.maps.LatLng(data[i].grd_la, data[i].grd_lo),
                    map,
                });
                marker.addListener('click', () => {
                    handlerClickOpen({year: data[i].year, grd_la: data[i].grd_la, grd_lo: data[i].grd_lo});
                });

                markers.push(marker);
            }
        }
        window.naver.maps.Event.addListener(map, 'center_changed', (center: any) => {
            //map center change event
        });

        // userLocationMarker = new window.naver.maps.Marker({
        //     position: new window.naver.maps.LatLng('37.4774850239682', '126.94857097090423'),
        //     map,
        // });
        
        // window.naver.maps.Event.addListener(userLocationMarker, 'click', (obj: any) => {
        //     marker click event
        //     console.log(obj)
        //     console.log(userLocationMarker)
        // });

        var htmlMarker1 = {
            content: '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-1.png);background-size:contain;"></div>',
            size: new window.naver.maps.Size(40, 40),
            anchor: new window.naver.maps.Point(20, 20)
        },
        htmlMarker2 = {
            content: '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-2.png);background-size:contain;"></div>',
            size: new window.naver.maps.Size(40, 40),
            anchor: new window.naver.maps.Point(20, 20)
        },
        htmlMarker3 = {
            content: '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-3.png);background-size:contain;"></div>',
            size: new window.naver.maps.Size(40, 40),
            anchor: new window.naver.maps.Point(20, 20)
        },
        htmlMarker4 = {
            content: '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-4.png);background-size:contain;"></div>',
            size: new window.naver.maps.Size(40, 40),
            anchor: new window.naver.maps.Point(20, 20)
        },
        htmlMarker5 = {
            content: '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-5.png);background-size:contain;"></div>',
            size: new window.naver.maps.Size(40, 40),
            anchor: new window.naver.maps.Point(20, 20)
        };

        var markerClustering = new window.MarkerClustering({
            minClusterSize: 2,
            maxZoom: 8,
            map: map,
            markers: markers,
            disableClickZoom: false,
            gridSize: 120,
            icons: [htmlMarker1, htmlMarker2, htmlMarker3, htmlMarker4, htmlMarker5],
            indexGenerator: [10, 100, 200, 500, 1000],
            stylingFunction: (clusterMarker: any, count: any) => {
                clusterMarker.getElement().querySelector('div:first-child').innerText = count;
                // $(clusterMarker.getElement()).find('div:first-child').text(count);
            }
        });
    }, [data]);

    const handlerClickOpen = (data: ILatLng) => {
        setDialogData(data);
        setDialogOpen(true);
    };

    const handlerClose = () => {
        setDialogOpen(false);
    };

    return (
        <>
            <div>
                <div id="content" style={{width: '100%', height: '500px'}} />
                <AlertDialog open={dialogOpen} close={handlerClose} data={{year: dialogData.year, grd_lo: dialogData.grd_lo, grd_la: dialogData.grd_la}}/>
            </div>
        </>
    )
}

export default NaverMap;