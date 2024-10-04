export const getNavs = (role) => {
    const finalNavs = [];

    for (let i = 0; i < allNav.length; i++) {
        // Check if the user's role is in the array of roles for the nav item
        if (Array.isArray(allNav[i].role) && allNav[i].role.includes(role)) {
            finalNavs.push(allNav[i]);
        } else if (role === allNav[i].role) {
            finalNavs.push(allNav[i]);
        }
    }
    return finalNavs;
}
