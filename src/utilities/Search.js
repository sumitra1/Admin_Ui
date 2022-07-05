
//search user
export const searchFromUsers = (search, users) => {
  let tempInSearch = search.toLowerCase();
  return users.map((userRow) => {
    if (
      userRow.name.toLowerCase().includes(tempInSearch) ||
      userRow.email.toLowerCase().includes(tempInSearch) ||
      userRow.role.toLowerCase().includes(tempInSearch)
    ) {
       userRow.show = true;
       return userRow;
    }
    userRow.show = false;
    return userRow;
  });
};
