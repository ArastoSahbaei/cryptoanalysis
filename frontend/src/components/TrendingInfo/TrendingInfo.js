import React, { useEffect, useState } from 'react'
import CryptoShuttleService from '../../utils/api/services/CryptoShuttleService';
import './TrendingInfo.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPepperHot } from '@fortawesome/free-solid-svg-icons'

export const TrendingInfo = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [trendingInfo, setTrendingInfo] = useState([]);

    const fetchData = async () => {
        try {
            const { data } = await CryptoShuttleService.trendingInfo()
            setIsLoaded(true);
            setTrendingInfo(data);
        } catch (error) {
            setIsLoaded(true);
            setError(error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div></div>;
    } else {
        return (
            <div className="trending-info">
                <div className="header">
                    <FontAwesomeIcon icon={faPepperHot} size="2x" color="red"/>
                    <h3>Trending</h3>
                </div>
                {Object.keys(trendingInfo).map((key, index) => (
                    <div key={index}>
                        <Link to={`/coins/${key}`} className="trending-links"><h4>{key}</h4></Link>
                        <div>${trendingInfo[key].usd}</div>
                        <div className={(trendingInfo[key].usd_24h_change < 0) ? 'negative' : 'positive'}>
                           <div>{trendingInfo[key].usd_24h_change.toLocaleString()} %</div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}