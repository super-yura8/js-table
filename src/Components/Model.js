import axios from "axios";

const ApiModel = axios.create({
    baseURL: "https://swapi.dev/api",
    responseType: "json"
});

class Api {
    static getPeoples(page = 1) {
        return ApiModel.get('/people/?page=' + page)
            .then(result => result.data);
    }
}

export default Api;

