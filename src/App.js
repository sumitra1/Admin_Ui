import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import PaginationOfPage from "./components/Pagination/Pagination";
import ListOfUsers from "./components/UsersList/UsersList";
import configObject from "./constantsPageSize";
import { getListOfAllUsers } from "./services/UserService";
import { getIndexOfRecord } from "./utilities/Paging";
import { searchFromUsers } from "./utilities/Search";

function App() {
  const [updateRow, setUpdate] = useState(false);
  const [usersRow, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const selectAllRowRef = useRef(null);
  useEffect(() => {
    getListOfAllUsers(setUsers);
  }, []);

//Delete User
  const deleteUserRow = (id) => {
    let tempUsers = usersRow.filter((user) => user.id !== id);
    setUsers(tempUsers);
    setUpdate((prevState) => !prevState);
  };
  //Search Users
  const searchUsersData = (e) => {
    setPage(1);
    setUsers(searchFromUsers(e.target.value, usersRow));
  };

//Save User
  const saveUserData = (id, nameRef, emailRef, roleRef) => {
    let tempUsers = usersRow;
    const index = tempUsers.findIndex((user) => user.id === id);
    tempUsers[index].name = nameRef.current.value;
    tempUsers[index].email = emailRef.current.value;
    tempUsers[index].role = roleRef.current.value;
    tempUsers[index].edit = false;
    setUsers(tempUsers);
    setUpdate((prevState) => !prevState);
  };
//Edit User
const editUserRow = (id) => {
  let tempUsers = usersRow;
  const index = tempUsers.findIndex((user) => user.id === id);
  tempUsers[index].edit = true;
  setUsers(tempUsers);
  setUpdate((prevState) => !prevState);
};
  const selectOneRow = (id) => {
    let tempUsers = usersRow;
    const index = tempUsers.findIndex((user) => user.id === id);
    tempUsers[index].selected = !tempUsers[index].selected;
    setUsers(tempUsers);
    setUpdate((prevState) => !prevState);
  };

  const selectAllRows = (e) => {
    const listedUserIds = usersRow
      .filter((user) => user.show)
      .slice(index, index + configObject.PAGE_SIZE)
      .map((user) => user.id);

    let tempUsers = usersRow.map((user) => {
      if (listedUserIds.includes(user.id)) {
        user.selected = e.target.checked;
        return user;
      }
      return user;
    });

    setUsers(tempUsers);
    setUpdate(!updateRow);
  };

  const deleteSelected = () => {
    // if (window.confirm("Selected users will be deleted")) {
      setUsers((prevState) => prevState.filter((user) => !user.selected));
      selectAllRowRef.current.checked = false;
    // }
  };

  const index = getIndexOfRecord(page);
  return (
    <div className="App">
      <input
        className="search"
        type="text"
        placeholder="Search by name, email or role"
        onChange={searchUsersData}
      ></input>
      <ListOfUsers
        NumberOfPage={page}
        setNumberOfPage={setPage}
        selectAllRows={selectAllRows}
        selectAllRowRef={selectAllRowRef}
        selectOneRow={selectOneRow}
        saveUserData={saveUserData}
        editUserRow={editUserRow}
        deleteUserRow={deleteUserRow}
        NumberOfUsers={usersRow
          .filter((user) => user.show)
          .slice(index, index + configObject.PAGE_SIZE)}
      ></ListOfUsers>
      <PaginationOfPage
        usersListLength={usersRow.filter((user) => user.show).length}
        pageNumber={page}
        setNumberOfPage={setPage}
        deleteSelectedRows={deleteSelected}
      ></PaginationOfPage>
    </div>
  );
}

export default App;
