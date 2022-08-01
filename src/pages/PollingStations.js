import React, { useState, useEffect, useMemo } from "react";
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
import PollingStation from "./PollingStation";
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

function PollingStations() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [station_data, setStationData] = useState({});
  const [showStation, setShowStation] = useState(false);
  const [polling_stations, setPolling_stations] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [denomination, setDenomination] = useState(
    "All 6 Wajir Constituencies"
  );
  const [query, setQuery] = useState("");
  // pagination setup
  const resultsPerPage = 10;
  const polling_stations_data = React.useMemo(
    () => polling_stations,
    [polling_stations]
  );
  // pagination change control
  function onPageChange(p) {
    setPage(p);
    console.log("page" + p);
    setData(
      polling_stations_data.slice((p - 1) * resultsPerPage, p * resultsPerPage)
    );
    console.log(data.length);
  }
  function closeModal() {
    setShowStation(false);
  }
  const getpolling_stations = async (denomination = false) => {
    let url = "";
    if (denomination) {
      url = BASE_URL + "/searchQ/reg_centre/?q=" + query;
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
      let caw_name = new URLSearchParams(window.location.search).get(
        "caw_name"
      );
      let caw_code = new URLSearchParams(window.location.search).get(
        "caw_code"
      );
      let reg_centre_name = new URLSearchParams(window.location.search).get(
        "reg_centre_name"
      );
      let reg_centre_code = new URLSearchParams(window.location.search).get(
        "reg_centre_code"
      );
      switch (criteria) {
        case "by-const":
          url = BASE_URL + "/polling-stations-by-const/" + const_code;
          setDenomination(const_name + " Constituency");
          break;
        case "by-caw":
          url =
            BASE_URL +
            "/polling-stations-by-ward/" +
            const_code +
            "/" +
            caw_code;
          setDenomination(caw_name + " Ward");
          break;
        case "by-centre":
          url =
            BASE_URL +
            "/polling-stations-by-centre/" +
            const_code +
            "/" +
            caw_code +
            "/" +
            reg_centre_code;
          setDenomination(reg_centre_name + " Registration Centre");
          break;
        default:
          url = BASE_URL + "/polling-stations";
      }
    }

    setLoading(true);
    const res = await makeRequest(url);
    console.log(res);
    setLoading(false);
    if (res.status === 200) {
      const polling_stations = res.data.data;
      setTotalResults(polling_stations.length);

      setPolling_stations(polling_stations);
      //set 1st 10 records for initial render
      setData(
        polling_stations.slice(
          (page - 1) * resultsPerPage,
          page * resultsPerPage
        )
      );
      //notifications
      notify("Success", "PollingStations fetched", "success");
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
    //get polling_stations
    //setData(polling_stations.slice((page - 1) * resultsPerPage, page * resultsPerPage));
    getpolling_stations();
  }, []);

  return (
    <>
      {showStation ? (
        <PollingStation station_data={station_data} close={closeModal} />
      ) : (
        <>
          <PageTitle>Polling Stations</PageTitle>
          <CTA description={"Polling Stations in " + denomination}></CTA>

          <div className="flex justify-start flex-1 my-10">
            <SectionTitle>Polling Stations in {denomination}</SectionTitle>
          </div>
          <div className="flex justify-start flex-1 lg:mr-32 mb-5">
            <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
              <div className="absolute inset-y-0 flex items-center pl-2">
                <SearchIcon className="w-4 h-4" aria-hidden="true" />
              </div>
              <Input
                className="pl-8 text-gray-700"
                placeholder="Search for Polling Stations by Code or Name"
                aria-label="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Button
              className=" bg-blue-500"
              onClick={() => getpolling_stations(true)}
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
                  data.map((polling_station, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Badge type="success" className="py-1 px-4">
                          {polling_station.polling_station_code}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {polling_station.polling_station_name}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {polling_station.registered_voters}
                        </span>
                      </TableCell>

                      <TableCell>
                        <span className="text-sm">
                          {polling_station.spoiled_votes}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {polling_station.total_votes}
                        </span>
                      </TableCell>

                      <TableCell>
                        <Button
                          size="small"
                          className="mr-1"
                          onClick={() => {
                            setStationData(polling_station);
                            setShowStation(true);
                          }}
                        >
                          Results
                        </Button>
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

export default PollingStations;
