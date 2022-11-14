import Block from "../../utils/Block";
import template from "./button.pug";
import "./styles.css";

interface ButtonProps {
  label: string;
  events?: {
    click: (event: any) => void;
  };
  classes?: string;
  type?: "button" | "submit";
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
