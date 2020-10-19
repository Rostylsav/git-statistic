import { connect } from 'react-redux';
import CheckList from '../../checkList/CheckList';
import {
    removeRepositories,
    addRepository,
    selectRepositories,
    updateRepositories
} from '../../../actions/actionCreators';

const mapStateToProps = state => ({
    items: state.repositories,
    displayStatus: true
});

const mapDispatchToProps = dispatch => ({
    addItem: itemObject => dispatch(addRepository(itemObject)),
    removeItems: ids => dispatch(removeRepositories(ids)),
    selectItems: (ids, value) => dispatch(selectRepositories(ids,value)),
    updateItems: items => dispatch(updateRepositories(items))
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckList);