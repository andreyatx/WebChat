import Block from "../../../utils/Block";
import template from "./changeUserData.pug";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { DataField } from "../../../components/DataField";
import { withStore } from "../../../utils/Store";
import UserController from "../../../controllers/UserController";
import { UserData } from "../../../api/UserAPI";
import router from "../../../utils/Router";
import changeAvatar from "../../../assets/img/changeAvatar.png";
import { Link } from "../../../components/Link";

interface ChangeUserDataProps {
  title: string;
  classes?: string[];
  url?: string;
  children?: {
    fields: Block[];
    footer: Block[];
  };
}

export class ChangeUserDataBase extends Block {
  constructor(props: ChangeUserDataProps) {
    super(props);
  }

  init() {
    this.children.fields = [
      new DataField({
        label: "Почта",
        classes: "data",
        fieldValue: new Input({
          id: "email",
          type: "text",
          valueInput: this.props.email,
        }),
      }),
      new DataField({
        label: "Логин",
        classes: "data",
        fieldValue: new Input({
          id: "login",
          type: "text",
          valueInput: this.props.login,
        }),
      }),
      new DataField({
        label: "Имя",
        classes: "data",
        fieldValue: new Input({
          id: "first_name",
          type: "text",
          valueInput: this.props.first_name,
        }),
      }),
      new DataField({
        label: "Фамилия",
        classes: "data",
        fieldValue: new Input({
          id: "second_name",
          type: "text",
          valueInput: this.props.second_name,
        }),
      }),
      new DataField({
        label: "Имя в чате",
        classes: "data",
        fieldValue: new Input({
          id: "display_name",
          type: "text",
          valueInput: this.props.display_name,
        }),
      }),
      new DataField({
        label: "Телефон",
        classes: "data",
        fieldValue: new Input({
          id: "phone",
          type: "text",
          valueInput: this.props.phone,
        }),
      }),
    ];

    this.children.actions = [
      new Button({
        label: "Сохранить",
        events: {
          click: async () => {
            const inputs = document.querySelectorAll(".input");
            const data = Array.from(inputs).reduce((acc: any, input) => {
              acc[input.id as keyof UserData] = (
                input as HTMLInputElement
              ).value;
              if ((input as HTMLInputElement).value === "") {
                return { login: null, password: null };
              }
              return acc;
            }, {} as Partial<UserData>);
            await UserController.user(data as UserData);
            router.go("/profile");
          },
        },
        classes: "button main-button",
      }),
      new Link({
        title: "Отменить",
        to: "/profile",
      }),
    ];
  }

  render() {
    return this.compile(template, {
      title: "Изменить данные",
      ...this.props,
      display_name: this.props.display_name,
      changeAvatar,
    });
  }
}

const withUser = withStore((state) => ({ ...state.user }));

export const ChangeUserData = withUser(ChangeUserDataBase);
