import Block from "../../../utils/Block";
import template from "./changeUserData.pug";
import { Input } from "../../../components/Input";
import { DataField } from "../../../components/DataField";
import { withStore } from "../../../utils/Store";
import UserController from "../../../controllers/UserController";
import { UserData } from "../../../api/UserAPI";
import router from "../../../utils/Router";
import changeAvatar from "../../../assets/img/changeAvatar.png";
import { Link } from "../../../components/Link";
import { Form } from "../../../components/Form";
import { getFormData } from "../../../utils/helpers";

interface ChangeUserDataProps {
  title: string;
}
export class ChangeUserDataBase extends Block {
  constructor(props: ChangeUserDataProps) {
    super(props);
  }

  init() {
    const avatar = new DataField({
      label: "Аватар",
      classes: "data",
      fieldValue: new Input({
        id: "avatar",
        type: "file",
        name: "avatar",
        valueInput: this.props.avatar,
      }),
    });
    const email = new DataField({
      label: "Почта",
      classes: "data",
      fieldValue: new Input({
        id: "email",
        type: "text",
        name: "email",
        valueInput: this.props.email,
      }),
    });

    const login = new DataField({
      label: "Логин",
      classes: "data",
      fieldValue: new Input({
        id: "login",
        type: "text",
        name: "login",
        valueInput: this.props.login,
      }),
    });
    const first_name = new DataField({
      label: "Имя",
      classes: "data",
      fieldValue: new Input({
        id: "first_name",
        type: "text",
        name: "first_name",
        valueInput: this.props.first_name,
      }),
    });
    const second_name = new DataField({
      label: "Фамилия",
      classes: "data",
      fieldValue: new Input({
        id: "second_name",
        type: "text",
        name: "second_name",
        valueInput: this.props.second_name,
      }),
    });
    const display_name = new DataField({
      label: "Имя в чате",
      classes: "data",
      fieldValue: new Input({
        id: "display_name",
        type: "text",
        name: "display_name",
        valueInput: this.props.display_name,
      }),
    });
    const phone = new DataField({
      label: "Телефон",
      classes: "data",
      fieldValue: new Input({
        id: "phone",
        type: "text",
        name: "phone",
        valueInput: this.props.phone,
      }),
    });

    this.children.form = new Form({
      label: "Изменить данные",
      inputs: [
        avatar,
        email,
        login,
        first_name,
        second_name,
        display_name,
        phone,
      ],
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

    await UserController.user(data as UserData);
    router.go("/profile");
  }
  render() {
    return this.compile(template, {
      title: "Изменить данные",
      ...this.props,
      avatar: `https://ya-praktikum.tech/api/v2/resources${this.props.avatar}`,
      changeAvatar,
    });
  }
}

const withUser = withStore((state) => ({ ...state.user }));

export const ChangeUserData = withUser(
  ChangeUserDataBase as unknown as typeof Block
);
