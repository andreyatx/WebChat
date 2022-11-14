import Block from "../../../utils/Block";
import template from "./changePassword.pug";
import { Input } from "../../../components/Input";
import { DataField } from "../../../components/DataField";
import { withStore } from "../../../utils/Store";
import { Link } from "../../../components/Link";
import { ChangePasswordData } from "../../../api/UserAPI";
import router from "../../../utils/Router";
import UserController from "../../../controllers/UserController";
import changeAvatar from "../../../assets/img/changeAvatar.png";
import { Form } from "../../../components/Form";
import { getFormData } from "../../../utils/helpers";

interface ChangeUserPasswordProps {
  title: string;
}

export class ChangePasswordBase extends Block {
  constructor(props: ChangeUserPasswordProps) {
    super(props);
  }

  init() {
    const old_password = new DataField({
      label: "Старый пароль",
      classes: "data",
      fieldValue: new Input({
        label: "Старый пароль",
        id: "old-password",
        type: "password",
        name: "password",
      }),
    });
    const new_password = new DataField({
      label: "Новый пароль",
      classes: "data",
      fieldValue: new Input({
        label: "Новый пароль",
        id: "new-assword",
        type: "password",
        name: "password",
      }),
    });
    const check_password = new DataField({
      label: "Повторите новый пароль",
      classes: "data",
      fieldValue: new Input({
        label: "Повторите новый пароль",
        id: "password-check",
        type: "password",
        name: "password",
      }),
    });

    this.children.form = new Form({
      label: "Изменить пароль",
      inputs: [old_password, new_password, check_password],
      onsubmit: this.onSubmit,
    });

    this.children.cancel = new Link({
      title: "Отменить",
      to: "/profile",
    });
  }
  async onSubmit() {
    const formData = getFormData("form") as FormData;
    const data = Object.fromEntries(formData.entries()) as unknown;

    await UserController.changePassword(data as ChangePasswordData);
    router.go("/profile");
  }

  render() {
    return this.compile(template, {
      title: "Изменить пароль",
      changeAvatar,
      avatar: `https://ya-praktikum.tech/api/v2/resources${this.props.avatar}`,
    });
  }
}

const withUser = withStore((state) => ({ ...state.user }));
export const ChangePassword = withUser(
  ChangePasswordBase as unknown as typeof Block
);
