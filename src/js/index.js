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
  type: "bar",
  data: {
    labels: [],
    datasets: [
      {
        label: "Amount of views a day",
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
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
  const timestamps = store.getState().data.map((obj) => obj.timestamp);
  const amountViews = store.getState().data.map((obj) => obj.views);
  myChart.data.labels.push(...timestamps);
  myChart.data.datasets[0].data.push(...amountViews);
  myChart.update();
};

render();
store.subscribe(render);
