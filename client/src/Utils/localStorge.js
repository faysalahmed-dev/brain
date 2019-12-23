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

export const totalCountDataLs = count => {
    // get count
    const count_data = sessionStorage.getItem("brain_count");
    // count is get mean get data form local stroage
    if (count === "get" && count_data)
        return JSON.parse(sessionStorage.getItem("brain_count")).count;
    // update count data
    if (count_data) {
        const oldData = JSON.parse(count_data);
        sessionStorage.setItem(
            "brain_count",
            JSON.stringify({ count: oldData.count + 1 }),
        );
        // reset count data
    } else {
        sessionStorage.setItem("brain_count", JSON.stringify({ count: 0 }));
    }
};

export const updateDataLs = data => {
    const userData = getUserFromLs();
    const newData = { ...userData, data };
    return saveUserInLs(newData.data, newData.token);
};
export const getUserFromLs = () =>
    JSON.parse(localStorage.getItem(LS_KEY_NAME));

export const deleteUserFormLs = () => localStorage.removeItem(LS_KEY_NAME);
