exports.filterObject = (obj, field) => {
  // 1 obj should be object
  // 2 field should be array
  const upDateObj = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const key in obj) {
    if (field.includes(key)) {
      upDateObj[key] = obj[key];
    }
  }
  return upDateObj;
};
