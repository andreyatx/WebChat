import Block from "../../utils/Block";
import { Button } from "../Button";
import template from "./form.pug";
import "./styles.css";

interface FormProps {
  label: string;
  isValid?: boolean;
  onsubmit?: any;
  inputs?: any[];
  events?: {
    onsubmit?: (event: any) => void;
  };
}

export class Form extends Block<FormProps> {
  constructor(props: FormProps) {
    super({ ...props });
  }
  protected init(): void {
    this.children.button = new Button({
      label: this.props.label,
      type: "submit",
      events: {
        click: (e: Event) => {
          e.preventDefault();
          this.props.onsubmit();
        },
      },
      classes: "button main-button",
    });
  }

  render() {
    return this.compile(template, {
      ...this.props,
    });
  }
}
