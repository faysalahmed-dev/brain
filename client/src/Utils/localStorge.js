const LS_KEY_NAME = "brainUser";

export const saveUserInLs = (data, token) => {
  localStorage.setItem(
    LS_KEY_NAME,
    JSON.stringify({
      data,
      token,
    }),
  );
};

export const updateDataLs = data => {
  const userData = getUserFromLs();
  const newData = { ...userData, data };
  return saveUserInLs(newData.data, newData.token);
};

export const getUserFromLs = () =>
  JSON.parse(localStorage.getItem(LS_KEY_NAME));

export const deleteUserFormLs = () => localStorage.removeItem(LS_KEY_NAME);
