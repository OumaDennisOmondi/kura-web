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

function RegistrationCentre(props) {
  const [loading, setLoading] = useState(false);
  // pagination setup

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    const data = props.data;
    console.log(props);
  }, []);

  return (
    <>
      <PageTitle>
        {props.reg_data.reg_centre_name} Registration Centre{" "}
      </PageTitle>
      {/* <CTA /> */}

      {/* <!-- Cards --> */}

      <div className="grid gap-6 mb-16 md:grid-cols-2 xl:grid-cols-6">
        <Button
          size="small"
          className="mr-1"
          onClick={() => {
            props.close();
          }}
        >
          Back
        </Button>
      </div>

      <div className="grid gap-6 mb-16 md:grid-cols-2 xl:grid-cols-5">
        <InfoCard
          title="Total Registered Voters"
          value={props.reg_data.registered_voters}
        >
          <RoundIcon
            icon={"fas fa-map-marker-alt"}
            iconColorClass="text-blue-500 dark:text-orange-100"
            bgColorClass="bg-blue-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>
        <InfoCard title="Total Votes Cast" value={props.reg_data.total_votes}>
          <RoundIcon
            icon={"fas fa-vote-yea"}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>
        <InfoCard
          title="Total Spoiled Votes"
          value={props.reg_data.spoiled_votes}
        >
          <RoundIcon
            icon={"fas fa-ban"}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
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
              props.reg_data.ahmed_ali_muktar,
              props.reg_data.ahmed_abdullahi,
              props.reg_data.abdullahi_ibrahim_ali,
              props.reg_data.osman_warfa,
              props.reg_data.siyat_abdullahi,
              props.reg_data.ugas_sheikh_mohamed,
              props.reg_data.mohamed_ibrahim_elmi,
              props.reg_data.hassan_mohamed_adan,
              props.reg_data.mohamed_abdi_mohamud,
            ])}
          />
          <ChartLegend legends={doughnutLegends} />
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
              <TableCell>H.E Ahmed Ali Muktar </TableCell>
              <TableCell>UDA</TableCell>
              <TableCell>{props.reg_data.ahmed_ali_muktar}</TableCell>
              <TableCell>
                {(
                  (props.reg_data.ahmed_ali_muktar /
                    props.reg_data.total_votes) *
                  100
                ).toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Mr Ahmed Abdullahi </TableCell>
              <TableCell>ODM</TableCell>
              <TableCell>{props.reg_data.ahmed_abdullahi}</TableCell>
              <TableCell>
                {(
                  (props.reg_data.ahmed_abdullahi /
                    props.reg_data.total_votes) *
                  100
                ).toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Dr Abdullahi Ibrahim Ali</TableCell>
              <TableCell>UDM</TableCell>
              <TableCell>{props.reg_data.abdullahi_ibrahim_ali}</TableCell>
              <TableCell>
                {(
                  (props.reg_data.abdullahi_ibrahim_ali /
                    props.reg_data.total_votes) *
                  100
                ).toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Prof Osman Warfa </TableCell>
              <TableCell>NARK</TableCell>
              <TableCell>{props.reg_data.osman_warfa}</TableCell>
              <TableCell>
                {(
                  (props.reg_data.osman_warfa / props.reg_data.total_votes) *
                  100
                ).toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Dr Siyat Abdullahi </TableCell>
              <TableCell>WIPER</TableCell>
              <TableCell>{props.reg_data.siyat_abdullahi}</TableCell>
              <TableCell>
                {(
                  (props.reg_data.siyat_abdullahi /
                    props.reg_data.total_votes) *
                  100
                ).toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Mr Ugas Sheikh Mohamed</TableCell>
              <TableCell>ANC</TableCell>
              <TableCell>{props.reg_data.ugas_sheikh_mohamed}</TableCell>
              <TableCell>
                {(
                  (props.reg_data.ugas_sheikh_mohamed /
                    props.reg_data.total_votes) *
                  100
                ).toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Mr Mohamed Ibrahim Elmi </TableCell>
              <TableCell>INDEPENDENT</TableCell>
              <TableCell>{props.reg_data.mohamed_ibrahim_elmi}</TableCell>
              <TableCell>
                {(
                  (props.reg_data.mohamed_ibrahim_elmi /
                    props.reg_data.total_votes) *
                  100
                ).toFixed(2)}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Dr Hassan Mohamed Adan</TableCell>
              <TableCell>JUBILEE</TableCell>
              <TableCell>{props.reg_data.hassan_mohamed_adan}</TableCell>
              <TableCell>
                {(
                  (props.reg_data.hassan_mohamed_adan /
                    props.reg_data.total_votes) *
                  100
                ).toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Mr Mohamed Abdi Mohamud </TableCell>
              <TableCell>INDEPENDENT</TableCell>
              <TableCell>{props.reg_data.mohamed_abdi_mohamud}</TableCell>
              <TableCell>
                {(
                  (props.reg_data.mohamed_abdi_mohamud /
                    props.reg_data.total_votes) *
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

export default RegistrationCentre;
