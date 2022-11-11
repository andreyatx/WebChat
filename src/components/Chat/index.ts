import Block from "../../utils/Block";
import template from "./chat.pug";
import { withStore } from "../../utils/Store";
import { ChatInfo } from "../../api/ChatsAPI";
import "./styles.css";

interface ChatProps {
  id: number;
  title: string;
  unreadCount: number;
  selectedChat: ChatInfo;
  events: {
    click: () => void;
  };
}

class ChatBase extends Block<ChatProps> {
  constructor(props: ChatProps) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, {
      ...this.props,
      isSelected: this.props.id === this.props.selectedChat?.id,
    });
  }
}

export const withSelectedChat = withStore((state) => ({
  selectedChat: (state.chats || []).find(
    ({ id }: ChatProps) => id === state.selectedChat
  ),
}));

export const Chat = withSelectedChat(ChatBase as unknown as typeof Block);
