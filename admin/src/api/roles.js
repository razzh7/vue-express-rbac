import $axios from "./request";
import Qs from "qs";

// 获取角色列表
export function roleList() {
    const url = '/roles';
    return $axios.get(url);
}

// 添加角色
export function roleAdd(data) {
    const url = '/roles/add';
    return $axios.post(url, data)
}

// 编辑角色
export function roleEdit(data) {
    const url = '/roles/edit'
    return $axios.post(url, data)
}

// 删除角色
export function roleDelete(data) {
    const url = '/roles/delete'
    return $axios.post(url, data)
}

// 角色授权
export function doAuthRoleRoutes(data) {
    const url = '/roles/doAuth'
    console.log(123142,Qs.stringify(data))
    return $axios.post(url, data)
  }