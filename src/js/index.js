import "../css/style.scss";
import Form from "./components/Form";
import InfoCard from "./components/InfoCard";
import Chart from "chart.js/auto";
// import ChartCard from "./components/ChartCard";

import store from "./Data";

const bodyRef = document.querySelector("body");
const headerRef = document.querySelector("header");
const infoRef = document.querySelector(".info");
const chartRef = document.querySelector("#myChart").getContext("2d");

Form(headerRef);
InfoCard(infoRef);
// ChartCard(chartRef);

let myChart = new Chart(chartRef, {
  type: "pie",
  data: {
    labels: [],
    datasets: [
      {
        label: "Amount of views a day",
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(75, 192, 192)",
          "rgba(153, 102, 255)",
          "rgba(255, 159, 64)",
        ],
        borderColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(75, 192, 192)",
          "rgba(153, 102, 255)",
          "rgba(255, 159, 64)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    legend: {
      display: false,
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

const render = () => {
  myChart.data.labels = [];
  const timestamps = store.getState().data.map((obj) => obj.timestamp);
  const amountViews = store.getState().data.map((obj) => obj.views);
  myChart.data.labels.splice(0, myChart.data.labels.length, ...timestamps);

  myChart.data.datasets[0].data.splice(
    0,
    myChart.data.datasets[0].data.length,
    ...amountViews
  );
  myChart.update();
};

render();
store.subscribe(render);
