import store from "../Data";
import "./infocard.scss";

class InfoCard {
  constructor(holder) {
    this.holder = holder;
    this.init();
    this.card;
    this.articleName;
    this.totalViews;
    this.mostViews;
    this.urlPage;
    this.events();
    store.subscribe(this.render.bind(this));
    this.styling();
  }
  init() {
    this.holder.insertAdjacentHTML(
      "beforeend",
      `
    <div class="info__card">
    <h2>Article Name</h2>
        <p class="name"><p>
        <h2>Total views</h2>
        <p class="totalviews">0</p>
        <h2>Most views on a day</h2>
        <p class="mostviews">0</p>
        <h2>Link to page</h2>
        <a class="wikilink" href="#URL"></a>
    </div>
    `
    );
    this.card = this.holder.querySelector(".info__card");
    this.articleName = this.holder.querySelector(".name");
    this.totalViews = this.holder.querySelector(".totalviews");
    this.mostViews = this.holder.querySelector(".mostviews");
    this.urlPage = this.holder.querySelector(".wikilink");
  }
  events() {}
  render() {
    const articleNames = store.getState().data.map((obj) => obj.article);
    const totalViews = store
      .getState()
      .data.map((obj) => obj.views)
      .reduce((a, b) => {
        return a + b;
      }, 0);
    const mostViews = store
      .getState()
      .data.map((obj) => obj.views)
      .sort((a, b) => b - a)[0];

    this.articleName.innerHTML = `${articleNames[0]}`;
    this.totalViews.innerHTML = `${totalViews}`;
    this.mostViews.innerHTML = `${mostViews}`;
  }
  styling() {
    const cardStyles = {
      textTransform: "Uppercase",
    };
    Object.assign(this.card.style, cardStyles);
  }
}

export default (holder) => new InfoCard(holder);
