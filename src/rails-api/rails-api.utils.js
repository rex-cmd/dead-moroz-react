import axios from "axios";

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  let userPost = await userAuth;
  console.log(userPost);
  const access_token = userPost.headers.authorization;
  const id = userPost.data.data.id;
  console.log("userPost", userPost);
  let userGet = await axios({
    method: "get",
    url: `http://localhost:3001/users/${id}`,
    headers: { Authorization: access_token },
  });

  if (!userGet.exists) {
    const { email } = userPost.data.data.attributes;
    const { id } = userPost.data.data;
    try {
      userGet = {
        id: id,
        email: email,
        authorization: access_token,
      };
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userGet;
};

export const getCurrentUser = () => {
  // async function currentUser() {
  //   return JSON.parse(localStorage.current_user);
  // }
  // return currentUser();
};
