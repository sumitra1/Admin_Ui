import PropTypes from "prop-types";
import { useEffect } from "react";

import UserOne from "../User/User";
import configObject from "../../constantsPageSize";
import styles from "./UsersList.module.css";


//it will give list of users
//find user and show userList
const ListOfUsers = (props) => {
  const
   {
    selectAllRows,selectOneRow,selectAllRowRef,NumberOfUsers,deleteUserRow,editUserRow,saveUserData,setNumberOfPage,NumberOfPage,
  } = props;
  useEffect(() => {
    if (NumberOfUsers.length === 0 && NumberOfPage > 1) {
      setNumberOfPage(NumberOfPage - 1);
    }
  }, [NumberOfPage, setNumberOfPage, NumberOfUsers.length]);
  let fillRowsData = [];

  if (NumberOfUsers.length === 0 && NumberOfPage === 1) {
    return <div>NO USERS FOUND IN THE SYSTEM</div>;
  }

  for (
    let k = NumberOfUsers.filter((user) => user.show).length;
    k < configObject.PAGE_SIZE;
    k++
  ) {
    fillRowsData.push(<tr key={k}></tr>);
  }

  
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>
            <input   
              ref={selectAllRowRef}
              type="checkbox"
              onChange={(e) => {
                selectAllRows(e);
              }}
              name="selectAll"
            />
          </th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {NumberOfUsers.map((userOne) => {
          return userOne.show ? (
            <UserOne
            selectOneRow={selectOneRow}
              saveUserData={saveUserData}
              editUserRow={editUserRow}
              deleteUserRow={deleteUserRow}
              key={userOne.id}
              userOne={userOne}
            ></UserOne>
          ) : (
            ""
          );
        })}
        {fillRowsData}
      </tbody>
    </table>
  );
};

ListOfUsers.propTypes = {
  NumberOfUsers: PropTypes.array,
  deleteUserRow: PropTypes.func,
  editUserRow: PropTypes.func,
  saveUserData: PropTypes.func,
  selectAllRows: PropTypes.func,
  selectOneRow: PropTypes.func,
  selectAllRowRef: PropTypes.object,
  setNumberOfPage: PropTypes.func,
  NumberOfPage: PropTypes.number,
};

export default ListOfUsers;
