import patten from "./regPatten";
export const testInputValue = (name, value, password) => {
  if (name === "confirmPassword") {
    if (!patten.password.test(value) || password !== value) {
      return [name, true];
    }
    return [name, false];
  } else if (!patten[name].test(value)) return [name, true];
  else return [name, false];
};

export const buttonDisabledOrNot = error =>
  Object.values(error).every(err => err === false);
