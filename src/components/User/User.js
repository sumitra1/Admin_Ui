import { useRef } from "react";
import PropTypes from "prop-types";

import styles from "./User.module.css";


//perform Action on user
const UserOne = (props) => {
  const { userOne, deleteUserRow, editUserRow, saveUserData, selectOneRow } = props;

  const nameIDRef = useRef(null);
  const emailIDRef = useRef(null);
  const roleIDRef = useRef(null);

  return (
    <tr key={userOne.id} className={userOne.selected ? styles.selected : ""}>
      <td>
        <label for={`check-${userOne.id}`}>
          <input
            id={`check-${userOne.id}`}
            checked={userOne.selected}
            data={`${userOne.selected}`}
            onChange={() => selectOneRow(userOne.id)}
            type="checkbox"
           
          ></input>
        </label>
      </td>
      <td>
        <input
          className={userOne.edit ? styles.editable : styles.readOnly}
          readOnly={!userOne.edit}
          type="text"
          ref={nameIDRef}
          name="name"
          defaultValue={userOne.name}
        ></input>
      </td>
      <td>
        <input
          className={userOne.edit ? styles.editable : styles.readOnly}
          readOnly={!userOne.edit}
          type="email"
          ref={emailIDRef}
          name="email"
          defaultValue={userOne.email}
        />
      </td>
      <td>
        <input
          className={userOne.edit ? styles.editable : styles.readOnly}
          readOnly={!userOne.edit}
          type="text"
          ref={roleIDRef}
          name="role"
          defaultValue={userOne.role}
        />
      </td>
      <td className={styles.icons}>
        {userOne.edit ? (
          <i
            onClick={() => saveUserData(userOne.id, nameIDRef, emailIDRef, roleIDRef)}
            className="fas fa-save"
          ></i>
        ) : (
          <i onClick={() => editUserRow(userOne.id)} className="fas fa-edit"></i>
        )}

        <i onClick={() => deleteUserRow(userOne.id)} className="fas fa-trash-alt"></i>
      </td>
    </tr>
  );
};

UserOne.propTypes = {
  userOne: PropTypes.object,
  deleteUserRow: PropTypes.func,
  editUserRow: PropTypes.func,
  saveUserData: PropTypes.func,
  selectOneRow: PropTypes.func
};

export default UserOne;
