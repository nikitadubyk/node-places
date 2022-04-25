import React, { useRef, useEffect } from 'react'

import './Map.css'

const Map = ({ center, zoom, className, style }) => {
    const mapRef = useRef()

    useEffect(() => {
        new window.ol.Map({
            target: mapRef.current.id,
            layers: [
                new window.ol.layer.Tile({
                    source: new window.ol.source.OSM(),
                }),
            ],
            view: new window.ol.View({
                center: window.ol.proj.fromLonLat([center.lng, center.lat]),
                zoom: zoom,
            }),
        })
    }, [center, zoom])

    return (
        <div
            ref={mapRef}
            className={`map ${className}`}
            style={style}
            id='map'
        ></div>
    )
}

export default Map
