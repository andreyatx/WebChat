import Block from "../utils/Block";
import Router from "../utils/Router";

export function withRouter(Component: typeof Block) {
  type Props = typeof Component extends typeof Block ? any : any;

  return class WithRouter extends Component {
    constructor(props: Props & PropsWithRouter) {
      super({ ...props, router: Router });
    }
  };
}

export interface PropsWithRouter {
  router: typeof Router;
}
