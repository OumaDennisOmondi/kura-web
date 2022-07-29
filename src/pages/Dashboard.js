import React, { useState, useEffect } from "react";

import InfoCard from "../components/Cards/InfoCard";
import TargetCard from "../components/Cards/TargetCard";
import ChartCard from "../components/Chart/ChartCard";
import { Doughnut, Line } from "react-chartjs-2";
import ChartLegend from "../components/Chart/ChartLegend";
import GridCard from "../components/Chart/GridCard";
import PageTitle from "../components/Typography/PageTitle";
import SectionTitle from "../components/Typography/SectionTitle";
import RoundIcon from "../components/RoundIcon";
import response from "../utils/demo/tableData";

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
  Badge,
  Pagination,
} from "@windmill/react-ui";

import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from "../utils/demo/chartsData";

function Dashboard() {
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
      <PageTitle>Dashboard </PageTitle>
      {/* <CTA /> */}

      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-16 md:grid-cols-2 xl:grid-cols-5">
        <InfoCard title="Total Targets" value="500">
          <RoundIcon
            icon={"fas fa-server"}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>
        <InfoCard title="Total Experiments" value="1200">
          <RoundIcon
            icon={"fas fa-bolt"}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>
        <InfoCard title="Running Experiments" value="10">
          <RoundIcon
            icon={"fas fa-spinner"}
            iconColorClass="text-blue-500 dark:text-orange-100"
            bgColorClass="bg-blue-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>
        <InfoCard title="Scheduled Experiments" value="5">
          <RoundIcon
            icon={"fas fa-stopwatch"}
            iconColorClass="text-blue-500 dark:text-orange-100"
            bgColorClass="bg-blue-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Failed Experiments" value="100">
          <RoundIcon
            icon={"fas fa-exclamation-triangle"}
            iconColorClass="text-blue-500 dark:text-orange-100"
            bgColorClass="bg-blue-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>
      </div>
      <SectionTitle>
        Get started by addressing common failure modes using Vurugu's
        Recommended Scenarios.
      </SectionTitle>
      <p className="text-md mb-5 text-gray-600 dark:text-gray-400">
        Explore these components to test common failure modes.
      </p>
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-5">
        <TargetCard
          title="Services/Apps"
          // image="Male"
          value="Never Attacked"
        >
          <img className="rounded-full w-20 h-20" src={service} alt={"icon"} />
        </TargetCard>
        <TargetCard
          title="EC2 Instances/Hosts"
          // image="Male"
          value="12 Experiments"
        >
          <img className="rounded-full w-20 h-20" src={ec2} alt={"icon"} />
        </TargetCard>
        <TargetCard
          title="Container"
          // image="Male"
          value="25 Attacked"
        >
          <img
            className="rounded-full w-20 h-20"
            src={container}
            alt={"icon"}
          />
        </TargetCard>
        <TargetCard
          title="Container Ochestrations"
          // image="Male"
          value="Never Attacked"
        >
          <img className="rounded-full w-20 h-20" src={eks} alt={"icon"} />
        </TargetCard>

        <TargetCard
          title="Databases"
          // image="Male"
          value="Never Attacked"
        >
          <img className="rounded-full w-20 h-20" src={db} alt={"icon"} />
        </TargetCard>
      </div>

      {/*<PageTitle>Recent Tests</PageTitle>
      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>AWS Region/Zone</TableCell>
              <TableCell>Instance</TableCell>
              <TableCell>Server</TableCell>
              <TableCell>Status</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((chaos, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <RoundIcon
                      icon={"fab fa-aws fa-2x"}
                      iconColorClass="text-orange-500 dark:text-orange-100"
                      bgColorClass="bg-orange-100 dark:bg-orange-500"
                      className="mr-4"
                    />
                    <div>
                      <p className="font-semibold">{chaos.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {chaos.zone}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm"> {chaos.instance}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{chaos.server_url}</span>
                </TableCell>
                <TableCell>
                  <Badge type={chaos.status.status}>
                    {chaos.status.description}
                  </Badge>
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
      </TableContainer>*/}
    </>
  );
}

export default Dashboard;
