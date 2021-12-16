import store from "../Data";
import Chart from "chart.js/auto";

class ChartCard {
  constructor(holder) {
    this.holder = holder;
    this.canvasRef = this.init();
    this.render();
    store.subscribe(this.render.bind(this));
  }
  init() {
    this.holder.insertAdjacentHTML(
      "beforeend",
      `<canvas id="myChart"></canvas>`
    );
    return this.holder.querySelector("#myChart").getContext("2d");
  }
  events() {}
  render() {
    console.log(myChart.data.datasets);
    console.log(store.getState().data);
  }
}

export default (holder) => new ChartCard(holder);
