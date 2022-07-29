import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { notify, makeRequest } from "../helpers";
import { DENOMINATIOS_URL, AUTH_URL } from "../urls";
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
//import AddConstituencyModal from "../components/Wards/AddConstituencyModal";
//import ShowConstituencyModal from "../components/Wards/ShowConstituencyModal";
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

function Wards() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [ward, setWard] = useState({});
  const [wards, setConstituencies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);

  // pagination setup
  const resultsPerPage = 10;
  const targets_data = React.useMemo(() => wards, [wards]);
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
  const getWards = async () => {
    const url = DENOMINATIOS_URL + "/ward";
    setLoading(true);
    const res = await makeRequest(url);
    console.log(res);
    setLoading(false);
    if (res.status === 200) {
      const wards = res.data.data;
      setTotalResults(wards.length);

      setConstituencies(wards);
      //set 1st 10 records for initial render
      setData(
        wards.slice((page - 1) * resultsPerPage, page * resultsPerPage)
      );
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
      {/*<AddConstituencyModal
        isOpen={isOpen}
        onClose={closeModal}
        refresh={getWards}
      />
      {ward && (
        <ShowConstituencyModal
          isOpen={isShow}
          onClose={closeModal}
          ward={ward}
          refresh={getWards}
        />
      )}*/}
      <PageTitle>Wards</PageTitle>
      <CTA description="All Wards in Wajir County.">
        <Button
          onClick={() => {
            setIsOpen(true);
          }}
          className="text-white  rounded font-sm"
        >
          New Ward &nbsp;<i className="fas fa-plus"></i>
        </Button>
      </CTA>

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
              <TableCell>Ward Code</TableCell>
              <TableCell>Ward Name</TableCell>
              <TableCell>Constituency</TableCell>
              <TableCell>Action</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data &&
              data.map((ward, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Badge type="success" className="py-1 px-4">
                      {ward.ward_code}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{ward.ward_name}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{ward.constituency_name}</span>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      onClick={() => {
                        console.log(ward);
                        setWard(ward);
                        setIsShow(true);
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

export default Wards;
