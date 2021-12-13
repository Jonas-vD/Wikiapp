import "../css/style.scss";
import Form from "./components/Form";
import InfoCard from "./components/InfoCard";
import Chart from "chart.js/auto";

import store from "./Data";

const bodyRef = document.querySelector("body");
const headerRef = document.querySelector("header");
const chartRef = document.getElementById("myChart");
const infoRef = document.querySelector(".info");

Form(headerRef);
InfoCard(infoRef);

new Chart(chartRef, {
  type: "bar",
  data: {
    labels: ["pink"],
    datasets: [
      {
        label: "# of Votes",
        data: [11, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
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
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
