import React, { useState, useEffect } from "react";
import axios from "axios";
import { notify, makeRequest } from "../helpers";
import { EXPERIMENTS_URL } from "../urls";
import BarLoader from "../assets/img/bar-loader.svg";

import InfoCard from "../components/Cards/InfoCard";
import TargetCard from "../components/Cards/TargetCard";
import CTA from "../components/CTA";
import { Doughnut, Line } from "react-chartjs-2";
import ChartLegend from "../components/Chart/ChartLegend";
import GridCard from "../components/Chart/GridCard";
import PageTitle from "../components/Typography/PageTitle";
import SectionTitle from "../components/Typography/SectionTitle";
import RoundIcon from "../components/RoundIcon";
import response from "../utils/demo/experimentsData";
import {
  SearchIcon,
  MoonIcon,
  SunIcon,
  BellIcon,
  MenuIcon,
  OutlinePersonIcon,
  OutlineCogIcon,
  OutlineLogoutIcon,
} from "../icons";
import { male, female, ec2, eks, db, service, container } from "../assets/img";
import AddExperimentModal from "../components/Experiments/AddExperimentModal";
import ShowExperimentModal from "../components/Experiments/ShowExperimentModal";
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Button,
  Card,
  Input,
  Badge,
  Pagination,
} from "@windmill/react-ui";

import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from "../utils/demo/chartsData";

function Experiments() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [experiment, setExperiment] = useState({});
  const [experiments, setExperiments] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);

  // pagination setup
  const resultsPerPage = 10;
  const experiments_data = React.useMemo(() => experiments, [experiments]);

  // pagination change control
  function onPageChange(p) {
    setPage(p);
    console.log("page" + p);
    setData(
      experiments_data.slice((p - 1) * resultsPerPage, page * resultsPerPage)
    );
    console.log(data.length);
  }
  function closeModal() {
    setIsOpen(false);
    setIsShow(false);
  }

  const getExperiments = async () => {
    const url = EXPERIMENTS_URL + "/get_experiments";
    setLoading(true);
    const res = await makeRequest(url);
    console.log(res);
    setLoading(false);
    if (res.status === 200) {
      const experiments = res.data.data;
      setTotalResults(experiments.length);

      setExperiments(experiments);
      //set 1st 10 records for initial render
      setData(
        experiments.slice((page - 1) * resultsPerPage, page * resultsPerPage)
      );
      //notifications
      notify("Success", "Experiments fetched", "success");
    } else if (res.status !== 200) {
      const err = res.response;
      console.error(err);
      //notifications
      notify("Error", err.response.data.message, "danger");
    }
  };

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    getExperiments();
  }, []);

  return (
    <>
      <AddExperimentModal
        isOpen={isOpen}
        onClose={closeModal}
        refresh={getExperiments}
      />
      {experiment && (
        <ShowExperimentModal
          isOpen={isShow}
          onClose={closeModal}
          experiment={experiment}
          refresh={getExperiments}
        />
      )}
      <PageTitle>Experiments</PageTitle>
      <CTA description="An Experiment is a method of injecting failure into a system in a simple, safe, and secure way. Vurugu provides a range of attacks which you can run against your infrastructure. This includes impacting system resources, delaying or dropping network traffic, shutting down hosts, and more.">
        <Button
          onClick={() => {
            setIsOpen(true);
          }}
          className="text-white rounded font-sm"
        >
          New Experiment &nbsp;<i className="fas fa-plus"></i>
        </Button>
      </CTA>
      <SectionTitle>Recent Experiments</SectionTitle>
      <div className="flex justify-start flex-1">
        {loading && (
          <img src={BarLoader} className="w-20 h-12" alt="refreshing.." />
        )}
      </div>
      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Target Name</TableCell>
              <TableCell>Target Type</TableCell>
              <TableCell>Attack Type</TableCell>
              <TableCell>Start</TableCell>
              <TableCell>End</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((experiment, i) => {
              let badge = "";
              switch (experiment.runningStatus) {
                case "running":
                  badge = "primary";
                  break;
                case "completed":
                  badge = "success";
                  break;
                default:
                  badge = "warning";
              }
              return (
                <TableRow key={i}>
                  <TableCell>
                    <span className="text-sm">
                      {" "}
                      {experiment.target.instanceName}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge type="success" className="py-1 px-4">
                      {experiment.target.targetType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge type="danger" className="py-1 px-4">
                      {experiment.attack.name}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {" "}
                      {experiment.startTime
                        ? new Date(experiment.startTime).toDateString() +
                          " " +
                          new Date(experiment.startTime).toLocaleTimeString()
                        : "Unspecified"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {" "}
                      {experiment.endTime
                        ? new Date(experiment.endTime).toDateString() +
                          " " +
                          new Date(experiment.endTime).toLocaleTimeString()
                        : "Unspecified"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge type={badge} className="py-1 px-4">
                      {experiment.runningStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      onClick={() => {
                        console.log(experiment);
                        setIsShow(true);
                        setExperiment(experiment);
                      }}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <TableFooter>
          {totalResults && (
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              label="Table navigation"
              onChange={onPageChange}
            />
          )}
        </TableFooter>
      </TableContainer>
    </>
  );
}

export default Experiments;
