import store from "../Data";
import { getData } from "../Data/reducer";
import "./form.scss";

class Form {
  constructor(holder) {
    this.holder = holder;
    this.init();
    this.searchValue;
    this.selectViews;
    this.startDate;
    this.endDate;
    this.form;
    this.buttonRef;
    this.styling();
    this.events();
    this.render();
    store.subscribe(this.render.bind(this));
  }
  init() {
    this.holder.insertAdjacentHTML(
      "beforeend",
      `
    <form class="form" action="">
    <div class="field is-grouped">
      <div class="control is-expanded">
      <input class="input is-medium search" type="text" placeholder="Search a wikipedia page">
      </div>
      <div class="control">
        <div class="select is-medium views">
          <select>
            <option value="Daily" selected>Daily</option>
            <option value="Monthly">Monthly</option>
          </select>
      </div>
      </div>
      </div>
      <div class="field is-grouped">
      <div class="field is-horizontal">
      <div class="field-label is-normal">
      <label class="label">From</label>
      </div>
      <div class="field-body">
      <div class="field is-narrow">
      <div class="control">
      <input class="input is-medium is-fullwidth startdate" type="date" />
      </div>
      </div>
      </div>
      </div>     
      <div class="field is-horizontal">
      <div class="field-label is-normal">
      <label class="label">Until</label>
      </div>
      <div class="field-body">
      <div class="field is-narrow">
      <div class="control">
      <input class="input is-medium enddate" type="date" />
      </div>
      </div>
      </div>
      </div>
      <div class="control is-expanded">
      <button type="submit" class="button is-primary is-medium is-fullwidth">Submit</button>
      </div>
      </div>
      
      
    </form>
      `
    );

    this.form = this.holder.querySelector(".form");
    this.input = this.holder.querySelector(".input");
    this.buttonRef = this.form.querySelector(".button.is-primary");
    this.selectViews = this.form.querySelector(".views");
    this.searchValue = this.form.querySelector(".search");
    this.startDate = this.form.querySelector(".startdate");
    this.endDate = this.form.querySelector(".enddate");
  }
  render() {
    const { data, countries, months, loading, error } = store.getState();

    if (loading) {
      this.buttonRef.classList.add("is-loading");
    } else {
      this.buttonRef.classList.remove("is-loading");
    }
    const today =
      new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      new Date().getDate();
    this.startDate.setAttribute("max", today);
    this.endDate.setAttribute("max", today);
  }
  events() {
    this.form.onsubmit = (e) => {
      e.preventDefault();
      const searchViews = this.selectViews
        .querySelector("select")
        .value.toLowerCase();
      const searchValue = this.searchValue.value
        .split(" ")
        .map(
          (value) =>
            value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
        )
        .join("_");
      console.log(searchValue);
      const startDate = this.startDate.value.replaceAll("-", "");
      const endDate = this.endDate.value.replaceAll("-", "");
      store.dispatch(
        getData({
          page: searchValue,
          view: searchViews,
          start: startDate,
          end: endDate,
        })
      );
      console.log(searchViews, searchValue, startDate, endDate);
      this.form.reset();
    };
  }
  styling() {
    const formStyles = {
      margin: 0 + " auto",
    };
    Object.assign(this.form.style, formStyles);
  }
}

export default (holder) => new Form(holder);
