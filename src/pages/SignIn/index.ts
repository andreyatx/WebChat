import Block from "../../utils/Block";
import template from "./sign-in.pug";
import { Input } from "../../components/Input/index";
import { Link } from "../../components/Link";
import { SigninData } from "../../api/AuthAPI";
import AuthController from "../../controllers/AuthController";
import { getFormData } from "../../utils/helpers";
import { Form } from "../../components/Form";
import "./styles.css";

export class SignIn extends Block {
  constructor() {
    super({});
  }

  protected init() {
    const login = new Input({
      className: "login",
      label: "Логин",
      id: "login",
      type: "login",
      name: "login",
    });
    const password = new Input({
      className: "password",
      label: "Пароль",
      type: "password",
      id: "password",
      name: "password",
    });

    this.children.form = new Form({
      label: "Войти",
      inputs: [login, password],
      onsubmit: this.onSubmit,
    });

    this.children.register_link = new Link({
      title: "Нет аккаунта?",
      to: "/registration",
    });
  }

  onSubmit() {
    const formData = getFormData("form") as FormData;
    const data = Object.fromEntries(formData.entries()) as unknown;

    AuthController.signin(data as SigninData);
  }

  render(): DocumentFragment {
    return this.compile(template, { title: "Вход" });
  }
}
