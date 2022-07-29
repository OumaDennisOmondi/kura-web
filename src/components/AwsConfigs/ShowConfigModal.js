import React, { useState, useEffect } from "react";
import axios from "axios";
import { AWS_CONFIG } from "../../urls";
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
  const [config_to_edit, setConfigToEdit] = useState({});
  const [accessKey, setAccessKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [sessionToken, setSessionToken] = useState("");
  const [region, setRegion] = useState("eu-west-1");

  const [token, setToken] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const deleteConfig = () => {
    axios
      .post(
        AWS_CONFIG + "/delete_aws_config",
        {},
        {
          headers: {
            "x-api-key": process.env.REACT_APP_API_KEY,
            Authorization: "Bearer " + token,
          },
          params: {
            id: config_to_edit.id,
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
  const updateConfig = (config_to_edit) => {
    let payload = {};
    let _region = {};
    //remove region and create region object before appending to payload
    _region = {
      region: {
        code: document.getElementById("region").value,
      },
    };

    delete config_to_edit.region;
    delete config_to_edit.username;

    payload = { ...config_to_edit, ..._region };
    console.log("Config", payload);

    axios
      .post(AWS_CONFIG + "/update_aws_config", payload, {
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
    const config = props.config;
    const token = auth.getToken().access_token;
    setToken(token);
    setConfigToEdit(config);
    console.log("config", config);
  }, [props.config]);

  const handleChange = ({ target }) => {
    //if (target.name == "pem_file") {
    //  const { name, files } = target;
    //  setConfigToEdit({ ...config_to_edit, [name]: files[0] });
    //  console.log(name, files[0]);
    //} else {
    const { name, value } = target;
    setConfigToEdit({ ...config_to_edit, [name]: value });
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
        <ModalHeader>Delete Config</ModalHeader>
        <ModalBody>You are about to delete this target, proceed?</ModalBody>
        <ModalFooter>
          <Button className="w-full sm:w-auto" onClick={closeDeleteModal}>
            Cancel
          </Button>
          <Button className="w-full sm:w-auto" onClick={deleteConfig}>
            Confirm
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalHeader>
          Showing Config : {config_to_edit.region && config_to_edit.region.name}
        </ModalHeader>
        <ModalBody>
          <hr className="mt-2" />
          <div className="flex justify-between align-center space-x-4">
            <Label className="mt-4 w-full">
              <span>Region</span>
              <Select
                className="mt-1"
                defaultValue={
                  config_to_edit.region && config_to_edit.region.code
                }
                name="region"
                id="region"
                onChange={(e) => setRegion(e.target.value)}
              >
                {props.regions &&
                  props.regions.map((region, i) => (
                    <option key={region.code} value={region.code}>
                      {region.name}
                    </option>
                  ))}
              </Select>
            </Label>
            <Label className="mt-4 w-full">
              <span>Access Key</span>
              <Input
                className="mt-1"
                value={config_to_edit.accessKey || ""}
                name="accessKey"
                onChange={handleChange}
              />
            </Label>
          </div>
          <div className="flex justify-between align-center space-x-4">
            <Label className="mt-4 w-full">
              <span>Secret Key</span>
              <Input
                className="mt-1"
                name="secretKey"
                value={config_to_edit.secretKey || ""}
                onChange={handleChange}
              />
            </Label>
            <Label className="mt-4 w-full">
              <span>Session Token</span>
              <Input
                className="mt-1"
                name="sessionToken"
                value={config_to_edit.sessionToken || ""}
                onChange={handleChange}
              />
            </Label>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="w-full sm:w-auto"
            onClick={() => {
              updateConfig(config_to_edit);
              console.log(config_to_edit);

              //notify("Success", "Config Edited", "success");
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
