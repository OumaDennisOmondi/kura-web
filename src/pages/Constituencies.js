import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { notify, makeRequest } from "../helpers";
import { BASE_URL, AUTH_URL } from "../urls";
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
import response from "../utils/demo/targetsData";
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

function Constituencies() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [constituency, setConstituency] = useState({});
  const [constituencies, setConstituencies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);

  // pagination setup
  const resultsPerPage = 10;
  const targets_data = React.useMemo(() => constituencies, [constituencies]);
  // pagination change control
  function onPageChange(p) {
    setPage(p);
    console.log("page" + p);
    setData(
      targets_data.slice((p - 1) * resultsPerPage, page * resultsPerPage)
    );
    console.log(data.length);
  }
  function closeModal() {
    setIsOpen(false);
    setIsShow(false);
  }
  const getConstituencies = async () => {
    const url = BASE_URL + "/constituencies";
    setLoading(true);
    const res = await makeRequest(url);
    console.log(res);
    setLoading(false);
    if (res.status === 200) {
      const constituencies = res.data.data;
      setTotalResults(constituencies.length);

      setConstituencies(constituencies);
      //set 1st 10 records for initial render
      setData(
        constituencies.slice((page - 1) * resultsPerPage, page * resultsPerPage)
      );
      //notifications
      notify("Success", "Constituencies fetched", "success");
    } else if (res.status !== 200) {
      const err = res.response;
      console.error(err);
      //notifications
      notify("Error", "Something went Wrong", "danger");
    }
  };

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    //get constituencies
    //setData(constituencies.slice((page - 1) * resultsPerPage, page * resultsPerPage));
    getConstituencies();
  }, []);

  return (
    <>
      <PageTitle>Constituencies</PageTitle>
      <CTA description="6 Constituencies in Wajir County."></CTA>

      <div className="flex justify-start flex-1 my-10"></div>
      <div className="flex justify-start flex-1">
        {loading && (
          <img src={BarLoader} className="w-20 h-12" alt="refreshing.." />
        )}
      </div>

      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Code</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Registered Voters</TableCell>
              <TableCell>Aspirant A</TableCell>
              <TableCell>Aspirant B</TableCell>
              <TableCell>Spoiled Votes</TableCell>
              <TableCell>Total Votes</TableCell>
              <TableCell>Action</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data &&
              data.map((constituency, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Badge type="success" className="py-1 px-4">
                      {constituency.const_code}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{constituency.const_name}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {constituency.registered_voters}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{constituency.aspirant_A}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{constituency.aspirant_B}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {constituency.spoiled_votes}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{constituency.total_votes}</span>
                  </TableCell>

                  <TableCell>
                    <Link
                      to={
                        "/app/wards?criteria=by-const&const_code=" +
                        constituency.const_code +
                        "&const_name=" +
                        constituency.const_name
                      }
                    >
                      <Button size="small" className="mr-1">
                        Wards
                      </Button>
                    </Link>
                    <Link
                      to={
                        "/app/registration-centres?criteria=by-const&const_code=" +
                        constituency.const_code +
                        "&const_name=" +
                        constituency.const_name
                      }
                    >
                      <Button size="small" className="mr-1">
                        Reg.Centres
                      </Button>
                    </Link>
                    <Link
                      to={
                        "/app/polling-stations?criteria=by-const&const_code=" +
                        constituency.const_code +
                        "&const_name=" +
                        constituency.const_name
                      }
                    >
                      <Button size="small" className="mr-1">
                        P.Sations
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
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

export default Constituencies;
