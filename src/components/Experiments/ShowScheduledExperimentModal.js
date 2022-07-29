import React, { useState, useEffect } from "react";
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
import { notify } from "../../helpers";
function ShowScheduledExperimentModal(props) {
  const experiment = props.experiment;
  const [target_type, setTargetType] = useState("ec2");
  const [environment, setEnvironment] = useState("cloud");
  const [url, setURL] = useState("");
  const [instance_name, setInstanceName] = useState("");
  const [region, setRegion] = useState("us-east-1");
  const [dns_address, setDnsAddress] = useState("");
  const [pem_file, setPemFile] = useState(null);

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalHeader>Showing Scheduled Experiment:</ModalHeader>
        <ModalBody>
          <hr className="mt-2" />
          <div className="flex justify-between align-center space-x-4">
            <Label className="mt-4 w-full">
              <span>Target Type</span>
              <Select
                className="mt-1"
                value={target_type}
                onChange={(e) => setTargetType(e.target.value)}
              >
                <option value="ec2">EC2 Instance</option>
                <option disabled>App/Service</option>
                <option disabled>Database</option>
                <option disabled>Conntainer</option>
                <option disabled>K8 Cluster</option>
              </Select>
            </Label>
            <Label className="mt-4 w-full">
              <span>Environments</span>
              <Select
                value={environment}
                onChange={(e) => setEnvironment(e.target.value)}
              >
                <option value="cloud">On-Cloud</option>
                <option value="premise" disabled>
                  On-Premise
                </option>
              </Select>
            </Label>
          </div>
          <div className="flex justify-between align-center space-x-4">
            <Label className="mt-4 w-full">
              <span>URL</span>
              <Input
                className="mt-1"
                value={url}
                onChange={(e) => setURL(e.target.value)}
              />
            </Label>
            <Label className="mt-4 w-full">
              <span>Instance Name</span>
              <Input
                className="mt-1"
                value={instance_name}
                onChange={(e) => setInstanceName(e.target.value)}
              />
            </Label>
          </div>
          <div className="flex justify-between align-center space-x-4">
            <Label className="mt-4 w-full">
              <span>DNS Address</span>
              <Input
                className="mt-1"
                value={dns_address}
                onChange={(e) => setDnsAddress(e.target.value)}
              />
            </Label>
            <Label className="mt-4 w-full">
              <span>Region</span>
              <Select
                className="mt-1"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                <option value="us-east-1">US-East-1</option>
                <option value="us-west-1">US-West-1</option>
              </Select>
            </Label>
          </div>
          <div className="flex justify-between align-center space-x-4">
            <Label className="mt-4 w-full">
              <span>Pem File</span>
              <Input
                type="file"
                className="mt-1"
                value={pem_file}
                onchange={(e) => setPemFile(e.target.files[0])}
              />
            </Label>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="w-full sm:w-auto"
            onClick={() => {
              notify("Success", "Target Edited", "success");
            }}
          >
            Edit and Save
          </Button>
          <Button
            className="w-full sm:w-auto"
            onClick={() => {
              notify("Success", "Target Deleted", "success");
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

export default ShowScheduledExperimentModal;
