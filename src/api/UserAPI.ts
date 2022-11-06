import BaseAPI from "./BaseAPI";

export interface FindUserData {
  login: string;
}

export interface UserData {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
}

export default class UserAPI extends BaseAPI {
  create = undefined;
  update = undefined;
  delete = undefined;
  read = undefined;
  constructor() {
    super("/user");
  }

  changeUser(data: UserData): Promise<unknown> {
    return this.http.put("/profile", data);
  }

  changePassword(data: ChangePasswordData): Promise<unknown> {
    return this.http.put("/password", data);
  }
}
