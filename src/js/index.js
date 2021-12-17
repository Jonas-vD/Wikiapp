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
const btnBar = document.querySelector(".bar");
const btnPie = document.querySelector(".pie");
const btnLine = document.querySelector(".line");
const btnPolar = document.querySelector(".polar");

Form(headerRef);
InfoCard(infoRef);
// ChartCard(chartRef);
const data = {
  labels: [],
  datasets: [
    {
      label: "Amount of views per day",
      data: [],
      backgroundColor: [
        "rgba(255, 99, 132)",
        "rgba(54, 162, 235)",
        "rgba(255, 206, 86)",
        "rgba(75, 192, 192)",
        "rgba(153, 102, 255)",
        "rgba(255, 159, 64)",
      ],

      hoverOffset: 4,
    },
  ],
};

const configChartBar = {
  type: "bar",
  data,
  options: {
    scales: {
      legend: {
        display: false,
      },
      y: {
        beginAtZero: true,
      },
    },
  },
};
const configChartPie = {
  type: "pie",
  data,
};
const configChartLine = {
  type: "line",
  data,
};
const configChartPolar = {
  type: "polarArea",
  data,
};
const initChartBar = () => {
  myChart = new Chart(document.querySelector("#myChart"), configChartBar);
};
const initChartPie = () => {
  myChart = new Chart(
    document.querySelector("#myChart").getContext("2d"),
    configChartPie
  );
};
const initChartLine = () => {
  myChart = new Chart(
    document.querySelector("#myChart").getContext("2d"),
    configChartLine
  );
};
const initChartPolar = () => {
  myChart = new Chart(
    document.querySelector("#myChart").getContext("2d"),
    configChartPolar
  );
};

let myChart = new Chart(
  document.querySelector("#myChart").getContext("2d"),
  configChartBar
);

const render = () => {
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

btnBar.onclick = () => {
  myChart.destroy();
  initChartBar();
  console.log("test");
  myChart.config.type = "bar";
  document
    .querySelectorAll("li")
    .forEach((li) => li.classList.remove("active"));
  btnBar.classList.toggle("active");

  myChart.update();
};

btnPie.onclick = () => {
  myChart.destroy();
  initChartPie();
  console.log("test");
  document
    .querySelectorAll("li")
    .forEach((li) => li.classList.remove("active"));
  btnPie.classList.toggle("active");
  myChart.update();
};
btnLine.onclick = (e) => {
  e.preventDefault();
  myChart.destroy();
  initChartLine();
  document
    .querySelectorAll("li")
    .forEach((li) => li.classList.remove("active"));
  btnLine.classList.toggle("active");
  myChart.update();
};
btnPolar.onclick = (e) => {
  e.preventDefault();
  myChart.destroy();
  initChartPolar();
  document
    .querySelectorAll("li")
    .forEach((li) => li.classList.remove("active"));
  btnPolar.classList.toggle("active");
  myChart.update();
};
