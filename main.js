const API_KEY = `c0c83c9bb1294d74802bf4db24136a94`;
let newsList = [];
let keyWord = "";
let categoryList = [
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
  "general",
];
let category = "general";
let sortBy = "publishedAt";
let country = "us";
let page = 1;
const getNews = async () => {
  let url = `https://newsapi.org/v2/top-headlines?q=${keyWord}&apiKey=${API_KEY}&category=${category}&country=${country}`;
  let response = await fetch(url);
  let data = await response.json(); //collect data
  newsList = data.articles;
  render(newsList);
  console.log("response", data);
  console.log("newsList", category, newsList);
  checkTotalNews(data);
  renderNewsNumber(data);
};

const render = (list) => {
  console.log("list??", list);
  let newsHTML = list.map(
    (item) => `
    <div class="news">
        <img src="${item.urlToImage}" width="150" height="150">
        <div>
            <h2>${item.title}</h2>
            <p>${item.description}</p>
            <div>${moment(item.publishedAt).startOf("hour").fromNow()}</div>
            <div>${item.source.name}</div>
        </div>
    </div>
    `
  );

  document.getElementById("newsBoard").innerHTML = newsHTML;
};

const search = () => {
  let userInput = document.getElementById("searchContent").value;
  keyWord = userInput;
  newsListRefresh();
  getNews();
};

getNews();
const newsListRefresh = () => {
  newsList = [];
};
const getMoreNews = async () => {
  page++;
  let newNewsList = [];
  let url = `https://newsapi.org/v2/top-headlines?q=${keyWord}&apiKey=${API_KEY}&category=${category}&country=${country}&page=${page}`;
  console.log(url);
  let response = await fetch(url);
  let data = await response.json(); //collect data
  console.log("loadmore data", data);

  newNewsList = data.articles;
  newsList = newsList.concat(newNewsList);

  console.log("loadmore newslist", newsList);

  render(newsList);
  checkTotalNews(data);
  renderNewsNumber(data);
};

const checkTotalNews = (data) => {
  let totalNews = data.totalResults;
  if (newsList.length === totalNews) {
    document.getElementById("moreNewsButton").disabled = true;
  } else {
    document.getElementById("moreNewsButton").disabled = false;
  }
};

const showCategory = (catString) => {
  keyWord = "";
  category = catString;
  newsListRefresh();
  renderCategory(catString);
  getNews();
};

const renderCategory = (catString) => {
  let stringCat = "";
  if (catString === "General") {
    stringCat += "Breaking News";
  } else {
    stringCat += catString;
  }
  document.getElementById("navbarDropdown").innerHTML = stringCat;
};

const renderNewsNumber = (data) => {
  let stringNewsNumber = "";
  let currentNewsNumber = newsList.length;
  let totalNewsNumber = data.totalResults;
  stringNewsNumber += `<p>Showing ${currentNewsNumber} out of ${totalNewsNumber}</p>`;
  document.getElementById("pageNum").innerHTML = stringNewsNumber;
};
// show news info (use moment js)
// search by keyword (call api)
// search by cagegory (call api)
// search by source (dont call the api, but try to)
// load more
