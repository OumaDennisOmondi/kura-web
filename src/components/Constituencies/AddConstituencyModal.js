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
import { DENOMINATIOS_URL } from "../../urls";
function AddConstituencyModal(props) {
  const [const_code, setConstcode] = useState("");
  const [const_name, setConstname] = useState("");
  const [token, setToken] = useState(null);
  //specifics for vms


  const createConstituency = () => {
    //specifics for ec2
   const payload = {
      const_name,
      const_code 
   }
    console.log(
      const_name, const_code
    );
    axios
      .post(DENOMINATIOS_URL + "/constituency/", payload, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
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
        <ModalHeader>Add New Target</ModalHeader>
        <ModalBody>
          <hr className="mt-2" />

          <div className="flex justify-between align-center space-x-4">
            <Label className="mt-4 w-full">
              <span>Code</span>
              <Input
                className="mt-1"
                value={const_code}
                onChange={(e) => setConstcode(e.target.value)}
              />
            </Label>
            <Label className="mt-4 w-full">
              <span>Constituency Name</span>
              <Input
                className="mt-1"
                value={const_name}
                onChange={(e) => setConstname(e.target.value)}
              />
            </Label>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="w-full sm:w-auto"
            onClick={() => {
              createConstituency();
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

export default AddConstituencyModal;
