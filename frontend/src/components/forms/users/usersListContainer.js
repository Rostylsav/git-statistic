import { connect } from 'react-redux';
import CheckList from '../../checkList/CheckList';
import {removeUsers, addUser, selectUsers} from '../../../actions/actionCreators';

const mapStateToProps = state => ({
    items: state.users
});

const mapDispatchToProps = dispatch => ({
    addItem: itemObject => dispatch(addUser(itemObject)),
    removeItems: ids => dispatch(removeUsers(ids)),
    selectItems: (ids, value) => dispatch(selectUsers(ids,value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckList);