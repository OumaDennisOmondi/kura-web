import React, { useState, useEffect } from "react";
import axios from "axios";
import { EXPERIMENTS_URL } from "../../urls";
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
  Textarea,
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
function ShowExperimentModal(props) {
  const experiment = props.experiment;
  const [target_type, setTargetType] = useState("ec2");
  const [environment, setEnvironment] = useState("cloud");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [token, setToken] = useState(null);

  function openDeleteModal() {
    setIsDeleteModalOpen(true);
  }
  function closeDeleteModal() {
    setIsDeleteModalOpen(false);
  }
  const deleteExperiment = () => {
    axios
      .post(
        EXPERIMENTS_URL + "/delete_experiment",
        {},
        {
          headers: {
            "x-api-key": process.env.REACT_APP_API_KEY,
            Authorization: "Bearer " + token,
          },
          params: {
            id: props.experiment.id,
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
        notify("Error", err.response.data.message, "danger");
        console.error(err);
      });
  };

  useEffect(() => {
    const experiment = props.experiment;
    console.log("experiment", experiment.target);

    const token = auth.getToken().access_token;
    setToken(token);
  }, [props.experiment]);
  return (
    <>
      {/*delete modal*/}
      <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
        <ModalHeader>Delete Target</ModalHeader>
        <ModalBody>You are about to delete this Experiment, proceed?</ModalBody>
        <ModalFooter>
          <Button className="w-full sm:w-auto" onClick={closeDeleteModal}>
            Cancel
          </Button>
          <Button className="w-full sm:w-auto" onClick={deleteExperiment}>
            Confirm
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalHeader>
          Showing Experiment :{" "}
          <Badge
            type={
              experiment.experimentStatus
                ? experiment.experimentStatus === "failed"
                  ? "danger"
                  : "success"
                : "warning"
            }
            className="py-1 px-4"
          >
            {experiment.experimentStatus
              ? experiment.experimentStatus
              : "Pending"}
          </Badge>
        </ModalHeader>
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
              <span>Instance Name</span>
              <Input
                className="mt-1"
                value={experiment.target ? experiment.target.instanceName : ""}
              />
            </Label>
          </div>
          <div className="flex justify-between align-center space-x-4">
            <Label className="mt-4 w-full">
              <span>Start Date</span>
              <Input
                className="mt-1"
                value={
                  experiment.startTime
                    ? new Date(experiment.startTime).toDateString() +
                      " " +
                      new Date(experiment.startTime).toLocaleTimeString()
                    : "Unspecified"
                }
              />
            </Label>
            <Label className="mt-4 w-full">
              <span>End Date</span>
              <Input
                className="mt-1"
                value={
                  experiment.endTime
                    ? new Date(experiment.endTime).toDateString() +
                      " " +
                      new Date(experiment.endTime).toLocaleTimeString()
                    : "Unspecified"
                }
              />
            </Label>
          </div>
          <div className="flex justify-between align-center space-x-4">
            <Label className="mt-4 w-full">
              <span>Experiment Output Log</span>
              <Textarea
                className="mt-1"
                rows="10"
                value={experiment.experimentResult}
              />
            </Label>
          </div>
        </ModalBody>
        <ModalFooter>
          {/*<Button
            className="w-full sm:w-auto"
            onClick={() => {
              notify("Success", "Target Edited", "success");
            }}
          >
            Edit & Unleash Vurugu
          </Button>
          <Button
            className="w-full sm:w-auto"
            onClick={() => {
              notify("Success", "Target Edited", "success");
            }}
          >
            Edit & Schedule
          </Button>*/}
          <Button
            className="w-1/2 sm:w-auto bg-red-600"
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

export default ShowExperimentModal;
