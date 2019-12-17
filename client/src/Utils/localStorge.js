export const saveUserInLs = (data, token) => {
  localStorage.setItem(
    "brain_user",
    JSON.stringify({
      data,
      token,
    }),
  );
};
