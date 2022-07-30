export const doughnutLegends = [
  { title: "Aspirant A", color: "bg-green-600" },
  { title: "Aspirant B", color: "bg-red-600" },
  { title: "Aspirant C", color: "bg-purple-600" },
];

export const doughnutOptions = (data) => {
  let doughnutOptions = {
    data: {
      datasets: [
        {
          data: data,
          backgroundColor: ["#057a55", "#e02424", "#7e3af2"],
          label: "Dataset 1",
        },
      ],
      labels: ["Aspirant A", "Aspirant B", "Aspirant C"],
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





