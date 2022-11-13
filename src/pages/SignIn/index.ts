import Block from "../../utils/Block";
import template from "./sign-in.pug";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input/index";
import { Link } from "../../components/Link";
import { SigninData } from "../../api/AuthAPI";
import AuthController from "../../controllers/AuthController";
import "./styles.css";

export class SignIn extends Block {
  constructor() {
    super({});
    console.log(this);
  }

  protected init() {
    this.children.login = new Input({
      className: "login",
      label: "Логин",
      id: "login",
      type: "login",
      name: "login",
    });
    this.children.password = new Input({
      className: "password",
      label: "Пароль",
      type: "password",
      id: "password",
      name: "password",
    });

    this.children.login_btn = new Button({
      label: "Войти",
      classes: "button main-button",
      type: "submit",
    });
    this.children.register_link = new Link({
      title: "Нет аккаунта?",
      to: "/registration",
    });
  }

  onSubmit(e: any) {
    e.preventDefault();
    console.log("1234");
    const values = Object.values(this.children)
      .filter((child) => child instanceof Input)
      .map((child: any) => [
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
