import { setHeadersWithAccessToken } from "../index";

export const userLogin = (data) => {
  console.log(data);
  return {
    data: {
      token: "this is test JWT token",
      user: {
        name: "John Doe",
        email: "johndoe@gmail.com",
        isAdmin: false,
      },
    },
    status: 200,
  };
};
