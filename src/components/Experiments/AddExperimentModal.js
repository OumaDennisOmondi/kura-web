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
import { notify, makeRequest, auth } from "../../helpers";
import { EXPERIMENTS_URL, TARGETS_URL } from "../../urls";
function AddExperimentModal(props) {
  const [targets, setTargets] = useState([]);
  const [target_type, setTargetType] = useState("ec2");
  const [environment, setEnvironment] = useState("cloud");
  const [target_id, setTargetId] = useState("1");
  const [attack_id, setAttackId] = useState("1");
  const [loading, setLoading] = useState(false);

  const [token, setToken] = useState(null);
  const [attack_description, setAttackDescription] = useState(
    "Generates high load for one or more CPU cores."
  );
  const attack_types = [
    {
      type: "CPU",
      description: "Generates high load for one or more CPU cores.",
    },
    {
      type: "Memory",
      description: "Allocates a specific amount of RAM.",
    },
    {
      type: "I/O",
      description:
        "Puts read/write pressure on I/O devices such as hard disks..",
    },
    {
      type: "Disk",
      description: "Writes files to disk to fill it to a specific percentage.",
    },
    {
      type: "Shutdown/Instance Failure",
      description:
        "Performs a shutdown (and an optional reboot) on the target.",
    },
    {
      type: "Time Travel",
      description:
        "Changes the host's system time, which can be used to simulate adjusting to daylight saving time and other time-related events.",
    },
    {
      type: "Process Killer",
      description: "Generates high load for one or more CPU cores.",
    },
    {
      type: "Latency",
      description: "Injects latency into all matching egress network traffic..",
    },
    {
      type: "Packet Loss",
      description:
        "Induces packet loss into all matching egress network traffic.",
    },
    {
      type: "Blackhole",
      description: "Drops all matching network traffic.",
    },
    {
      type: "DNS",
      description: "Blocks access to DNS servers.",
    },
  ];
  const getTargets = async () => {
    const url = TARGETS_URL + "/get_targets";
    setLoading(true);
    const res = await makeRequest(url);
    console.log(res);
    setLoading(false);
    if (res.status === 200) {
      const targets = res.data.data;

      setTargets(targets);
      console.log("Targets for experiments", targets);
    } else if (res.status !== 200) {
      const err = res.response;
      console.error(err);
      //notifications
      notify("Error", "Something went Wrong", "danger");
    }
  };

  const addExperiment = () => {
    let payload = {
      target: {
        id: target_id,
      },
      attack: {
        id: 1,
      },
    };
    axios
      .post(EXPERIMENTS_URL + "/add_experiment", payload, {
        headers: {
          "x-api-key": process.env.REACT_APP_API_KEY,
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        //console.log(res);
        props.refresh();
        notify("Success", res.data.message, "success");
      })
      .catch((err) => {
        notify("Error", err.response.data.message, "danger");
        console.error(err.response.data.message);
      });
  };

  useEffect(() => {
    const token = auth.getToken().access_token;
    setToken(token);
    //get targets
    //setData(targets.slice((page - 1) * resultsPerPage, page * resultsPerPage));
    getTargets();
  }, []);

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalHeader>Add New Experiment</ModalHeader>
        <ModalBody>
          <hr className="mt-2" />
          <div className="flex justify-between align-center space-x-4">
            <Label className="mt-4 w-full">
              <span>Target Type</span>
              <Select
                className="mt-1"
                value={target_type}
                //onChange={(e) => setTargetType(e.target.value)}
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
                //onChange={(e) => setEnvironment(e.target.value)}
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
              <span>Attack Type</span>
              <Select
                className="mt-1"
                onChange={(e) => {
                  setAttackId(e.target.value);
                  const index = e.target.selectedIndex;
                  const el = e.target.childNodes[index];
                  const option = el.getAttribute("id");
                  setAttackDescription(option);
                }}
              >
                {attack_types.map((attack_type, index) => (
                  <option
                    value={index + 1}
                    id={attack_type.description}
                    key={attack_type.type}
                  >
                    {attack_type.type}
                  </option>
                ))}
              </Select>
              <span>{attack_description}</span>
            </Label>
          </div>
          <div className="flex justify-between align-center space-x-4">
            <Label className="mt-4 w-full">
              <span>Pick from Available Targets</span>
              <Select
                className="mt-1"
                //value={target_type}
                defaultValue={"0"}
                onChange={(e) => {
                  setTargetId(e.target.value);
                }}
              >
                <option value="0" disabled>
                  --Select Target--
                </option>
                {targets.map((target, index) => (
                  <option value={target.id} key={index}>
                    {target.instanceName}
                  </option>
                ))}
              </Select>
            </Label>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="w-full sm:w-auto"
            onClick={() => {
              notify("Success", "Experiment Scheduled", "success");
            }}
          >
            Schedule Experiment
          </Button>
          <Button
            className="w-full sm:w-auto"
            onClick={() => {
              addExperiment();
            }}
          >
            Unleash Vurugu (Run)
          </Button>
          <Button className="w-full sm:w-auto" onClick={props.onClose}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default AddExperimentModal;
