import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import InfoCard from "../components/Cards/InfoCard";
import TargetCard from "../components/Cards/TargetCard";
import CTA from "../components/CTA";
import { Doughnut, Line } from "react-chartjs-2";
import ChartLegend from "../components/Chart/ChartLegend";
import GridCard from "../components/Chart/GridCard";
import PageTitle from "../components/Typography/PageTitle";
import SectionTitle from "../components/Typography/SectionTitle";
import RoundIcon from "../components/RoundIcon";
import response from "../utils/demo/tableData";

import { male, female, ec2, eks, db, service, container } from "../assets/img";
import { Card, CardBody, Button, Badge, Pagination } from "@windmill/react-ui";

import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from "../utils/demo/chartsData";

function Scenarios() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [avators, setAvators] = useState([male, female]);

  const history = useHistory();

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
      <PageTitle>Scenarios </PageTitle>
      <CTA
        description="Scenarios let you link attacks together, recreating real-world outages
          and helping you validate how your system responds to common failures."
      >
        <Button className="text-white rounded font-sm">
          New Scenario &nbsp;<i className="fas fa-plus"></i>
        </Button>
        <Button
          className="text-white rounded font-sm"
          onClick={() => history.push("/app/status-checks")}
        >
          Status Checks <i className="fas fa-thermometer-quarter"></i>
        </Button>
      </CTA>

      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-8 md:grid-cols-4 xl:grid-cols-4">
        <Card className="cursor-pointer">
          <CardBody className="flex items-center justify-center">
            <div className="">
              <p className="mb-4 text-sm font-medium text-gray-700 dark:text-gray-200">
                Test TLS/SSL certificate expiration
              </p>
              <p className="mb-4 text-sm font-medium text-green-400">3 steps</p>

              <p className="text-xs mt-4 text-gray-600 dark:text-gray-400">
                Keeping ahead of TLS/SSL certificate expiration dates is
                critical. This Scenario
              </p>
              <p className="text-sm mt-4 font-semibold text-gray-600 dark:text-gray-400">
                <i className="fas fa-lock"></i> &nbsp; Time Travel
              </p>
              <Button
                layout="outline"
                className=" rounded w-full mt-10 font-sm"
              >
                View Details
              </Button>
            </div>
          </CardBody>
        </Card>
        <Card className="cursor-pointer">
          <CardBody className="flex items-center justify-center">
            <div className="">
              <p className="mb-4 text-sm font-medium text-gray-700 dark:text-gray-200">
                Validate Auto-Scaling with Status Checks
              </p>
              <p className="mb-4 text-sm font-medium text-green-400">6 steps</p>

              <p className="text-xs mt-4 text-gray-600 dark:text-gray-400">
                Confidently adopt cloud auto-scaling services. First, use Status
                Checks to...
              </p>
              <p className="text-sm mt-4 font-semibold text-gray-600 dark:text-gray-400">
                <i className="fas fa-lock"></i> &nbsp; Status Check + CPU
              </p>
              <Button layout="outline" className=" rounded w-full font-sm mt-5">
                View Details
              </Button>
            </div>
          </CardBody>
        </Card>
        <Card className="cursor-pointer">
          <CardBody className="flex items-center justify-center">
            <div className="">
              <p className="mb-4 text-sm font-medium text-gray-700 dark:text-gray-200">
                Kubernetes - Validate Container Resilience Mechanism
              </p>
              <p className="mb-4 text-sm font-medium text-green-400">6 steps</p>

              <p className="text-xs mt-4 text-gray-600 dark:text-gray-400">
                The Linux operating system has an Out of Memory Manager
                (sometimes referred...
              </p>
              <p className="text-sm mt-4 font-semibold text-gray-600 dark:text-gray-400">
                <i className="fas fa-memory"></i> &nbsp; Memory
              </p>
              <Button layout="outline" className=" rounded w-full font-sm mt-5">
                View Details
              </Button>
            </div>
          </CardBody>
        </Card>
        <Card className="cursor-pointer">
          <CardBody className="flex items-center justify-center">
            <div className="">
              <p className="mb-4 text-sm font-medium text-gray-700 dark:text-gray-200">
                DNS Outage with a Continuous Status Check
              </p>
              <p className="mb-4 text-sm font-medium text-green-400">3 steps</p>

              <p className="text-xs mt-4 text-gray-600 dark:text-gray-400">
                Who is your primary DNS provider? Do you have a secondary to
                fall back on?..
              </p>
              <p className="text-sm mt-4 font-semibold text-gray-600 dark:text-gray-400">
                <i className="fas fa-memory"></i> &nbsp; Status Check + DNS
              </p>
              <Button layout="outline" className=" rounded w-full font-sm mt-5">
                View Details
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="grid gap-6 mb-8 md:grid-cols-4 xl:grid-cols-4">
        <Card className="cursor-pointer">
          <CardBody className="flex items-center justify-center">
            <div className="">
              <p className="mb-4 text-sm font-medium text-gray-700 dark:text-gray-200">
                Service Availability - Shutdown Attack
              </p>
              <p className="mb-4 text-sm font-medium text-green-400">1 steps</p>

              <p className="text-xs mt-4 text-gray-600 dark:text-gray-400">
                <i className="fas fa-lock"></i> &nbsp; Shutdown attack is a
                technique that makes Gremlin force shutdown the host
              </p>
              <p className="text-sm mt-4 font-semibold text-gray-600 dark:text-gray-400">
                <i className="fas fa-power-off"></i> &nbsp; Shutdown
              </p>

              <Button layout="outline" className=" rounded w-full font-sm mt-5">
                View Details
              </Button>
            </div>
          </CardBody>
        </Card>
        <Card className="cursor-pointer">
          <CardBody className="flex items-center justify-center">
            <div className="">
              <p className="mb-4 text-sm font-medium text-gray-700 dark:text-gray-200">
                Unreliable Network
              </p>
              <p className="mb-4 text-sm font-medium text-green-400">6 steps</p>

              <p className="text-xs mt-4 text-gray-600 dark:text-gray-400">
                Migrating to microservices relies heavily on frequent and
                responsive API calls. Are
              </p>
              <p className="text-sm mt-4 font-semibold text-gray-600 dark:text-gray-400">
                <i className="fas fa-tachometer-alt"></i> &nbsp; Latency
              </p>
              <Button layout="outline" className=" rounded w-full font-sm mt-5">
                View Details
              </Button>
            </div>
          </CardBody>
        </Card>
        <Card className="cursor-pointer">
          <CardBody className="flex items-center justify-center">
            <div className="">
              <p className="mb-4 text-sm font-medium text-gray-700 dark:text-gray-200">
                Testing Kubernetes Storage Volume Limits
              </p>
              <p className="mb-4 text-sm font-medium text-green-400">6 steps</p>

              <p className="text-xs mt-4 text-gray-600 dark:text-gray-400">
                We want to ensure that the amount of storage space a Pod uses
                never exceeds...
              </p>
              <p className="text-sm mt-4 font-semibold text-gray-600 dark:text-gray-400">
                <i className="fas fa-hdd"></i> &nbsp; Disk
              </p>
              <Button layout="outline" className=" rounded w-full font-sm mt-5">
                View Details
              </Button>
            </div>
          </CardBody>
        </Card>
        <Card className="cursor-pointer">
          <CardBody className="flex items-center justify-center">
            <div className="">
              <p className="mb-4 text-sm font-medium text-gray-700 dark:text-gray-200">
                Kubernetes - Availability - Blackhole a Kubernetes node
              </p>
              <p className="mb-4 text-sm font-medium text-green-400">3 steps</p>

              <p className="text-xs mt-4 text-gray-600 dark:text-gray-400">
                Blackhole is a technique you can use to more safely make nodes
                and pods..
              </p>
              <p className="text-sm mt-4 font-semibold text-gray-600 dark:text-gray-400">
                <i className="fas fa-hdd"></i> &nbsp; Disk
              </p>
              <Button layout="outline" className=" rounded w-full font-sm mt-5">
                View Details
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="grid gap-6 mb-8 md:grid-cols-4 xl:grid-cols-4">
        <Card className="cursor-pointer">
          <CardBody className="flex items-center justify-center">
            <div className="">
              <p className="mb-4 text-sm font-medium text-gray-700 dark:text-gray-200">
                Prepare for Insufficient Memory Issues with MySQL
              </p>
              <p className="mb-4 text-sm font-medium text-green-400">3 steps</p>

              <p className="text-xs mt-4 text-gray-600 dark:text-gray-400">
                One of the most common causes of crashes in MySQL is that it
                stopped or
              </p>
              <p className="text-sm mt-4 font-semibold text-gray-600 dark:text-gray-400">
                <i className="fas fa-memory"></i> &nbsp; Memory
              </p>
              <Button layout="outline" className=" rounded w-full font-sm mt-5">
                View Details
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default Scenarios;
