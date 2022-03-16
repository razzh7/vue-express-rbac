import $axios from "./request";
export function roleList() {
    const url = '/roles';
    return $axios.get(url);
}