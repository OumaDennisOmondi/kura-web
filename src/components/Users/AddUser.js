import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { USERS } from "../../urls";
function AddConfig(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("1234");
  const [role, setRole] = useState("");
  const [token, setToken] = useState(null);
  //specifics for vms

  const createConfig = () => {
    let payload = {
      role: {
        id: role,
      },
      username: username,
      password: password,
    };
    //specifics for vms
    console.log(username, password, role, role);
    axios
      .post(USERS + "/add_user", payload, {
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
      })
      .catch((err) => {
        notify("Error", "Something went wrong", "danger");
        console.error(err);
      });
  };
  useEffect(() => {
    const token = auth.getToken().access_token;
    setToken(token);
  }, []);

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalHeader>Add New User</ModalHeader>
        <ModalBody>
          <hr className="mt-2" />
          <div className="flex justify-between align-center space-x-4">
            <Label className="mt-4 w-full">
              <span>Role</span>
              <Select
                className="mt-1"
                value={role}
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
                className="mt-1"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Label>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="w-full sm:w-auto"
            onClick={() => {
              createConfig();
            }}
          >
            Save
          </Button>
          <Button className="w-full sm:w-auto" onClick={props.onClose}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default AddConfig;
