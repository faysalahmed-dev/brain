export default token => {
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
        },
    };
};
