import service from '@/util/reqResService.js';

export default class User {
  static baseGroupURL = `api`;

  static async getUsers() {
    const resp = await service.get(`${this.baseGroupURL}/users?per_page=12`);
    return resp;
  }
}