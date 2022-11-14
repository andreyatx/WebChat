import Block from "../../utils/Block";
import template from "./messenger.pug";
import { Message } from "../Message";
import { Input } from "../Input";
import { Button } from "../Button";
import MessagesController, {
  Message as MessageInfo,
} from "../../controllers/MessagesController";
import ChatsController from "../../controllers/ChatsController";
import { withStore } from "../../utils/Store";
import "./styles.css";

interface MessengerProps {
  selectedChat: number | undefined;
  messages: MessageInfo[];
  userId: number;
}

class MessengerBase extends Block<MessengerProps> {
  constructor(props: MessengerProps) {
    super(props);
  }
  protected init() {
    this.children.messages = this.createMessages(this.props);

    this.children.deleteChat = new Button({
      label: "Удалить этот чат",
      events: {
        click: async () => {
          const chatId = this.props.selectedChat;
          await ChatsController.delete(chatId!);
        },
      },
      classes: "delete-button",
    });

    this.children.input = new Input({
      type: "text",
      name: "message",
      label: "Введите сообщение",
    });

    this.children.button = new Button({
      label: "Отправить",
      type: "button",
      classes: "button main-button",
      events: {
        click: () => {
          const input = this.children.input as Input;
          const message = input.getValue();

          input.setValue("");
          MessagesController.sendMessage(this.props.selectedChat!, message);
        },
      },
    });
  }

  protected componentDidUpdate(
    oldProps: MessengerProps,
    newProps: MessengerProps
  ): boolean {
    this.children.messages = this.createMessages(newProps);

    return true;
  }

  private createMessages(props: MessengerProps) {
    return props.messages.map((data) => {
      return new Message({ ...data, isMine: props.userId === data.user_id });
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}

const withSelectedChatMessages = withStore((state) => {
  const selectedChatId = state.selectedChat;

  if (!selectedChatId) {
    return {
      messages: [],
      selectedChat: undefined,
      userId: state.user.id,
    };
  }

  return {
    messages: (state.messages || {})[selectedChatId] || [],
    selectedChat: state.selectedChat,
    userId: state.user.id,
  };
});

export const Messenger = withSelectedChatMessages(
  MessengerBase as unknown as typeof Block
);
