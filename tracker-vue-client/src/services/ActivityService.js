import axios from 'axios';

const base_url = '/api/activity_records';

// this talks to the server
export default {
    getAllActivityRecords() {
        return axios.get(base_url).then( (response) => {
            return response.data;
        })
    },

    addActivityRecord(record) {
        return axios.post(base_url, record).then( (response) => {
            return response.data;
        })
    },

    updateActivityRecord(record) {
        // example: form an api request for /api/activity_records/2
        return axios.patch(`${base_url}/${record.id}`, record).then( (response) => {
            return response.data;
        })
    },

    deleteActivityRecord(id) {
        return axios.delete(`${base_url}/${id}`).then( (response) => {
            return response.data;
        })
    }
}