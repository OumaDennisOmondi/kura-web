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
import Ward from "./Ward";
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

function Wards(props) {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [showCaw, setShowCaw] = useState(false);
  const [caw_data, setCawData] = useState({});
  const [wards, setWards] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [denomination, setDenomination] = useState(
    "All 6 Wajir Constituencies"
  );
  const [query, setQuery] = useState("");
  // pagination setup
  const resultsPerPage = 10;
  const wards_data = React.useMemo(() => wards, [wards]);

  // pagination change control
  function onPageChange(p) {
    setPage(p);
    console.log("page" + p);
    setData(wards.slice((p - 1) * resultsPerPage, p * resultsPerPage));
    console.log(data.length);
  }
  function closeModal() {
    setShowCaw(false);
  }
  const getWards = async (denomination = false) => {
    let url = "";
    if (denomination) {
      url = BASE_URL + "/searchQ/ward/?q=" + query;
    } else {
      let criteria = new URLSearchParams(window.location.search).get(
        "criteria"
      );
      let const_code = new URLSearchParams(window.location.search).get(
        "const_code"
      );
      let const_name = new URLSearchParams(window.location.search).get(
        "const_name"
      );
      switch (criteria) {
        case "by-const":
          url = BASE_URL + "/wards-by-const/" + const_code;
          setDenomination(const_name + " Constituency");
          break;
        default:
          url = BASE_URL + "/wards";
      }
    }

    setLoading(true);
    const res = await makeRequest(url);
    console.log(res);
    setLoading(false);
    if (res.status === 200) {
      const wards = res.data.data;
      setTotalResults(wards.length);

      setWards(wards);
      //set 1st 10 records for initial render
      setData(wards.slice((page - 1) * resultsPerPage, page * resultsPerPage));
      //notifications
      notify("Success", "Wards fetched", "success");
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
    //get wards

    //setData(wards.slice((page - 1) * resultsPerPage, page * resultsPerPage));
    getWards();
  }, []);

  return (
    <>
      {showCaw ? (
        <Ward caw_data={caw_data} close={closeModal} />
      ) : (
        <>
          <PageTitle>Wards</PageTitle>
          <CTA description={"Wards in " + denomination}></CTA>

          <div className="flex justify-start flex-1 my-10">
            <SectionTitle>
              <SectionTitle>
                Currently Showing Wards in {denomination}
              </SectionTitle>
            </SectionTitle>
          </div>
          <div className="flex justify-start flex-1 lg:mr-32 mb-5">
            <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
              <div className="absolute inset-y-0 flex items-center pl-2">
                <SearchIcon className="w-4 h-4" aria-hidden="true" />
              </div>
              <Input
                className="pl-8 text-gray-700"
                placeholder="Search for Wards by Code or Name"
                aria-label="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Button
              className=" bg-blue-500"
              onClick={(e) => {
                getWards(true);
                console.log(query);
              }}
            >
              Search
            </Button>
          </div>
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
                  <TableCell>Spoiled Votes</TableCell>
                  <TableCell>Total Votes</TableCell>
                  <TableCell>Action</TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                {data &&
                  data.map((ward, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Badge type="success" className="py-1 px-4">
                          {ward.caw_code}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{ward.caw_name}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {ward.registered_voters}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{ward.spoiled_votes}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{ward.total_votes}</span>
                      </TableCell>

                      <TableCell>
                        <Button
                          size="small"
                          className="mr-1"
                          onClick={() => {
                            setCawData(ward);
                            setShowCaw(true);
                          }}
                        >
                          Results
                        </Button>
                        <Link
                          to={
                            "/app/registration-centres?criteria=by-caw&caw_code=" +
                            ward.caw_code +
                            "&caw_name=" +
                            ward.caw_name +
                            "&const_code=" +
                            ward.const_code +
                            "&const_name=" +
                            ward.const_name
                          }
                        >
                          <Button size="small" className="mr-1">
                            Reg.Centres
                          </Button>
                        </Link>
                        <Link
                          to={
                            "/app/polling-stations?criteria=by-caw&caw_code=" +
                            ward.caw_code +
                            "&caw_name=" +
                            ward.caw_name +
                            "&const_code=" +
                            ward.const_code +
                            "&const_name=" +
                            ward.const_name
                          }
                        >
                          <Button size="small" className="mr-1">
                            P.Stations
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
      )}
    </>
  );
}

export default Wards;
