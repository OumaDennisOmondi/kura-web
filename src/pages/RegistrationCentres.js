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
import RegistrationCentre from "./RegistrationCentre";
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

function RegistrationCentres() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [showReg, setShowReg] = useState(false);
  const [reg_data, setRegData] = useState({});
  const [registration_centres, setregistration_centres] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [denomination, setDenomination] = useState(
    "All 6 Wajir Constituencies"
  );
  const [query, setQuery] = useState("");

  // pagination setup
  const resultsPerPage = 10;
  const registration_centres_data = React.useMemo(
    () => registration_centres,
    [registration_centres]
  );
  // pagination change control
  function onPageChange(p) {
    setPage(p);
    console.log("page" + p);
    setData(
      registration_centres.slice((p - 1) * resultsPerPage, p * resultsPerPage)
    );
    console.log(data.length);
  }
  function closeModal() {
    setShowReg(false);
  }
  const getregistration_centres = async (denomination = false) => {
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

      switch (criteria) {
        case "by-const":
          url = BASE_URL + "/registration-centre-by-const/" + const_code;
          setDenomination(const_name + " Constituency");
          break;
        case "by-caw":
          url =
            BASE_URL +
            "/registration-centre-by-ward/" +
            const_code +
            "/" +
            caw_code;
          setDenomination(caw_name + " Ward");
          break;
        default:
          url = BASE_URL + "/registration-centre";
      }
    }
    setLoading(true);
    const res = await makeRequest(url);
    console.log(res);
    setLoading(false);
    if (res.status === 200) {
      const registration_centres = res.data.data;
      setTotalResults(registration_centres.length);

      setregistration_centres(registration_centres);
      //set 1st 10 records for initial render
      setData(
        registration_centres.slice(
          (page - 1) * resultsPerPage,
          page * resultsPerPage
        )
      );
      //notifications
      notify("Success", "RegistrationCentres fetched", "success");
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
    //get registration_centres
    //setData(registration_centres.slice((page - 1) * resultsPerPage, page * resultsPerPage));
    getregistration_centres();
  }, []);

  return (
    <>
      {showReg ? (
        <RegistrationCentre reg_data={reg_data} close={closeModal} />
      ) : (
        <>
          <PageTitle>Registration Centres</PageTitle>
          <CTA description={"Registration Centres in " + denomination}></CTA>

          <div className="flex justify-start items-center flex-1 my-10">
            <SectionTitle>
              Currently Showing Registration Centers in {denomination}
            </SectionTitle>
          </div>
          <div className="flex justify-start flex-1 lg:mr-32 mb-5">
            <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
              <div className="absolute inset-y-0 flex items-center pl-2">
                <SearchIcon className="w-4 h-4" aria-hidden="true" />
              </div>
              <Input
                className="pl-8 text-gray-700"
                placeholder="Search for Registration Centres by Code or Name"
                aria-label="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Button
              className=" bg-blue-500"
              onClick={() => getregistration_centres(true)}
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
                  data.map((registration_centre, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Badge type="success" className="py-1 px-4">
                          {registration_centre.reg_centre_code}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {registration_centre.reg_centre_name}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {registration_centre.registered_voters}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {registration_centre.spoiled_votes}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {registration_centre.total_votes}
                        </span>
                      </TableCell>

                      <TableCell>
                        <Button
                          size="small"
                          className="mr-1"
                          onClick={() => {
                            setRegData(registration_centre);
                            setShowReg(true);
                          }}
                        >
                          Results
                        </Button>
                        <Link
                          to={
                            "/app/polling-stations?criteria=by-centre&const_code=" +
                            registration_centre.const_code +
                            "&const_name=" +
                            registration_centre.const_name +
                            "&caw_code=" +
                            registration_centre.caw_code +
                            "&caw_name=" +
                            registration_centre.caw_name +
                            "&reg_centre_name=" +
                            registration_centre.reg_centre_name +
                            "&reg_centre_code=" +
                            registration_centre.reg_centre_code
                          }
                        >
                          <Button size="small">P.Stations</Button>
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

export default RegistrationCentres;
