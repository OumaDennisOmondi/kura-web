import React, { useState, useEffect } from "react";
import axios from "axios";
import { USERS } from "../../urls";
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Badge,
  Pagination,
  Select,
  Input,
  Label,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@windmill/react-ui";
import { notify, auth } from "../../helpers";
function ShowConfigModal(props) {
  const [user_to_edit, setUserToEdit] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("1234");
  const [role, setRole] = useState("");

  const [token, setToken] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const deleteUser = () => {
    axios
      .post(
        USERS + "/delete_user",
        {},
        {
          headers: {
            "x-api-key": process.env.REACT_APP_API_KEY,
            Authorization: "Bearer " + token,
          },
          params: {
            id: user_to_edit.id,
          },
        }
      )
      .then((res) => {
        //console.log(res);
        notify("Success", res.data.message, "success");
        //refresh the table
        props.refresh();
        closeDeleteModal();

        setTimeout(() => {
          props.onClose();
        }, 1500);
      })
      .catch((err) => {
        notify("Error", "Something Went wrong", "danger");
        console.error(err);
      });
  };
  const updateUser = (user_to_edit) => {
    let payload = {
      id: user_to_edit.id,
      username: user_to_edit.username,
      role: {
        id: document.getElementById("role").value,
      },
    };

    axios
      .post(USERS + "/update_user", payload, {
        headers: {
          "x-api-key": process.env.REACT_APP_API_KEY,
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        //console.log(res);
        notify("Success", res.data.message, "success");
        props.refresh();
        setTimeout(() => {
          props.onClose();
        }, 1500);
      })
      .catch((err) => {
        notify("Error", "Something Went wrong", "danger");
        console.error(err.response, err.message, err.request);
      });
  };

  useEffect(() => {
    const user = props.user;
    const token = auth.getToken().access_token;
    setToken(token);
    setUserToEdit(user);
    console.log("user", user);
  }, [props.user]);

  const handleChange = ({ target }) => {
    //if (target.name == "pem_file") {
    //  const { name, files } = target;
    //  setConfigToEdit({ ...user_to_edit, [name]: files[0] });
    //  console.log(name, files[0]);
    //} else {
    const { name, value } = target;
    setUserToEdit({ ...user_to_edit, [name]: value });
    console.log(name, value);
    ///}
  };
  function openDeleteModal() {
    setIsDeleteModalOpen(true);
  }
  function closeDeleteModal() {
    setIsDeleteModalOpen(false);
  }
  return (
    <>
      {/*delete modal*/}
      <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
        <ModalHeader>Delete User</ModalHeader>
        <ModalBody>You are about to delete this target, proceed?</ModalBody>
        <ModalFooter>
          <Button className="w-full sm:w-auto" onClick={closeDeleteModal}>
            Cancel
          </Button>
          <Button className="w-full sm:w-auto" onClick={deleteUser}>
            Confirm
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalHeader>
          Showing User : {user_to_edit.role && user_to_edit.role.name}
        </ModalHeader>
        <ModalBody>
          <hr className="mt-2" />
          <div className="flex justify-between align-center space-x-4">
            <Label className="mt-4 w-full">
              <span>Role</span>
              <Select
                className="mt-1"
                defaultValue={props.role}
                name="role"
                id="role"
                onChange={(e) => setRole(e.target.value)}
              >
                {props.roles &&
                  props.roles.map((role, i) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
              </Select>
            </Label>
            <Label className="mt-4 w-full">
              <span>Username</span>
              <Input
                disabled
                className="mt-1"
                value={user_to_edit.username || ""}
                name="accessKey"
                onChange={handleChange}
              />
            </Label>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="w-full sm:w-auto"
            onClick={() => {
              updateUser(user_to_edit);
              console.log(user_to_edit);

              //notify("Success", "User Edited", "success");
            }}
          >
            Edit and Save
          </Button>
          <Button
            className="w-full sm:w-auto bg-red-600"
            onClick={() => {
              openDeleteModal();
            }}
          >
            Delete
          </Button>
          <Button className="w-full sm:w-auto" onClick={props.onClose}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ShowConfigModal;
