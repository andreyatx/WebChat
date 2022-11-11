import Block from "../../utils/Block";
import { PropsWithRouter, withRouter } from "../../hocs/withRouter";
import template from "./link.pug";
import "./styles.css";

interface LinkProps extends PropsWithRouter {
  to: string;
  title: string;
  classes?: string;
  events?: {
    click: () => void;
  };
}

class BaseLink extends Block {
  constructor(props: LinkProps) {
    super({
      ...props,
      events: {
        click: () => {
          this.navigate();
        },
      },
    });
  }

  navigate() {
    this.props.router.go(this.props.to);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export const Link = withRouter(BaseLink);
