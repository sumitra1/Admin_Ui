import {processUsersListResponse} from "../utilities/Users";
import axios from "axios";


//Api endpoint
const API_BASE_URL =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";


  const getListOfLocalUsers = (setListOfUsers) => {
    axios
      .get("./members.json")
      .then((response) => {
        setListOfUsers(processUsersListResponse(response.data));
      })
      .catch((error) => console.error(error));
  };

const getListOfAllUsers = (setListOfUsers) => {
  axios
    .get(API_BASE_URL)
    .then((response) => {
      setListOfUsers(processUsersListResponse(response.data));
    })
    .catch((err) => getListOfLocalUsers(setListOfUsers));
};


export { getListOfAllUsers };
