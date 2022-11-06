import type { UserData, ChangePasswordData } from "../api/UserAPI";
import UserAPI from "../api/UserAPI";

class UsersController {
  private api: UserAPI;

  constructor() {
    this.api = new UserAPI();
  }

  async user(data: UserData) {
    try {
      await this.api.changeUser(data);
    } catch (error) {
      return;
    }
  }

  async changePassword(data: ChangePasswordData) {
    try {
      await this.api.changePassword(data);
    } catch (error) {
      return;
    }
  }
}

export default new UsersController();
