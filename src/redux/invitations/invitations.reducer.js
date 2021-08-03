import InvitationsActionTypes from "./invitations.types";

const INITIAL_STATE = {
  invitations: [],
  error: null,
};
const invitationsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case InvitationsActionTypes.GET_INVITATIONS_SUCCESS:
      return {
        ...state,
        invitations: action.payload,
        error: null,
      };
    case InvitationsActionTypes.GET_INVITATIONS:
      return {
        ...state,
        error: null,
      };
    case InvitationsActionTypes.NEW_INVITATION:
      return {
        ...state,
        error: null,
      };
    case InvitationsActionTypes.NEW_INVITATION_SUCCESS:
      return {
        ...state,
        invitations: [...state.invitations, action.payload],
        error: null,
      };
    case InvitationsActionTypes.NEW_INVITATION_FAILURE:
    case InvitationsActionTypes.GET_INVITATIONS_FAILURE:
    default:
      return state;
  }
};
export default invitationsReducer;
