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
import { AWS_CONFIG } from "../../urls";
function AddConfig(props) {
  const [accessKey, setAccessKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [sessionToken, setSessionToken] = useState("");
  const [region, setRegion] = useState("eu-west-1");
  const [token, setToken] = useState(null);
  //specifics for vms

  const createConfig = () => {
    let payload = {
      region: {
        code: region,
      },
      accessKey: accessKey,
      secretKey: secretKey,
      sessionToken: sessionToken,
    };
    //specifics for vms
    console.log(accessKey, secretKey, sessionToken, region);
    axios
      .post(AWS_CONFIG + "/add_aws_config", payload, {
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
        <ModalHeader>Add New Config</ModalHeader>
        <ModalBody>
          <hr className="mt-2" />
          <div className="flex justify-between align-center space-x-4">
            <Label className="mt-4 w-full">
              <span>Region</span>
              <Select
                className="mt-1"
                value={region}
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
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
              />
            </Label>
          </div>
          <div className="flex justify-between align-center space-x-4">
            <Label className="mt-4 w-full">
              <span>Secret Key</span>
              <Input
                className="mt-1"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
              />
            </Label>
            <Label className="mt-4 w-full">
              <span>Session Token</span>
              <Input
                className="mt-1"
                value={sessionToken}
                onChange={(e) => setSessionToken(e.target.value)}
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
