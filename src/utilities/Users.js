//show user


export const processUsersListResponse = (usersList)=> {
    return usersList.map(users => {
       
        users.edit = false;
        users.show = true;
        users.selected = false;
        return users;
    })
} 