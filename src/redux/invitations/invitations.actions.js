import InvitationsActionTypes from "./invitations.types";

export const getInvitations = () => ({
  type: InvitationsActionTypes.GET_INVITATIONS,
});
export const getInvitationsSuccess = (invitations) => ({
  type: InvitationsActionTypes.GET_INVITATIONS_SUCCESS,
  payload: invitations,
});
export const getInvitationsFailure = (error) => ({
  type: InvitationsActionTypes.GET_INVITATIONS_FAILURE,
  payload: error,
});

export const newInvitation = (email) => ({
  type: InvitationsActionTypes.NEW_INVITATION,
  payload: { email },
});
export const newInvitationSuccess = (invitation) => ({
  type: InvitationsActionTypes.NEW_INVITATION_SUCCESS,
  payload: invitation,
});
export const newInvitationFailure = (error) => ({
  type: InvitationsActionTypes.NEW_INVITATION_SUCCESS,
  payload: error,
});
