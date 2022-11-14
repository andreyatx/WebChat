import Block from "../../utils/Block";
import template from "./chatsList.pug";
import { Chat } from "../Chat";
import { withStore } from "../../utils/Store";
import { ChatInfo } from "../../api/ChatsAPI";
import ChatsController from "../../controllers/ChatsController";
import { Link } from "../Link";
import "./styles.css";
import { Button } from "../Button";
import { Input } from "../Input";

interface ChatsListProps {
  chats: ChatInfo[];
  isLoaded: boolean;
}

class ChatsListBase extends Block<ChatsListProps> {
  constructor(props: ChatsListProps) {
    super({ ...props });
  }

  protected init() {
    this.children.chats = this.createChats(this.props);
    this.children.createChatInput = new Input({
      type: "text",
      label: "Создать чат(введите название)",
      className: "create-chat",
      name: "create-chat",
    });
    this.children.createChat = new Button({
      classes: "button main-button",
      label: "Создать чат",
      events: {
        click: async () => {
          const data = (
            document.querySelector(".create-chat .input") as HTMLInputElement
          ).value;

          await ChatsController.create(data);
        },
      },
    });
    this.children.profileLink = new Link({
      to: "/profile",
      title: "Профиль >",
    });
  }

  protected componentDidUpdate(
    oldProps: ChatsListProps,
    newProps: ChatsListProps
  ): boolean {
    this.children.chats = this.createChats(newProps);

    return true;
  }

  private createChats(props: ChatsListProps) {
    return props.chats.map((data) => {
      return new Chat({
        ...data,
        events: {
          click: () => {
            ChatsController.selectChat(data.id);
          },
        },
      });
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}

const withChats = withStore((state) => ({ chats: [...(state.chats || [])] }));

export const ChatsList = withChats(ChatsListBase as unknown as typeof Block);
