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
  const [const_code, setConstcode] = useState("0");
  const [ward_name, serWardname] = useState("");
  const [ward_code, setWardcode] = useState("");
  const [token, setToken] = useState(null);
  //specifics for vms


  const createConstituency = () => {
    //specifics for ec2
   const payload = {
      ward_name,
      const_code 
   }
    console.log(
      ward_name, const_code
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
              <span>Constituency</span>
              <Select
                className="mt-1"
                value={const_code}
                onChange={(e) => setConstcode(e.target.value)}
              >
                <option value="0">--SELECT-- </option>
                <option value="ec2">WAJIR NORTH </option>
                <option value="">WAJIR EAST </option>
                <option value="">WAJIR WEST </option>
                <option value="">WAJIR SOUTH </option>
                <option value="">ELDAS </option>
                <option value="">TARBAJ</option>
              </Select>
            </Label>
          </div>

          <div className="flex justify-between align-center space-x-4">
            <Label className="mt-4 w-full">
              <span>Code</span>
              <Input
                className="mt-1"
                value={ward_code}
                onChange={(e) => setWardcode(e.target.value)}
              />
            </Label>
            <Label className="mt-4 w-full">
              <span>Constituency Name</span>
              <Input
                className="mt-1"
                value={ward_name}
                onChange={(e) => serWardname(e.target.value)}
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
