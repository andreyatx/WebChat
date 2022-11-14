import Block from "../../utils/Block";
import template from "./signUp.pug";
import { Input } from "../../components/Input";
import { Link } from "../../components/Link";
import { SignupData } from "../../api/AuthAPI";
import { Form } from "../../components/Form";
import { getFormData } from "../../utils/helpers";
import AuthController from "../../controllers/AuthController";
import "./styles.css";

export class SignUp extends Block {
  constructor() {
    super({});
  }

  init() {
    const email = new Input({
      className: "field",
      label: "Почта",
      id: "email",
      type: "email",
      name: "email",
    });
    const login = new Input({
      className: "field",
      label: "Логин",
      id: "login",
      type: "login",
      name: "login",
    });
    const first_name = new Input({
      className: "field",
      label: "Имя",
      id: "first_name",
      type: "name",
      name: "name",
    });
    const second_name = new Input({
      className: "field",
      label: "Фамилия",
      id: "second_name",
      type: "name",
      name: "name",
    });
    const phone = new Input({
      className: "field",
      label: "Телефон",
      id: "phone",
      type: "phone",
      name: "phone",
    });
    const password = new Input({
      className: "field",
      label: "Пароль",
      id: "password",
      type: "password",
      name: "password",
    });
    const check_password = new Input({
      className: "field",
      label: "Пароль (ещё раз)",
      id: "check-password",
      type: "password",
      name: "password",
    });

    this.children.form = new Form({
      label: "Зарегистрироваться",
      inputs: [
        email,
        login,
        first_name,
        second_name,
        phone,
        password,
        check_password,
      ],
      onsubmit: this.onSubmit,
    });
    this.children.login_link = new Link({
      title: "Уже зарегистрированы?",
      to: "/sign-in",
    });
  }

  onSubmit() {
    const formData = getFormData("form") as FormData;
    const data = Object.fromEntries(formData.entries()) as unknown;

    AuthController.signup(data as SignupData);
  }

  render() {
    return this.compile(template, { title: "Регистрация" });
  }
}
