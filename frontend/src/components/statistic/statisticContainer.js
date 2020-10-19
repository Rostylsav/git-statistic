import { connect } from 'react-redux';

import Statistic from './Statistic';
import { getStatistics } from '../../actions/actionCreators';

const mapStateToProps = state => ({
    statistics: state.statistics,
    repositories: state.repositories,
    users: state.users,
});

const mapDispatchToProps = dispatch => ({
    getStatistics: params => dispatch(getStatistics(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(Statistic);