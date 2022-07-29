import axios from "axios";
import { auth } from "../helpers";

export const makeRequest = async (url) => {
  const token = auth.getToken().access_token || "";
  let response = null;
  const headers = {
    Authorization: "Bearer " + token,
  }
  ;

  try {
    response = await axios.get(url, { headers });
  } catch (error) {
    response = error;
    console.log(error);
    //if (response.response.status === 401) {
    //  auth.logout(() => {
    //    window.location.replace("/login");
    //  });
    //}
  }

  return response;
  //   axios
  //     .get(url, { headers })
  //     .then((res) => {
  //       response = res;
  //     })
  //     .catch((err) => {
  //       response = err;
  //     })
  //     .finally(() => {
  //       return response;
  //     });

  //  axios
  //    .get(TARGETS_URL + "/get_targets", {
  //      headers: {
  //        "x-api-key": process.env.REACT_APP_API_KEY,
  //      },
  //    })
  //    .then((res) => {
  //      setTotalResults(res.data.length);
  //      setData(
  //        res.data.slice((page - 1) * resultsPerPage, page * resultsPerPage)
  //      );
  //      setTargets(res.data);
  //      console.log(res);
  //    })
  //    .catch((err) => {
  //      console.log(err);
  //    })
  //    .finally(() => {});
};
