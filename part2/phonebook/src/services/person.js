import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

const add = personObj => {
    const request = axios.post(baseUrl, personObj);
    return request.then(response => response.data);
}

const remove = id => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(response => response.data);
}

const update = (personObj) => {
    const request = axios.put(`${baseUrl}/${personObj.id}`, personObj);
    return request.then(response => response.data);
}

export default { getAll, add, remove, update };




