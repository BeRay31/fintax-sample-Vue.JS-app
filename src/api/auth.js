import service from '@/util/reqResService.js';
// api from https://reqres.in/
export default class Authorization {
  static baseGroupURL = `api`

  static async loginSuccess(formData) {
    const resp = await service.post(`${this.baseGroupURL}/login`, formData);
    return resp;
  }
}