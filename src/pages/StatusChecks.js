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
import response from "../utils/demo/statusData";
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

function StatusChecks() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [avators, setAvators] = useState([male, female]);

  // pagination setup
  const resultsPerPage = 10;
  const totalResults = response.length;

  // pagination change control
  function onPageChange(p) {
    setPage(p);
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage));
  }, [page]);

  return (
    <>
      <PageTitle>StatusChecks</PageTitle>
      <CTA
        description="Status Check checks the state of systems before, during, and after
       a Scenario. They can also automatically halt Scenarios if systems become unhealthy 
       or unresponsive."
      >
        <Button className="text-white rounded font-sm">
          New Status Check &nbsp;<i className="fas fa-plus"></i>
        </Button>
      </CTA>
      <div className="flex justify-start flex-1 my-10">
        <div className="relative w-full max-w-xl focus-within:text-green-600">
          <div className="absolute inset-y-0 flex items-center pl-2">
            <SearchIcon className="w-4 h-4" aria-hidden="true" />
          </div>
          <Input
            className="pl-8 text-gray-700"
            placeholder="Search for projects"
            aria-label="Search"
          />
        </div>
      </div>
      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Name</TableCell>
              <TableCell>Status Code</TableCell>
              <TableCell>Timeout</TableCell>
              <TableCell>Action</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((status_check, i) => (
              <TableRow key={i}>
                <TableCell>
                  <span className="text-sm"> {status_check.name}</span>
                </TableCell>
                <TableCell>
                  <Badge type="success" className="py-1 px-4">
                    {status_check.status_code} - OK
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className="py-1 px-4" type="danger">
                    {status_check.timeout}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button size="small">Run</Button>
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
    </>
  );
}

export default StatusChecks;
