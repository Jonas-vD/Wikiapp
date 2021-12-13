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
        
        <div>
        <p>Article Name</p>
        <span>
        <svg class="icon icon-newspaper">
        <use href="#icon-newspaper"></use>
        </svg>
        </span>
        <h2 class="name">&nbsp</h2>
        </div>
        <div>
        <p>Total views</p>
        <span>
        <svg class="icon icon-eye">
        <use href="#icon-eye"></use>
        </svg>
        </span>
        <h2 class="totalviews">0</h2>
        </div>
        <div>
        <p>Most views on a day</p>
        <span>
        <svg class="icon icon-trophy">
        <use href="#icon-trophy"></use>
        </svg>
        </span>
        <h2 class="mostviews">0</h2>
        </div>
        <div class="wikilink">
        <p>Link to page</p>
        <span>
        <svg class="icon icon-sphere">
        <use href="#icon-sphere"></use>
        </svg>
        </span>
        
        </div>
        
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
    this.urlPage.insertAdjacentHTML(
      "beforeend",
      `<a href="https://en.wikipedia.org/wiki/${articleNames[0]}">en.wikipedia.org/wiki/${articleNames[0]}</a>`
    );
  }
  styling() {
    const cardStyles = {};
    Object.assign(this.card.style, cardStyles);
  }
}

export default (holder) => new InfoCard(holder);
