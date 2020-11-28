import axios from 'axios';

const API_URL = `http://localhost:3001`;

class JoblyApi {

  static async request(endpoint, paramsOrData = {}, verb = "get") {
    const userData = JSON.parse(localStorage.getItem('userData') || null);
    const token = userData ? userData.token : null;
    const headers = {};
    if (token) headers.Authorization = `Bearer ${token}`;

    console.debug("API Call:", endpoint, paramsOrData, verb);

    try {
      return (await axios({
        method: verb,
        url: `${API_URL}/${endpoint}`,
        headers,
        [verb === "get" ? "params" : "data"]: paramsOrData})).data;
        // axios sends query string data via the "params" key,
        // and request body data via the "data" key,
        // so the key we need depends on the HTTP verb
    }

    catch(err) {
      console.error("API Error:", err.response);
      if (err.response) {
        let message = err.response.data.error.message;
        throw Array.isArray(message) ? message : [message];
      }
      throw "Server error";
    }
  }

  static async getUserToken(data) {
    let res = await this.request(`auth/token`, data, 'post');
    return res.token;
  }

  static async registerUser(data) {
    let res = await this.request(`auth/register`, data, 'post');
    return res.token;
  }

  static async getUserDetails(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static async updateUserDetails(username, data) {
    let res = await this.request(`users/${username}`, data, 'patch');
    return res.user;
  }

  static async applyToJob(username, jobId) {
    let res = await this.request(`users/${username}/jobs/${jobId}`, null, 'post');
    return res.applied;
  }

  static async getCompanies(queryParams = {}) {
    let res = await this.request(`companies`, queryParams);
    return res.companies;
  }

  static async getCompanyDetails(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  static async createCompany(data) {
    let res = await this.request(`companies`, data, 'post');
    return res.company;
  }

  static async updateCompany(handle, data) {
    let res = await this.request(`companies/${handle}`, data, 'patch');
    return res.company;
  }

  static async deleteCompany(handle) {
    await this.request(`companies/${handle}`, null, 'delete');
  }

  static async getJobs(queryParams = {}) {
    let res = await this.request(`jobs`, queryParams);
    return res.jobs;
  }

  static async getJobDetails(id) {
    let res = await this.request(`jobs/${id}`);
    return res.job;
  }

  static async createJob(data) {
    let res = await this.request(`jobs`, data, 'post');
    return res.job;
  }

  static async updateJob(id, data) {
    let res = await this.request(`jobs/${id}`, data, 'patch');
    return res.job;
  }

  static async deleteJob(id) {
    await this.request(`jobs/${id}`, null, 'delete');
  }
}

export default JoblyApi;