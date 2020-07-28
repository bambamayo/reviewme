export const setDate = (isostring) => {
  let date = new Date(isostring);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dt = date.getDate();

  if (dt < 10) {
    dt = "0" + dt;
  }
  if (month < 10) {
    month = "0" + month;
  }

  return `${dt}|${month}|${year}`;
};

export const getTokenFromLS = () => {
  let token = localStorage.getItem("token");

  return token;
};
