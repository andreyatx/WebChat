import Block from "../../utils/Block";
import template from "./profile.pug";
import { DataField } from "../../components/DataField";
import { Button } from "../../components/Button";
import { Link } from "../../components/Link";
import store, { withStore } from "../../utils/Store";
import AuthController from "../../controllers/AuthController";
import changeAvatar from "../../assets/img/changeAvatar.png";
import "./styles.css";

interface ProfileProps {
  title: string;
  classes?: string[];
  url?: string;
  children?: {
    fields: Block[];
    footer: Block[];
  };
}
export class ProfileBase extends Block {
  constructor() {
    const state = store.getState();

    super(state.user || {});
  }

  init() {
    this.children.email = new DataField({
      label: "Почта",
      value: this.props.email,
    });
    this.children.login = new DataField({
      label: "Логин",
      value: this.props.login,
    });
    this.children.first_name = new DataField({
      label: "Имя",
      value: this.props.first_name,
    });
    this.children.second_name = new DataField({
      label: "Фамилия",
      value: this.props.second_name,
    });
    this.children.display_name = new DataField({
      label: "Имя в чате",
      value: this.props.display_name,
    });
    this.children.phone = new DataField({
      label: "Телефон",
      value: this.props.phone,
    });

    this.children.change_user_data = new Link({
      title: "Изменить данные",
      to: "/change-user-data",
      classes: "change-data",
    });
    this.children.change_password = new Link({
      title: "Изменить пароль",
      to: "/change-password",
      classes: "change-password",
    });
    this.children.back_to_chats = new Link({
      title: "Назад к чатам",
      to: "/messenger",
      classes: "back-to-chats",
    });
    this.children.logout = new Button({
      label: "Выйти",
      classes: "logout text-danger",
      events: {
        click: () => {
          AuthController.logout();
        },
      },
    });
  }

  render() {
    return this.compile(template, {
      title: this.props.first_name || "Anon",
      props: this.props,
      avatar: `https://ya-praktikum.tech/api/v2/resources${this.props.avatar}`,
      changeAvatar,
    });
  }
}

const withUser = withStore((state) => ({ ...state.user }));

export const Profile = withUser(ProfileBase as unknown as typeof Block);
