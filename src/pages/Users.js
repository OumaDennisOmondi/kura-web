import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { notify, makeRequest } from "../helpers";
import { USERS } from "../urls";
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
import AddUser from "../components/Users/AddUser";
import ShowUser from "../components/Users/ShowUser";
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

function Users() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);

  // pagination setup
  const resultsPerPage = 10;
  const configs_data = React.useMemo(() => users, [users]);
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

  const getRoles = async () => {
    const url = USERS + "/get_roles";
    setLoading(true);
    const res = await makeRequest(url);
    console.log(res);
    setLoading(false);
    if (res.status === 200) {
      const roles = res.data.data;
      console.log("roles", roles);
      setRoles(roles);
    } else if (res.status !== 200) {
      const err = res.response;
      console.error(err);
      //notifications
      notify("Error", "Error while fetching roles", "danger");
    }
  };
  const getUsers = async () => {
    const url = USERS + "/get_users";
    setLoading(true);
    const res = await makeRequest(url);
    console.log(res);
    setLoading(false);
    if (res.status === 200) {
      const users = res.data.data;
      setTotalResults(users.length);

      setUsers(users);
      //set 1st 10 records for initial render
      setData(users.slice((page - 1) * resultsPerPage, page * resultsPerPage));
      //notifications
      notify("Success", "Users fetched", "success");
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
    //get users
    //setData(users.slice((page - 1) * resultsPerPage, page * resultsPerPage));
    getUsers();
    getRoles();
  }, []);

  return (
    <>
      <AddUser
        isOpen={isOpen}
        onClose={closeModal}
        refresh={getUsers}
        roles={roles}
      />
      {user && (
        <ShowUser
          isOpen={isShow}
          onClose={closeModal}
          user={user}
          refresh={getUsers}
          role={user.role && user.role.id}
          roles={roles}
        />
      )}
      <PageTitle>Vurugu Users</PageTitle>
      <CTA description="Vurugu provides you with an option to create AWS Configs for the User.">
        <Button
          onClick={() => {
            setIsOpen(true);
          }}
          className="text-white  rounded font-sm"
        >
          New User &nbsp;<i className="fas fa-plus"></i>
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
              <TableCell>Username</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Date Created Key</TableCell>
              <TableCell>Action</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data &&
              data.map((user, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <span className="text-sm"> {user.username}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {user.role && user.role.name}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {new Date(user.createdTime).toDateString()}
                    </span>
                  </TableCell>

                  <TableCell>
                    <Button
                      size="small"
                      onClick={() => {
                        console.log(user);
                        setUser(user);
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

export default Users;
