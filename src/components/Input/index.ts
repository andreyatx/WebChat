import Block from "../../utils/Block";
import template from "./input.pug";
import "./styles.css";
import { ValidationType } from "../../utils/Validation";

interface InputProps {
  id?: string;
  placeholder?: string;
  type?: ValidationType | string;
  label?: string;
  className?: string;
  errorMessage?: string;
  events?: any;
  valueInput?: string;
}

export class Input extends Block {
  constructor(props: InputProps) {
    super(props);
  }

  public setValue(value: string) {
    return ((this.element as HTMLInputElement).value = this.props.valueInput);
  }

  public getName() {
    return (this.element as HTMLInputElement).name;
  }

  public getValue() {
    return (this.element as HTMLInputElement).value;
  }

  render() {
    return this.compile(template, this.props);
  }
}
