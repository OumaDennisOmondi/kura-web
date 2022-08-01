import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { notify, makeRequest } from "../helpers";
import { BASE_URL, AUTH_URL } from "../urls";
import BarLoader from "../assets/img/bar-loader.svg";


import CTA from "../components/CTA";
import PageTitle from "../components/Typography/PageTitle";
import SectionTitle from "../components/Typography/SectionTitle";
import RoundIcon from "../components/RoundIcon";
import response from "../utils/demo/targetsData";
import { SearchIcon } from "../icons";
//import AddConstituencyModal from "../components/Agents/AddConstituencyModal";
//import ShowConstituencyModal from "../components/Agents/ShowConstituencyModal";
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



function Agents() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [agent, setAgent] = useState({});
  const [agents, setAgents] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  // pagination setup
  const resultsPerPage = 10;
  const agents_data = React.useMemo(() => agents, [agents]);
  // pagination change control
  function onPageChange(p) {
    setPage(p);
    console.log("page" + p);
    setData(agents.slice((p - 1) * resultsPerPage, p * resultsPerPage));
    console.log(data.length);
  }
  function closeModal() {
    setIsOpen(false);
    setIsShow(false);
  }
  const getAgents = async (search = false) => {
    const url = search
      ? BASE_URL + "/search-agent/?q=" + query
      : BASE_URL + "/all-agents/";
    setLoading(true);
    const res = await makeRequest(url);
    console.log(res);
    setLoading(false);
    if (res.status === 200) {
      const agents = res.data.data;
      setTotalResults(agents.length);

      setAgents(agents);
      console.log("agents", agents);
      //set 1st 10 records for initial render
      setData(agents.slice((page - 1) * resultsPerPage, page * resultsPerPage));
      //notifications
      notify("Success", "Agents fetched", "success");
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
    //get agents
    //setData(agents.slice((page - 1) * resultsPerPage, page * resultsPerPage));
    getAgents();
  }, []);

  return (
    <>
      <PageTitle>Agents</PageTitle>
      <CTA description="All Agents in Wajir County."></CTA>

      <div className="flex justify-start flex-1 lg:mr-32 mb-5">
        <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
          <div className="absolute inset-y-0 flex items-center pl-2">
            <SearchIcon className="w-4 h-4" aria-hidden="true" />
          </div>
          <Input
            className="pl-8 text-gray-700"
            placeholder="Search for Agents by Phone or ID Number"
            aria-label="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Button
          className=" bg-blue-500"
          onClick={(e) => {
            getAgents(true);
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
              <TableCell>Agents Names</TableCell>
              <TableCell>ID Number</TableCell>
              <TableCell>Phone Number</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data &&
              data.map((agent, i) => (
                <TableRow key={i}>
                  <TableCell>
                    {agent.user.first_name.toUpperCase() +
                      " " +
                      agent.user.last_name.toUpperCase()}
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{agent.id_number}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{agent.mobile_number}</span>
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

export default Agents;
