import Block from "../../../utils/Block";
import template from "./changePassword.pug";
<<<<<<< HEAD
import { Button } from "../../../components/button";
import { Input } from "../../../components/input";
import { DataField } from "../../../components/DataField";
import changeAvatar from "../../../assets/img/changeAvatar.png";

interface ChangePasswordProps {
  title: string;
  classes?: string[];
  url?: string;
  children?: {
    fields: Block[];
    footer: Block[];
  };
}

export class ChangePassword extends Block {
  constructor(props: ChangePasswordProps) {
    super(props);
=======
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { DataField } from "../../../components/DataField";
import { ValidationType } from "../../../utils/Validation";
import { Link } from "../../../components/Link";
import { ChangePasswordData } from "../../../api/UserAPI";
import router from "../../../utils/Router";
import UserController from "../../../controllers/UserController";
import changeAvatar from "../../../assets/img/changeAvatar.png";

export class ChangePassword extends Block {
  constructor() {
    super({});
>>>>>>> origin/sprint_3
  }

  init() {
    const fields = [
      new DataField({
<<<<<<< HEAD
        label: "Поле",
        name: "Старый пароль",
        classes: ["data"],
        fieldValue: new Input({
          label: "",
          idInput: "oldPassword",
          type: "password",
          valueInput: "password",
          inputClasses: "",
        }),
      }),
      new DataField({
        label: "Поле",
        name: "Новый пароль",
        classes: ["data"],
        fieldValue: new Input({
          label: "",
          idInput: "newPassword",
          type: "password",
          valueInput: "newPassword",
          inputClasses: "",
        }),
      }),
      new DataField({
        label: "Поле",
        name: "Повторите новый пароль",
        classes: ["data"],
        fieldValue: new Input({
          label: "",
          idInput: "passwordYet",
          type: "password",
          valueInput: "newPassword",
          inputClasses: "",
=======
        label: "Старый пароль",
        classes: "data",
        fieldValue: new Input({
          label: "",
          id: "oldPassword",
          type: "password",
        }),
      }),
      new DataField({
        label: "Новый пароль",
        classes: "data",
        fieldValue: new Input({
          label: "",
          id: "newPassword",
          type: "password",
        }),
      }),
      new DataField({
        label: "Повторите новый пароль",
        classes: "data",
        fieldValue: new Input({
          label: "",
          id: "password-check",
          type: "password",
>>>>>>> origin/sprint_3
        }),
      }),
    ];
    this.children.fields = fields;

<<<<<<< HEAD
    this.children.actions = new Button({
      label: "Сохранить",
      events: {
        click: () => console.log("clicked!"),
      },
      classes: "button main-button",
      url: "/profile",
    });
  }

  render() {
    return this.compile(template, { changeAvatar });
=======
    this.children.actions = [
      new Button({
        label: "Сохранить",
        events: {
          click: async () => {
            const inputs = document.querySelectorAll(".input");
            const data = Array.from(inputs).reduce((acc: any, input) => {
              acc[input.id as keyof ChangePasswordData] = (
                input as HTMLInputElement
              ).value;
              if ((input as HTMLInputElement).value === "") {
                return { oldPassword: "", newPassword: "" };
              }
              return acc;
            }, {} as Partial<ChangePasswordData>);
            await UserController.changePassword(data as ChangePasswordData);
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
    return this.compile(template, { title: "Изменить пароль", changeAvatar });
>>>>>>> origin/sprint_3
  }
}
