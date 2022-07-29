import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { notify, makeRequest } from "../helpers";
import { AWS_CONFIG } from "../urls";
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
import AddConfigModal from "../components/AwsConfigs/AddConfigModal";
import ShowConfigModal from "../components/AwsConfigs/ShowConfigModal";
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

function AwsConfigs() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [config, setConfig] = useState({});
  const [configs, setConfigs] = useState([]);
  const [regions, setRegions] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);

  // pagination setup
  const resultsPerPage = 10;
  const configs_data = React.useMemo(() => configs, [configs]);
  // pagination change control
  function onPageChange(p) {
    setPage(p);
    console.log("page" + p);
    setData(
      configs_data.slice((p - 1) * resultsPerPage, page * resultsPerPage)
    );
    console.log(data.length);
  }
  function closeModal() {
    setIsOpen(false);
    setIsShow(false);
  }

  const getRegions = async () => {
    const url = AWS_CONFIG + "/get_regions";
    setLoading(true);
    const res = await makeRequest(url);
    console.log(res);
    setLoading(false);
    if (res.status === 200) {
      const regions = res.data.data;
      console.log("regions", regions);
      setRegions(regions);
    } else if (res.status !== 200) {
      const err = res.response;
      console.error(err);
      //notifications
      notify("Error", "Error while fetching regions", "danger");
    }
  };
  const getConfigs = async () => {
    const url = AWS_CONFIG + "/get_aws_configs";
    setLoading(true);
    const res = await makeRequest(url);
    console.log(res);
    setLoading(false);
    if (res.status === 200) {
      const configs = res.data.data;
      setTotalResults(configs.length);

      setConfigs(configs);
      //set 1st 10 records for initial render
      setData(
        configs.slice((page - 1) * resultsPerPage, page * resultsPerPage)
      );
      //notifications
      notify("Success", "Aws Configs fetched", "success");
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
    //get configs
    //setData(configs.slice((page - 1) * resultsPerPage, page * resultsPerPage));
    getConfigs();
    getRegions();
  }, []);

  return (
    <>
      <AddConfigModal
        isOpen={isOpen}
        onClose={closeModal}
        refresh={getConfigs}
        regions={regions}
      />
      {config && (
        <ShowConfigModal
          isOpen={isShow}
          onClose={closeModal}
          config={config}
          refresh={getConfigs}
          regions={regions}
        />
      )}
      <PageTitle>Aws Configuaration</PageTitle>
      <CTA description="Vurugu provides you with an option to create AWS Configs for the User.">
        <Button
          onClick={() => {
            setIsOpen(true);
          }}
          className="text-white  rounded font-sm"
        >
          New Config &nbsp;<i className="fas fa-plus"></i>
        </Button>
      </CTA>

      <div className="flex justify-start flex-1 my-10">
        <div className="relative w-full max-w-xl focus-within:text-green-600">
          <div className="absolute inset-y-0 flex items-center pl-2">
            <SearchIcon className="w-4 h-4" aria-hidden="true" />
          </div>
          <Input
            className="pl-8 text-gray-700"
            placeholder="Search for Configs"
            aria-label="Search"
          />
        </div>
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
              <TableCell>Region</TableCell>
              <TableCell>Access Key</TableCell>
              <TableCell>Secret Key</TableCell>
              <TableCell>Session Token</TableCell>
              <TableCell>Action</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data &&
              data.map((config, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <span className="text-sm">
                      {" "}
                      {config.region && config.region.name}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{"************"}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">************</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{"************"}</span>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      onClick={() => {
                        console.log(config);
                        setConfig(config);
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

export default AwsConfigs;
