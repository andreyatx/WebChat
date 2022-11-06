import Block from "../../utils/Block";
import template from "./signUp.pug";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Link } from "../../components/Link";
import Validator, {
  ValidationType,
  ErrorMessages,
} from "../../utils/Validation";
import { SignupData } from "../../api/AuthAPI";
import AuthController from "../../controllers/AuthController";
import "./styles.css";

interface SignUpProps {
  title: string;
  classes?: string[];
}

const validator = (currentField: any, type: ValidationType, value: any) => {
  currentField.style.display = Validator.validate(type, value)
    ? "none"
    : "block";
};

export class SignUp extends Block {
  constructor(props: SignUpProps) {
    super(props);
  }

  init() {
    const fields = [
      new Input({
        className: "field",
        label: "Почта",
        id: "email",
        type: "email",
        errorMessage: ErrorMessages.Email_error,
        events: {
          focusout: (event) => {
            const currentField = this.children.fields[0]._element.children[2];
            return validator(currentField, "email", event.target.value);
          },
        },
      }),
      new Input({
        className: "field",
        label: "Логин",
        id: "login",
        type: "login",
        errorMessage: ErrorMessages.Login_error,
        events: {
          focusout: (event) => {
            const currentField = this.children.fields[1]._element.children[2];
            return validator(currentField, "login", event.target.value);
          },
        },
      }),
      new Input({
        className: "field",
        label: "Имя",
        id: "first_name",
        type: "name",
        errorMessage: ErrorMessages.Name_error,
        events: {
          focusout: (event) => {
            const currentField = this.children.fields[2]._element.children[2];
            return validator(currentField, "name", event.target.value);
          },
        },
      }),
      new Input({
        className: "field",
        label: "Фамилия",
        id: "second_name",
        type: "name",
        errorMessage: ErrorMessages.Name_error,
        events: {
          focusout: (event) => {
            const currentField = this.children.fields[3]._element.children[2];
            return validator(currentField, "name", event.target.value);
          },
        },
      }),
      new Input({
        className: "field",
        label: "Телефон",
        id: "phone",
        type: "phone",
        errorMessage: ErrorMessages.Phone_error,
        events: {
          focusout: (event) => {
            const currentField = this.children.fields[4]._element.children[2];
            return validator(currentField, "phone", event.target.value);
          },
        },
      }),
      new Input({
        className: "field",
        label: "Пароль",
        id: "password",
        type: "password",
        errorMessage: ErrorMessages.Password_error,
        events: {
          focusout: (event) => {
            const currentField = this.children.fields[5]._element.children[2];
            return validator(currentField, "password", event.target.value);
          },
        },
      }),
      new Input({
        className: "field",
        label: "Пароль (ещё раз)",
        id: "check-password",
        type: "password",
        errorMessage: ErrorMessages.Password_error,
        events: {
          focusout: (event) => {
            const currentField = this.children.fields[6]._element.children[2];
            return validator(currentField, "password", event.target.value);
          },
        },
      }),
    ];
    this.children.fields = fields;

    const buttons = [
      new Button({
        label: "Зарегистрироваться",
        classes: "button main-button",
        events: {
          click: () => this.onSubmit(),
        },
      }),
      new Link({
        title: "Уже зарегистрированы?",
        to: "/sign-in",
      }),
    ];
    this.children.actions = buttons;
  }

  onSubmit() {
    const values = Object.values(this.children.fields)
      .filter((child) => child instanceof Input)
      .map((child) => [
        child._element.childNodes[1].name,
        child._element.childNodes[1].value,
      ]);

    const data = Object.fromEntries(values);

    AuthController.signup(data as SignupData);
  }

  render() {
    return this.compile(template, { title: "Регистрация" });
  }
}
