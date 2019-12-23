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

export const offlineUserLs = count => {
    const offline_data = sessionStorage.getItem("offline_brain_user");
    if (count === "get" && offline_data)
        return JSON.parse(sessionStorage.getItem("offline_brain_user")).count;
    if (offline_data) {
        const oldData = JSON.parse(offline_data);
        sessionStorage.setItem(
            "offline_brain_user",
            JSON.stringify({ count: oldData.count + 1 }),
        );
    } else {
        sessionStorage.setItem(
            "offline_brain_user",
            JSON.stringify({ count: 0}),
        );
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
