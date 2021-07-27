import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { signOutStart } from "../../redux/user/user.actions";
import { useCookies } from "react-cookie";
import { ReactComponent as Logo } from "../../assets/crown.svg";

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink,
} from "./header.styles";
import Cookies from "universal-cookie";

const Header = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((store) => store.user.currentUser);
  const [cookies, removeCookie] = useCookies(["user"]);
  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <Logo className="logo" />
      </LogoContainer>
      <OptionsContainer>
        <OptionLink to="/giftspage">My Gifts</OptionLink>
        <OptionLink to="/userspage">Users</OptionLink>
        <OptionLink to="/invitationspage">Invitations</OptionLink>
        {currentUser ? (
          <OptionLink
            as="div"
            onClick={(e) => {
              e.preventDefault();
              dispatch(signOutStart());
              removeCookie("user");
              removeCookie("email");
              removeCookie("password");
            }}
          >
            SIGN OUT
          </OptionLink>
        ) : (
          <OptionLink to="/signin">SIGN IN</OptionLink>
        )}
      </OptionsContainer>
    </HeaderContainer>
  );
};

export default Header;
