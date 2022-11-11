import Block from "../../utils/Block";
import template from "./signUp.pug";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Link } from "../../components/Link";
import { SignupData } from "../../api/AuthAPI";
import AuthController from "../../controllers/AuthController";
import "./styles.css";

interface SignUpProps {
  title: string;
  classes?: string[];
}

export class SignUp extends Block {
  constructor(props: SignUpProps) {
    super(props);
  }

  init() {
    this.children.email = new Input({
      className: "field",
      label: "Почта",
      id: "email",
      type: "email",
      name: "email",
    });
    this.children.login = new Input({
      className: "field",
      label: "Логин",
      id: "login",
      type: "login",
      name: "login",
    });
    this.children.first_name = new Input({
      className: "field",
      label: "Имя",
      id: "first_name",
      type: "name",
      name: "name",
    });
    this.children.second_name = new Input({
      className: "field",
      label: "Фамилия",
      id: "second_name",
      type: "name",
      name: "name",
    });
    this.children.phone = new Input({
      className: "field",
      label: "Телефон",
      id: "phone",
      type: "phone",
      name: "phone",
    });
    this.children.password = new Input({
      className: "field",
      label: "Пароль",
      id: "password",
      type: "password",
      name: "password",
    });
    this.children.check_password = new Input({
      className: "field",
      label: "Пароль (ещё раз)",
      id: "check-password",
      type: "password",
      name: "password",
    });

    this.children.register_btn = new Button({
      label: "Зарегистрироваться",
      classes: "button main-button",
      events: {
        click: () => this.onSubmit(),
      },
    });
    this.children.login_link = new Link({
      title: "Уже зарегистрированы?",
      to: "/sign-in",
    });
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
