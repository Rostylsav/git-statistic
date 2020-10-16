import { connect } from 'react-redux';
import CheckList from '../../checkList/CheckList';
import {removeItems, addItem} from '../../../actions/actionCreators';

const mapStateToProps = state => ({
    items: state.repositories
});

const mapDispatchToProps = dispatch => ({
    addItem: itemObject => dispatch(addItem(itemObject)),
    removeItems: ids => dispatch(removeItems(ids))
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckList);