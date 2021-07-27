import React, { useState } from "react";
import { useDispatch } from "react-redux";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { useCookies, withCookies } from "react-cookie";

import { emailSignInStart } from "../../redux/user/user.actions";

import {
  SignInContainer,
  SignInTitle,
  ButtonsBarContainer,
} from "./sign-in.styles";

const SignIn = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["user"]);

  return (
    <SignInContainer>
      <SignInTitle>I already have an account</SignInTitle>
      <span>Sign in with your email and password</span>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(emailSignInStart(email, password));
          setCookie("email", email, { path: "/" });
          setCookie("password", password, { path: "/" });
        }}
      >
        <FormInput
          type="email"
          handleChange={(e) => setEmail(e.target.value)}
          value={email}
          label="email"
          required
        />
        <FormInput
          type="password"
          value={password}
          handleChange={(e) => setPassword(e.target.value)}
          label="password"
          required
        />
        <ButtonsBarContainer>
          <CustomButton type="submit"> Sign in </CustomButton>
        </ButtonsBarContainer>
      </form>
    </SignInContainer>
  );
};

export default withCookies(SignIn);
