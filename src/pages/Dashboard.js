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
      <div className="grid gap-6 mb-16 md:grid-cols-2 xl:grid-cols-5">
        <InfoCard title="Total Votes Cast" value={stats.totals_votes}>
          <RoundIcon
            icon={"fas fa-vote-yea"}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>
        <InfoCard title="Total Spoiled Votes" value={stats.spoiled_votes}>
          <RoundIcon
            icon={"fas fa-ban"}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>
        <InfoCard
          title="Transmiited P.Stations"
          value={stats.total_transmision}
        >
          <RoundIcon
            icon={"fas fa-map-marked"}
            iconColorClass="text-blue-500 dark:text-orange-100"
            bgColorClass="bg-blue-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard
          title="Tansmission Percenatge"
          value={((stats.total_transmision / 609) * 100).toFixed(2) + "%"}
        >
          <RoundIcon
            icon={"fas fa-percent"}
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
      <div className="grid gap-6 mb-8 md:grid-cols-1">
        <ChartCard title="Aspirants">
          <Doughnut
            {...doughnutOptions([
              stats.ahmed_ali_muktar,
              stats.ahmed_abdullahi,
              stats.abdullahi_ibrahim_ali,
              stats.osman_warfa,
              stats.siyat_abdullahi,
              stats.ugas_sheikh_mohamed,
              stats.mohamed_ibrahim_elmi,
              stats.hassan_mohamed_adan,
              stats.mohamed_abdi_mohamud,
            ])}
          />
          <ChartLegend legends={doughnutLegends} />
        </ChartCard>

        {/*<ChartCard title="Stats">
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
        </ChartCard>*/}
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
              <TableCell>H.E Ahmed Ali Muktar </TableCell>
              <TableCell>UDA</TableCell>
              <TableCell>{stats.ahmed_ali_muktar}</TableCell>
              <TableCell>
                {((stats.ahmed_ali_muktar / stats.totals_votes) * 100).toFixed(
                  2
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Mr Ahmed Abdullahi </TableCell>
              <TableCell>ODM</TableCell>
              <TableCell>{stats.ahmed_abdullahi}</TableCell>
              <TableCell>
                {((stats.ahmed_abdullahi / stats.totals_votes) * 100).toFixed(
                  2
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Dr Abdullahi Ibrahim Ali</TableCell>
              <TableCell>UDM</TableCell>
              <TableCell>{stats.abdullahi_ibrahim_ali}</TableCell>
              <TableCell>
                {(
                  (stats.abdullahi_ibrahim_ali / stats.totals_votes) *
                  100
                ).toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Prof Osman Warfa </TableCell>
              <TableCell>NARK</TableCell>
              <TableCell>{stats.osman_warfa}</TableCell>
              <TableCell>
                {((stats.osman_warfa / stats.totals_votes) * 100).toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Dr Siyat Abdullahi </TableCell>
              <TableCell>WIPER</TableCell>
              <TableCell>{stats.siyat_abdullahi}</TableCell>
              <TableCell>
                {((stats.siyat_abdullahi / stats.totals_votes) * 100).toFixed(
                  2
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Mr Ugas Sheikh Mohamed</TableCell>
              <TableCell>ANC</TableCell>
              <TableCell>{stats.ugas_sheikh_mohamed}</TableCell>
              <TableCell>
                {(
                  (stats.ugas_sheikh_mohamed / stats.totals_votes) *
                  100
                ).toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Mr Mohamed Ibrahim Elmi </TableCell>
              <TableCell>INDEPENDENT</TableCell>
              <TableCell>{stats.mohamed_ibrahim_elmi}</TableCell>
              <TableCell>
                {(
                  (stats.mohamed_ibrahim_elmi / stats.totals_votes) *
                  100
                ).toFixed(2)}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Dr Hassan Mohamed Adan</TableCell>
              <TableCell>JUBILEE</TableCell>
              <TableCell>{stats.hassan_mohamed_adan}</TableCell>
              <TableCell>
                {(
                  (stats.hassan_mohamed_adan / stats.totals_votes) *
                  100
                ).toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Mr Mohamed Abdi Mohamud </TableCell>
              <TableCell>INDEPENDENT</TableCell>
              <TableCell>{stats.mohamed_abdi_mohamud}</TableCell>
              <TableCell>
                {(
                  (stats.mohamed_abdi_mohamud / stats.totals_votes) *
                  100
                ).toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Dashboard;
