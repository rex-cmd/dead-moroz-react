import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
import giftsReducer from "./gifts/gifts.reducer";
import invitationsReducer from "./invitations/invitations.reducer";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const rootReducer = combineReducers({
  user: userReducer,
  gifts: giftsReducer,
  invitations: invitationsReducer,
});

export default persistReducer(persistConfig, rootReducer);
