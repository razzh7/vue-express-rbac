import $axios from "./request";
export function login(data) {
    const url = '/login';
    return $axios.post(url, data);
}