export default {
  email: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
  //password: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
  password: /[\w]{6,}/,
  name: /[a-z ]+/i,
};
