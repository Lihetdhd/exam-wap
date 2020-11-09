import axios from "axios";
import utils from "@utils/common";
// import loading from "./loading";
import router from "../router";
import { Dialog } from "vant";
//axios配置

axios.defaults.timeout = 100000; //请求超时时间
axios.defaults.withCredentials = true; //允许跨域携带 Cookie

var needLoadingRequestCount = 0;

// 请求拦截器
axios.interceptors.request.use(
  function(config) {
    // 加入token
    config.headers = {
      "X-Access-Token": utils.getStorage("token"),
    };
    showFullScreenLoading();
    return config;
  },
  function(error) {
    // loading.hide();
    needLoadingRequestCount = 0;
    return Promise.reject(error);
  }
);
// 响应拦截器
axios.interceptors.response.use(
  (res) => {
    tryHideFullScreenLoading();
    switch (res.data.code) {
      case 1001:
        Dialog.confirm({
          title: "提示",
          message: "您还未登录，是否前往登录。",
        }).then(() => {
          router.push("/loginBind");
        });
        break;
      case 500:
        Dialog({ message: "res.data.message" });
        break;
    }
    return res;
  },
  function(error) {
    // loading.hide();
    needLoadingRequestCount = 0;

    switch (error.request.status) {
      case 500:
        Dialog({ message: "服务器发生错误。" });
        break;
    }
    return Promise.reject(error);
  }
);

//loading 处理逻辑

//显示
function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    // loading.show();
  }
  needLoadingRequestCount += 1;
}
//隐藏
function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount -= 1;
  if (needLoadingRequestCount === 0) {
    // loading.hide();
  }
}

export default {
  get(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .get(url, {
          params: params,
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.data);
        });
    });
  },
  post(url, data) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, data)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.data);
        });
    });
  },
};
