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
        <h2 class="name"></h2>
        </div>
        <div>
        <p>Total views</p>
        <span>
        <svg class="icon icon-eye">
        <use href="#icon-eye"></use>
        </svg>
        </span>
        <h2 class="totalviews"></h2>
        </div>
        <div>
        <p>Most views on a day</p>
        <span>
        <svg class="icon icon-trophy">
        <use href="#icon-trophy"></use>
        </svg>
        </span>
        <h2 class="mostviews"></h2>
        </div>
        <div class="wikilink">
        <p>Link to page</p>
        <span>
        <svg class="icon icon-sphere">
        <use href="#icon-sphere"></use>
        </svg>
        </span>
        <div class="url">
        
        </div>
        </div>
        
    </div>
    `
    );
    this.card = this.holder.querySelector(".info__card");
    this.articleName = this.holder.querySelector(".name");
    this.totalViews = this.holder.querySelector(".totalviews");
    this.mostViews = this.holder.querySelector(".mostviews");
    this.urlPage = this.holder.querySelector(".url");
  }
  events() {}
  render() {
    const articleNames = store.getState().data.map((obj) => obj.article);
    const articleName = articleNames[0];

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

    this.totalViews.innerHTML = `${totalViews}`;
    this.mostViews.innerHTML = `${mostViews}`;
    this.articleName.innerHTML = `${articleName}`;

    if (articleNames[0]) {
      this.urlPage.innerHTML = `<a href="https://en.wikipedia.org/wiki/${articleNames[0]}" target="_blanc">${articleNames[0]}</a>`;
    }

    const { data, countries, months, loading, error } = store.getState();

    if (loading) {
      this.articleName.style.display = "none";
      this.urlPage.style.display = "none";
      this.mostViews.style.display = "none";
      this.totalViews.style.display = "none";
    } else {
      this.articleName.style.display = "";
      this.urlPage.style.display = "";
      this.mostViews.style.display = "";
      this.totalViews.style.display = "";
    }
  }
  styling() {
    const cardStyles = {};
    Object.assign(this.card.style, cardStyles);
  }
}

export default (holder) => new InfoCard(holder);
