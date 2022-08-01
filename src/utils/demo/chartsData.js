export const doughnutLegends = [
  { title: "A. Muktar", color: "bg-yellow-400" },
  { title: "A Abdullahi", color: "bg-orange-600" },
  { title: "A.I Ali", color: "bg-pink-600" },
  { title: "O. Warfa", color: "bg-green-600" },
  { title: "S. Abdullahi", color: "bg-blue-600" },
  { title: "U. Mohamed", color: "bg-green-900" },
  { title: "Mohamed Ibrahim Elmi", color: "bg-gray-100" },
  { title: "H. Adan", color: "bg-red-500" },
  { title: "M. Mohamud", color: "bg-purple-600" },
];

export const doughnutOptions = (data) => {
  let doughnutOptions = {
    data: {
      datasets: [
        {
          data: data,
          backgroundColor: [
            "#D97721",
            "#C24122",
            "#C026D3",
            "#16A34A",
            "#2563EB",
            "#14532D",
            "#F4F4F5",
            "#EF4444",
            "#9333EA",
          ],
          label: "Dataset 1",
        },
      ],
      labels: [
        "Ahmed Ali Muktar",
        "Ahmed Abdullahi",
        "Abdullahi Ibrahim Ali",
        "Osman Warfa",
        "Siyat Abdullahi",
        "Ugas Sheikh Mohamed",
        "Mohamed Ibrahim Elmi",
        "Hassan Mohamed Adan",
        "Mohamed Abdi Mohamud",
      ],
    },
    options: {
      responsive: true,
      cutoutPercentage: 80,
    },
    legend: {
      display: false,
    },
  };
  return doughnutOptions;
};





