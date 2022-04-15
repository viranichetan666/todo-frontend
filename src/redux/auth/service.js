import { setHeadersWithAccessToken } from "../index";

export const userLogin = (data) => {
  return {
    data: {
      token: "this is test JWT token",
      user: {
        name: "John Doe",
        email: "johndoe@gmail.com",
        isAdmin: true,
      },
    },
    status: 200,
  };
};
