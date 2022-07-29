import React, { useState, useEffect } from "react";

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
import ShowScheduledExperimentModal from "../components/Experiments/ShowScheduledExperimentModal";
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

function Schedules() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [avators, setAvators] = useState([male, female]);
  const [target_type, setTargetType] = useState("all target types");
  const [isOpen, setIsOpen] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [experiment, setExperiment] = useState({});

  // pagination setup
  const resultsPerPage = 10;
  const totalResults = response.length;

  // pagination change control
  function onPageChange(p) {
    setPage(p);
  }
  function closeModal() {
    setIsOpen(false);
    setIsShow(false);
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage));
  }, [page]);

  return (
    <>
      <ShowScheduledExperimentModal
        isOpen={isShow}
        onClose={closeModal}
        experiment={experiment}
      />
      <PageTitle>Scheduled Experiments</PageTitle>
      <CTA description="Experiments can be scheduled to run randomly within a timeframe. A Scheduled Experiments will run at least once on the day and in the time window you select. The time window the Experiments runs can also be set.">
        {/*<Button
          onClick={() => {
            setIsOpen(true);
          }}
          className="text-white rounded font-sm"
        >
          New Experiment &nbsp;<i className="fas fa-plus"></i>
        </Button>*/}
      </CTA>
      <SectionTitle>Recent Schedules</SectionTitle>
      {target_type === "hosts" || target_type === "all target types" ? (
        <TableContainer>
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Name</TableCell>
                <TableCell>Target Type</TableCell>
                <TableCell>Attack Type</TableCell>
                <TableCell>Will run ON</TableCell>
                <TableCell>Action</TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              {data.map((target, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <span className="text-sm"> {target.name}</span>
                  </TableCell>
                  <TableCell>
                    <Badge type="success" className="py-1 px-4">
                      {target.target_type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge type="danger" className="py-1 px-4">
                      {target.attack_type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {" "}
                      {new Date(target.date).toDateString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      onClick={() => {
                        console.log(target);
                        setIsShow(true);
                        setExperiment(experiment);
                      }}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TableFooter>
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              label="Table navigation"
              onChange={onPageChange}
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <SectionTitle>Currently No {target_type.toUpperCase()} .</SectionTitle>
      )}
    </>
  );
}

export default Schedules;
