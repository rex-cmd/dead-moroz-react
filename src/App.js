import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import HomePage from "./pages/homepage/homepage.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import GiftsPage from "./pages/giftspage/giftspage.component";
import InvitationsPage from "./pages/invitationspage/invitationspage.component";
import UsersPage from "./pages/userspage/userspage.component";
import Header from "./components/header/header.component";
import NewGiftPage from "./pages/newgift/newgiftpage.component";
import { emailSignInStart } from "./redux/user/user.actions";
import { withCookies } from "react-cookie";

const App = (props) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((store) => store.user.currentUser);
  console.log(props.cookies);
  useEffect(() => {
    if (props.cookies) {
      dispatch(
        emailSignInStart(
          props.cookies.cookies.email,
          props.cookies.cookies.password
        )
      );
    }
  }, []);

  let token = new URLSearchParams(window.location.search).get(
    "confirmation_token"
  );

  useEffect(() => {
    if (token) {
      axios({
        method: "get",
        url: `http://localhost:3000/users/confirmation?confirmation_token=${token}`,
      }).catch((error) => console.log(error));
    }
  }, [token]);

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/giftspage" component={GiftsPage} />
        <Route path="/userspage" component={UsersPage} />
        <Route path="/invitationspage" component={InvitationsPage} />
        <Route path="/newgift" component={NewGiftPage} />
        <Route
          exact
          path="/signin"
          render={() =>
            currentUser ? (
              <Redirect to="/" />
            ) : (
              <SignInAndSignUpPage cookies={props.cookies} />
            )
          }
        />
      </Switch>
    </div>
  );
};

export default withCookies(App);
