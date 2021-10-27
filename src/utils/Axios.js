import axios from "axios";
import * as TokenService from "../services/TokenService";

/* @internal */
const API_HOST = "https://api.freelancingblog.co";

class Request {
  constructor() {
    this.baseURL = API_HOST;
    this.isRefreshing = false;
    this.failedRequests = [];
    // this.tokenService = new TokenService();
    this.client = axios.create({
      baseURL: API_HOST,
      headers: {
        clientSecret: this.clientSecret,
      },
    });
    this.beforeRequest = this.beforeRequest.bind(this);
    this.onRequestFailure = this.onRequestFailure.bind(this);
    this.processQueue = this.processQueue.bind(this);
    this.client.interceptors.request.use(this.beforeRequest);
    this.client.interceptors.response.use(
      this.onRequestSuccess,
      this.onRequestFailure
    );
  }

  beforeRequest(request) {
    const token = TokenService.getAccessToken();
    request.headers.Authorization = token.token_type + " " + token.access_token;
    return request;
  }

  static onRequestSuccess(response) {
    return response.data;
  }

  async onRequestFailure(err) {
    const { response } = err;
    if (
      response.status === 401 &&
      err &&
      err.config &&
      !err.config.__isRetryRequest
    ) {
      if (this.isRefreshing) {
        try {
          const token = await new Promise((resolve, reject) => {
            this.failedRequests.push({ resolve, reject });
          });
          err.config.headers.Authorization = `${
            TokenService.getAccessToken().token_type
          } ${token}`;
          return this.client(err.config);
        } catch (e) {
          return e;
        }
      }
      this.isRefreshing = true;
      err.config.__isRetryRequest = true;
      return new Promise((resolve, reject) => {
        TokenService.refreshAccessToken()
          .then((token) => {
            // console.log(token);
            TokenService.setAccessToken(token);
            err.config.headers.Authorization = `${
              TokenService.getAccessToken().token_type
            } ${token}`;
            this.isRefreshing = false;
            this.processQueue(null, token);
            resolve(this.client(err.config));
          })
          .catch((e) => {
            this.processQueue(e, null);
            reject(err.response);
          });
      });
    }
    throw response;
  }

  processQueue(error, token = null) {
    this.failedRequests.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });
    this.failedRequests = [];
  }
}

const request = new Request();

export default request.client;
