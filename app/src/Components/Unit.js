import React, { useEffect, useState } from 'react'

import speedStatIcon from '../Images/speed-stats-01.svg'
import healthStatIcon from '../Images/health-stats-01.svg'
import artifactStatIcon from '../Images/artifact-stats-01.svg'
import itemSetStatIcon from '../Images/item-stats-01.svg'

const Unit = (props) => {

    const [image, setImage] = useState(null)

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await import(`../Images/Characters/${props.image}`)
                setImage(response.default)
            } catch (err) {
                console.log(err)
            }
        }
        fetchImage()
    }, [props.image])

    return (
        <>
            <div className="unit">
                <div className="icon">
                    <img src={image} alt="" />
                </div>
                <div className="stats">
                    <div className="stat">
                        <img src={speedStatIcon} alt="" />
                        <span>{props.speed}</span>
                    </div>
                    <div className="stat">
                        <img src={healthStatIcon} alt="" />
                        <span>{props.health}</span>
                    </div>
                    <div className="stat">
                        <img src={artifactStatIcon} alt="" />
                        <span>{props.artifact}</span>
                    </div>
                    <div className="stat">
                        <img src={itemSetStatIcon} alt="" />
                        <span>{props.itemSet}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Unit