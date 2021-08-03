import React, { useEffect, useState } from "react";
import FormInput from "/Users/hanna.ramashka/Desktop/rails-api-react-app/src/components/form-input/form-input.component.jsx";
import CustomButton from "/Users/hanna.ramashka/Desktop/rails-api-react-app/src/components/custom-button/custom-button.component.jsx";
import {
  InvitationsPageContainer,
  Table,
  Th,
  Td,
} from "./invitationspage.styles";
import { useDispatch, useSelector } from "react-redux";

import {
  getInvitations,
  newInvitation,
} from "../../redux/invitations/invitations.actions";
const InvitationsPage = () => {
  const dispatch = useDispatch();
  const invitations = useSelector((store) => store.invitations.invitations);
  const [email, setEmail] = useState("");
  const currentUser = useSelector((store) => store.user.currentUser);
  useEffect(() => {
    dispatch(getInvitations());
  }, [currentUser]);
  return (
    <InvitationsPageContainer>
      Invitations
      <Table>
        <thead>
          <tr>
            <Th>Email</Th>
            <Th>Status</Th>
            <Th>Link</Th>
          </tr>
        </thead>
        <tbody>
          {invitations.map((invitation, index) => (
            <tr key={invitation.id}>
              <Td>{invitation.email}</Td>
              <Td>{invitation.status}</Td>
              <Td>{invitation.token}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(newInvitation(email));
        }}
      >
        <FormInput
          type="email"
          handleChange={(e) => setEmail(e.target.value)}
          value={email}
          label="email"
          required
        />
        <CustomButton type="submit"> Invite </CustomButton>
      </form>
    </InvitationsPageContainer>
  );
};

export default InvitationsPage;
