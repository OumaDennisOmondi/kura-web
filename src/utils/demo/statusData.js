export default [
  {
    name: "Status Check for jiandikishe service",
    status_code: "200",
    timeout: "600",
    type: "continous",
  },
  {
    name: "Status Check for subreg DB service",
    status_code: "200",
    timeout: "600",
    type: "once",
  },
  {
    name: "Status check for EC2 instance ip-172.168.1.255",
    status_code: "200",
    timeout: "600",
    type: "continous",
  },
  {
    name: "Status Check for blaze service",
    status_code: "200",
    timeout: "600",
    type: "continous",
  },
  {
    name: "Status Check for fafanuka service",
    status_code: "200",
    timeout: "600",
    type: "continous",
  },
];
