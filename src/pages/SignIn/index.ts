import Block from "../../utils/Block";
import template from "./sign-in.pug";
import { Button } from "../../components/button";
import { Input } from "../../components/Input";
import { Link } from "../../components/Link";
import Validator, {
  ValidationType,
  ErrorMessages,
} from "../../utils/Validation";
import { SigninData } from "../../api/AuthAPI";
import AuthController from "../../controllers/AuthController";
import "./styles.css";

interface SignInProps {
  title: string;
  classes?: string[];
  url?: string;
  children?: {
    fields: Block[];
    footer: Block[];
  };
}

const validator = (currentField: any, type: ValidationType, value: any) => {
  currentField.style.display = Validator.validate(type, value)
    ? "none"
    : "block";
};

export class SignIn extends Block {
  constructor(props: SignInProps) {
    super(props);
  }

  protected init() {
    this.children.login = new Input({
      className: "login",
      label: "Логин",
      id: "login",
      type: ValidationType.Login,
      errorMessage: ErrorMessages.Login_error,
      events: {
        focusout: (event) => {
          const currentField = this.children.fields[0]._element.children[2];
          console.log(event.target.value);
          return validator(
            currentField,
            ValidationType.Login,
            event.target.value
          );
        },
      },
    });
    this.children.password = new Input({
      className: "password",
      label: "Пароль",
      type: "password",
      id: "password",
      errorMessage: ErrorMessages.Password_error,
      events: {
        focusout: (event) => {
          const currentField = this.children.fields[1]._element.children[2];
          console.log(event.target.value);
          return validator(
            currentField,
            ValidationType.Password,
            event.target.value
          );
        },
      },
    });
    // const fields = [
    //   new Input({
    //     className: "login",
    //     label: "Логин",
    //     id: "login",
    //     type: ValidationType.Login,
    //     errorMessage: ErrorMessages.Login_error,
    //     events: {
    //       focusout: (event) => {
    //         const currentField = this.children.fields[0]._element.children[2];
    //         console.log(event.target.value);
    //         return validator(
    //           currentField,
    //           ValidationType.Login,
    //           event.target.value
    //         );
    //       },
    //     },
    //   }),
    //   new Input({
    //     className: "password",
    //     label: "Пароль",
    //     type: "password",
    //     id: "password",
    //     errorMessage: ErrorMessages.Password_error,
    //     events: {
    //       focusout: (event) => {
    //         const currentField = this.children.fields[1]._element.children[2];
    //         console.log(event.target.value);
    //         return validator(
    //           currentField,
    //           ValidationType.Password,
    //           event.target.value
    //         );
    //       },
    //     },
    //   }),
    // ];
    // this.children.fields = fields;

    const buttons = [
      new Button({
        label: "Войти",
        classes: "button main-button",
        events: {
          click: () => this.onSubmit(),
        },
        // type: "submit",
      }),
      new Link({
        title: "Нет аккаунта?",
        to: "/registration",
      }),
    ];

    this.children.actions = buttons;
    console.log(this.children.actions);
  }
  onSubmit() {
    const values = Object.values(this.children.fields)
      .filter((child) => child instanceof Input)
      .map((child) => [
        child._element.childNodes[1].name,
        child._element.childNodes[1].value,
      ]);

    const data = Object.fromEntries(values);

    AuthController.signin(data as SigninData);
  }
  render(): DocumentFragment {
    return this.compile(template, { title: "Вход" });
  }
}
