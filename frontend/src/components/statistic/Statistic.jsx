import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import getStatisticsObj from './helper';
import './statistic.scss';

const Statistic = ({
    statistic,
    repositories,
    users,
    getStatistics
}) => {
    const [statisticData, setStatisticData] = useState(statistic);
    const [repositoriesData, setRepositoriesData] = useState(repositories);
    const [usersData, setUsersData] = useState(users);
    console.log(statisticData)
    
    useEffect(() => {
        setStatisticData(statistic);
        setRepositoriesData(repositories)
        setUsersData(users)
    }, [statistic, repositories, users]);

    return (
        <div className="statistic-container">
            <button
                className="get-statistic-button"
                onClick={() => getStatistics(getStatisticsObj(repositoriesData, usersData))}>
                    Get statisitc
                </button>
            <div>
                Stats
            </div>
        </div>
    )
}

Statistic.defaulProps = {
    statistic: {},
    repositories: [],
    users: [],
    getStatistics: () => {},
}

Statistic.propTypes = {
    statistic: PropTypes.object,
    repositories: PropTypes.array,
    users: PropTypes.array,
    getStatistics: PropTypes.func,
}

export default Statistic;