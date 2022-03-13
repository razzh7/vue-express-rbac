import axios from "axios";
import Vue from "vue";
import Qs from "qs";
import store from "@/store"
import { Loading } from "element-ui";

const $axios = new axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 30000
})
Vue.prototype.$http = axios; // 并发请求
let loading = null; // 在全局请求和拦截中添加请求状态

// 请求拦截器: 检查user是否有token
$axios.interceptors.request.use(
    config => {
        loading = Loading.service({text: '拼命加载中～'});
        const token = store.getters.token;
        if(token) {
            config.headers.Authorization = token; // 请求头部添加token
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

/**
 * 响应拦截器
 * 1、关闭loading
 * 2、判断各类code码状态
 */
$axios.interceptors.response.use(
    res => {
        if(res) {
            loading.close(); // 请求成功关闭loading
            return Promise.resolve(res.data);
        }
    },
    err => {
        loading.close();
    }
)
// 合并axios.create(config)的配置
/**
 * qs.stringify和JSON.stringify区别
 * 
 * var a = {name:'hehe',age:10};
 *  qs.stringify(a)
 * 'name=hehe&age=10'
 * JSON.stringify(a)
 * '{"name":"hehe","age":10}';
 * 
 */
export default {
    post(url,data) {
        return $axios({
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' }, // Post请求需要添加请求头
            url,
            data: Qs.stringify(data) // axios默认把Object转成JSON对象，需要使用qs.stringify序列化成URL形式
        })
    },
    get(url,params) {
        return $axios({
            method: 'GET',
            url,
            params
        })
    }
}

