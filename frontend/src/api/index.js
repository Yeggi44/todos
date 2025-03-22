// export const url = "https://todoapp-nine-khaki.vercel.app/api";
export const url = "http://localhost:5000/api";

export const setHeaders = () => {
  const headers = {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  };

  return headers;
};
