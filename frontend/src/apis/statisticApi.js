import axios from 'axios';
const callStatisticApi = params =>
    axios.get('http://localhost:5000/get-statistic', {
        params: {
            selectedRepositories: JSON.stringify(params.selectedRepositories),
            selectedUser: JSON.stringify(params.selectedUser)
        }
    })
export default callStatisticApi;