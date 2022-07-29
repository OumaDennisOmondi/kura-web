import React, { useState, useEffect } from "react";
import axios from "axios";
import { DENOMINATIOS_URL } from "../../urls";
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
function ShowConstituencyModal(props) {
  const [const_code, setConstcode] = useState("");
  const [const_name, setConstname] = useState("");
  const [constituency_to_edit, setConstituencyToEdit] = useState([]);


  const [token, setToken] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const deleteConstituency = () => {
    axios
      .post(
        DENOMINATIOS_URL + "/delete_target",
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
          params: {
            id: constituency_to_edit.id,
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
  const updateConstituency = () => {
    let payload ={}

    axios
      .post(DENOMINATIOS_URL + "/update_target", payload, {
        headers: {
          "x-api-key": process.env.REACT_APP_API_KEY,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        //console.log(res);
        notify("Success", "Target updated successfully", "success");
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
    const constituency = props.constituency;
    setConstituencyToEdit(constituency);
    console.log("constituency", constituency);
    const token = auth.getToken().access_token;
    setToken(token);
  }, [props.constituency]);

  const handleChange = ({ constituency }) => {
    //if (constituency.name == "pem_file") {
    //  const { name, files } = constituency;
    //  setConstituencyToEdit({ ...constituency_to_edit, [name]: files[0] });
    //  console.log(name, files[0]);
    //} else {
    const { name, value } = constituency;
    setConstituencyToEdit({ ...constituency_to_edit, [name]: value });
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
        <ModalHeader>Delete Target</ModalHeader>
        <ModalBody>You are about to delete this constituency, proceed?</ModalBody>
        <ModalFooter>
          <Button className="w-full sm:w-auto" onClick={closeDeleteModal}>
            Cancel
          </Button>
          <Button className="w-full sm:w-auto" onClick={deleteConstituency}>
            Confirm
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalHeader>Showing Constituency: {constituency_to_edit && constituency_to_edit.const_name}</ModalHeader>
        <ModalBody>
          <hr className="mt-2" />
         
          <div className="flex justify-between align-center space-x-4">
            <Label className="mt-4 w-full">
              <span>Code</span>
              <Input
                name="dnsAddress"
                className="mt-1"
                value={constituency_to_edit.const_code || ""}
                onChange={handleChange}
              />
            </Label>
            <Label className="mt-4 w-full">
              <span> Name</span>
              <Input
                name="instanceName"
                className="mt-1"
                value={constituency_to_edit.const_name || ""}
                onChange={handleChange}
              />
            </Label>
          </div>
        
        </ModalBody>
        <ModalFooter>
          <Button
            className="w-full sm:w-auto"
            onClick={() => {
              updateConstituency();
              console.log(constituency_to_edit);

              //notify("Success", "Target Edited", "success");
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

export default ShowConstituencyModal;
