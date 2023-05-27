import axios, { AxiosInstance } from "axios";

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $axios: AxiosInstance;
    }
}

const api = axios.create({ baseURL: "http://47.114.5.201:8091" });

export { api };
