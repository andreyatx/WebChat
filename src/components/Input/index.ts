import Block from "../../utils/Block";
import template from "./input.pug";
import "./styles.css";
import Validator, {
  ErrorMessages,
  ValidationType,
} from "../../utils/Validation";

interface InputProps {
  id?: string;
  label?: string;
  name: string;
  placeholder?: string;
  type?: ValidationType | string;
  className?: string;
  valueInput?: string;
  isValid?: boolean;
  errorMessage?: string;
  events?: {
    focusout?: (event: any) => void;
  };
}

export class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super({ ...props });
  }
  protected init(): void {
    this.setProps({
      events: {
        focusout: (event: any) => {
          this.validateOnBlur();
        },
      },
    });
  }

  public isValid(): boolean {
    const inputName = this.getName();
    const inputValue = this.getValue();

    return inputName !== ""
      ? Validator.validate(inputName as ValidationType, inputValue)
      : true;
  }

  private validateOnBlur(): void {
    const content = this.getContent();
    const errorMessage = content?.querySelector(".error-message");
    const name = content?.getAttribute("data-name");

    if (!this.isValid()) {
      content!.classList.add("invalid");
      if (name !== null && name !== undefined) {
        errorMessage!.textContent =
          ErrorMessages[name as keyof typeof ErrorMessages];
      }
    } else {
      content!.classList.remove("invalid");
      errorMessage!.textContent = "";
    }
  }

  public setValue(value: string) {
    const inputField = this.element;

    return ((inputField?.querySelector(`input`))!.value = value);
  }

  public getName(): string {
    return this.element?.getAttribute("data-name") as string;
  }

  public getValue(): string {
    const inputField = this.element;

    return inputField?.querySelector(`input`)!.value as string;
  }

  render() {
    return this.compile(template, {
      ...this.props,
    });
  }
}
