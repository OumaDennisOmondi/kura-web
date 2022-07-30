import React, { useState, useEffect } from "react";
import { notify, makeRequest } from "../helpers";
import { BASE_URL, AUTH_URL } from "../urls";
import BarLoader from "../assets/img/bar-loader.svg";
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
  const [stats, setStats] = useState(false);
  const [loading, setLoading] = useState(false);
  // pagination setup

  // paginatio
  const getStats = async () => {
    const url = BASE_URL + "/stats";
    setLoading(true);
    const res = await makeRequest(url);
    console.log(res);
    setLoading(false);
    if (res.status === 200) {
      const stats = res.data.data;

      setStats(stats);
      console.log("stats", stats);

      //notifications
      notify("Success", "Polls Refreshed", "success");
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
    getStats();
  }, []);

  return (
    <>
      <PageTitle>Dashboard </PageTitle>
      {/* <CTA /> */}

      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-16 md:grid-cols-2 xl:grid-cols-5">
        <InfoCard title="Total Constituencies" value="6">
          <RoundIcon
            icon={"fas fa-globe"}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>
        <InfoCard title="Total Wards" value="30">
          <RoundIcon
            icon={"fas fa-map"}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>
        <InfoCard title="Total Registration Centres" value="513">
          <RoundIcon
            icon={"fas fa-map-marked"}
            iconColorClass="text-blue-500 dark:text-orange-100"
            bgColorClass="bg-blue-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>
        <InfoCard title="Total Polling Stations" value="609">
          <RoundIcon
            icon={"fas fa-map-marker-alt"}
            iconColorClass="text-blue-500 dark:text-orange-100"
            bgColorClass="bg-blue-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>
        <InfoCard title="Total Registered Voters" value="207758">
          <RoundIcon
            icon={"fas fa-map-marker-alt"}
            iconColorClass="text-blue-500 dark:text-orange-100"
            bgColorClass="bg-blue-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>
      </div>
      <div className="flex justify-start flex-col flex-1">
        {loading && (
          <>
            <img src={BarLoader} className="w-24 h-16" alt="refreshing.." />
            <SectionTitle>Getting new polls....</SectionTitle>
          </>
        )}
      </div>
      <PageTitle>Poll Graphs</PageTitle>
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <ChartCard title="Aspirants">
          <Doughnut
            {...doughnutOptions([
              stats.aspirant_A,
              stats.aspirant_B,
              stats.aspirant_B,
            ])}
          />
          <ChartLegend legends={doughnutLegends} />
        </ChartCard>

        <ChartCard title="Stats">
          <PageTitle>Current Transmission and Tally Stats</PageTitle>
          <SectionTitle>Total Votes Cast :{stats.totals_votes}</SectionTitle>
          <SectionTitle>
            Total Spoiled Votes : {stats.spoiled_votes}
          </SectionTitle>
          <SectionTitle>
            Tallying {stats.total_transmision} of 609 Polling Stations
          </SectionTitle>
          <SectionTitle>
            Tansmission Percenatge :{" "}
            {((stats.total_transmision / 609) * 100).toFixed(2)}%
          </SectionTitle>
        </ChartCard>
      </div>

      <PageTitle>Aspirants</PageTitle>
      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Aspirant Names</TableCell>
              <TableCell>Political Party</TableCell>
              <TableCell>Total Votes</TableCell>
              <TableCell>% Votes</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Adan Hassan</TableCell>
              <TableCell>Jubilee</TableCell>
              <TableCell>{stats.aspirant_A}</TableCell>
              <TableCell>
                {((stats.aspirant_A / stats.totals_votes) * 100).toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Ahmed Abdullahi</TableCell>
              <TableCell>ODM</TableCell>
              <TableCell>{stats.aspirant_B}</TableCell>
              <TableCell>
                {((stats.aspirant_B / stats.totals_votes) * 100).toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Ahmed Ali Mukhtar</TableCell>
              <TableCell>UDA</TableCell>
              <TableCell>{stats.aspirant_B}</TableCell>
              <TableCell>
                {((stats.aspirant_B / stats.totals_votes) * 100).toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Siyad Abdullahi</TableCell>
              <TableCell>Wiper</TableCell>
              <TableCell>{stats.aspirant_B}</TableCell>
              <TableCell>
                {((stats.aspirant_A / stats.totals_votes) * 100).toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Dashboard;
