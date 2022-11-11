import { Error404 } from "./pages/Errors/Error404";
import { Error500 } from "./pages/Errors/Error500";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Profile } from "./pages/Profile";
import { ChangePassword } from "./pages/Profile/ChangePassword";
import { ChangeUserData } from "./pages/Profile/ChangeUserData";
import { MessengerPage } from "./pages/Messenger";

import Router from "./utils/Router";
import AuthController from "./controllers/AuthController";

export enum Routes {
  Index = "/",
  Signin = "/sign-in",
  Register = "/registration",
  Profile = "/profile",
  ChangePassword = "/change-password",
  ChangeUserData = "/change-user-data",
  Messenger = "/messenger",
  Error404 = "/404",
  Error500 = "/500",
}

window.addEventListener("DOMContentLoaded", async () => {
  Router.use(Routes.Index, SignIn)
    .use(Routes.Register, SignUp)
    .use(Routes.Signin, SignIn)
    .use(Routes.Profile, Profile)
    .use(Routes.ChangePassword, ChangePassword)
    .use(Routes.ChangeUserData, ChangeUserData)
    .use(Routes.Messenger, MessengerPage)
    .use(Routes.Error404, Error404)
    .use(Routes.Error500, Error500);

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.Register:
      isProtectedRoute = false;
      break;
  }

  try {
    await AuthController.fetchUser();

    Router.start();

    if (!isProtectedRoute) {
      Router.go(Routes.Profile);
    }
  } catch (e) {
    Router.start();

    if (isProtectedRoute) {
      Router.go(Routes.Index);
    }
  }
});
