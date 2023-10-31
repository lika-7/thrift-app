import React from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'

interface KakaoMapProps {
    setCustomValue?: (id:string, value: number)=> void // detailpage에서는 데이터 수정 못하고 보여주게만 할거임
    latitude:number
    longitude:number
    detailPage?:boolean
}

const KakaoMap = ({
    setCustomValue,
    latitude,
    longitude,
    detailPage = false // 카카오 맴을 upload외에 다른 페이지에서도 사용하는 분기처리
}:KakaoMapProps) => {

  const handleClick = (mouseEvent: kakao.maps.event.MouseEvent) =>{
    if(detailPage) return
    setCustomValue!('latityde', mouseEvent.latLng.getLat())
    setCustomValue!('longitude', mouseEvent.latLng.getLng())
  }

  return (
    <Map
      center={{ lat: latitude, lng: longitude }}
      style={{ width: "100%", height: "360px" }}
      onClick={(_, mouseEvent) => handleClick(mouseEvent)}
    >
      <MapMarker position={{ lat: latitude, lng: longitude }}>
        
      </MapMarker>
    </Map>
  )
}

export default KakaoMap