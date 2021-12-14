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
    this.btnCancel;
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
      <p class="help is-danger errorinput">Please enter a valid search term</p>
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
      <p class="help is-danger errorstartdate">Please enter a valid date</p> 
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
      <p class="help is-danger errorenddate">Please enter a valid date</p>
      </div>
      </div>
      </div>
      </div>
      
      <div class="control is-expanded">
      <button type="submit" class="button is-primary is-medium is-fullwidth submitform">Search</button>
      </div>
      <div class="control">
    <button type="button" class="button is-link is-light is-medium cancelform">Cancel</button>
  </div>
      
      </div>
      
    </form>
      `
    );

    this.form = this.holder.querySelector(".form");
    this.input = this.holder.querySelector(".input");
    this.buttonRef = this.form.querySelector(".button.is-primary");
    this.selectViews = this.form.querySelector(".views");
    this.searchBar = this.form.querySelector(".search");
    this.startDate = this.form.querySelector(".startdate");
    this.endDate = this.form.querySelector(".enddate");
    this.btnCancel = this.form.querySelector(".cancelform");
  }
  render() {
    const { data, countries, months, loading, error } = store.getState();
    //loading
    if (loading) {
      this.buttonRef.classList.add("is-loading");
    } else {
      this.buttonRef.classList.remove("is-loading");
    }
    //error
    if (error) {
      console.log("error");
    } else {
      console.log("succes");
    }
    //set date datepickers
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
    //formsubmit
    this.form.onsubmit = (e) => {
      e.preventDefault();
      const searchViews = this.selectViews
        .querySelector("select")
        .value.toLowerCase();
      const searchValue = this.searchBar.value
        .split(" ")
        .map(
          (value) =>
            value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
        )
        .join("_");

      const startDate = this.startDate.value.replaceAll("-", "");
      const endDate = this.endDate.value.replaceAll("-", "");

      if (searchValue && searchViews && startDate && endDate) {
        store.dispatch(
          getData({
            page: searchValue,
            view: searchViews,
            start: startDate,
            end: endDate,
          })
        );
        this.form.reset();
      }
      //error searchBar
      if (searchValue === "") {
        this.searchBar.classList.add("is-danger");
        this.form.querySelector(".errorinput").style.display = "block";
      } else {
        this.searchBar.classList.remove("is-danger");
        this.form.querySelector(".errorinput").style.display = "none";
      }
      //error Datepickers
      if (startDate === "") {
        this.startDate.classList.add("is-danger");
        this.form.querySelector(".errorstartdate").style.display = "block";
      }
      if (endDate === "") {
        this.endDate.classList.add("is-danger");
        this.form.querySelector(".errorenddate").style.display = "block";
      } else {
        this.startDate.classList.remove("is-danger");
        this.endDate.classList.remove("is-danger");
        this.form.querySelector(".errorstartdate").style.display = "none";
        this.form.querySelector(".errorenddate").style.display = "none";
      }
    };

    //cancelbtn form
    this.btnCancel.onclick = (e) => {
      e.preventDefault();
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
