import axios from 'axios';
const getStatuses = items => 
    axios.get('http://localhost:5000/get-statuses', {
        params: {
          repositories: JSON.stringify(items)
        }
    })

export default getStatuses;