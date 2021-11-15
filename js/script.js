const IsStorno = document.querySelector(".IsStorno");
const barcode = document.querySelector(".barcode");
const brand = document.querySelector(".brand");
const category = document.querySelector(".category");
const countryName = document.querySelector(".countryName");
const date = document.querySelector(".date");
const discountPercent = document.querySelector(".discountPercent");
const finishedPrice = document.querySelector(".finishedPrice");
const gNumber = document.querySelector(".gNumber");
const incomeID = document.querySelector(".incomeID");
const isRealization = document.querySelector(".isRealization");
const isSupply = document.querySelector(".isSupply");
const lastChangeDate = document.querySelector(".lastChangeDate");
const nmId = document.querySelector(".nmId");
const number = document.querySelector(".number");
const oblastOkrugName = document.querySelector(".oblastOkrugName");
const odid = document.querySelector(".odid");
const orderId = document.querySelector(".orderId");
const priceWithDisc = document.querySelector(".priceWithDisc");
const promoCodeDiscount = document.querySelector(".promoCodeDiscount");
const quantity = document.querySelector(".quantity");
const regionName = document.querySelector(".regionName");
const saleID = document.querySelector(".saleID");
const spp = document.querySelector(".spp");
const subject = document.querySelector(".subject");
const supplierArticle = document.querySelector(".supplierArticle");
const techSize = document.querySelector(".techSize");
const totalPrice = document.querySelector(".totalPrice");
const warehouseName = document.querySelector(".warehouseName");

// const inputApi = document.querySelector(".inputApi").value;
const dateApi = document.querySelector("#dateApi").value;
const buttonGetApi = document.querySelector(".buttonGetApi");

// const stockURL =
// "https://suppliers-stats.wildberries.ru/api/v1/supplier/stocks?dateFrom=2021-10-13T00:00:00.000Z&key=OGRlMzFjMTQtYThiNy00ZTc0LWI4N2ItOTdlYTg5NmU0OTdh";

buttonGetApi.addEventListener("click", xhrrrr);
const imageArt = "https://images.wbstatic.net/c516x688/new/";

function apiKey() {
  fetch(stockURL).then((response) => console.log(response.json()));
  // .catch((result) => console.log("Ошибка HTTP: " + response.status));
}

// let response = fetch(stockURL);
// console.log(response);

// Рабочая функция которая достаёт API
function xhrrrr() {
  const api = document.querySelector(".inputApi").value;
  const stockURL = `https://suppliers-stats.wildberries.ru/api/v1/supplier/stocks?dateFrom=${dateApi}T00:00:00.000Z&key=${api}`;
  console.log(stockURL);
  const xhr = new XMLHttpRequest();
  xhr.open("GET", stockURL);
  xhr.responseType = "json";
  xhr.onload = () => {
    let api = "[]";
    xhr.status >= 400 ? console.log("Ошибка!") : (api = xhr.response);
    createCard(api);
  };
  xhr.onerror = () => {
    console.log(xhr.response);
  };

  xhr.send();
}
// .then((array) =>
//   array.forEach((element) => {
//     console.log(element);
//   })
// );

// let apiKey = fatch(
//   "https://suppliers-stats.wildberries.ru/api/v1/supplier/stocks?dateFrom=2021-10-13T00:00:00.000Z&key=OGRlMzFjMTQtYThiNy00ZTc0LWI4N2ItOTdlYTg5NmU0OTdh"
// );

// let promise = fetch(url, [options])
// let response = await fetch(url);

// if (response.ok) { // если HTTP-статус в диапазоне 200-299
//   // получаем тело ответа (см. про этот метод ниже)
//   let json = await response.json();
// } else {
//   alert("Ошибка HTTP: " + response.status);
// }

// console.log(buttonGetApi);

// Указать вчерашнюю дату
function dateTime() {
  let date = document.getElementById("dateTime");
  //  console.log(new Date());
  console.log(date.value);
  date.value = new Date();
  console.log(date);
  // date.set;

  // document.getElementById(
  //   "dateTime"
  // ).value = `${today.getFullYear()}-${today.getMonth()}-${0}${today.getDate()}`;
}
// dateTime();
// console.log(new Date());
// console.log(new Date("2020-09-20"));

class Card {
  constructor(cardSelector) {
    this._cardSelector = cardSelector;
    console.log("Карточка создана");
  }

  generateCard() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card_stock")
      .cloneNode(true);
    console.log(cardElement);
    this._element.querySelector(
      ".card__image"
    ).style.backgroundImage = `url(${imagetest})`;
    this._element.querySelector(".card__title").textContent = this._title;
    this._element.querySelector(".card__info").textContent = this._description;
    this._element.querySelector(".card__price-property").textContent =
      this._price;

    return this._element;
  }
}
// new Card(){
//   const
// }

// const newacardcraeate = document.querySelector(".createCard");
// newacardcraeate.addEventListener("click", new Card());

class Card22 {
  constructor(param) {
    (this.IsStorno = param.IsStorno),
      (this.barcode = param.barcode),
      (this.brand = param.brand),
      (this.category = param.category),
      (this.countryName = param.countryName),
      (this.date = param.date),
      (this.discountPercent = param.discountPercent),
      (this.finishedPrice = param.finishedPrice.this.forPay = param.forPay),
      (this.gNumber = param.gNumber),
      (this.incomeID = param.incomeID),
      (this.isRealization = param.isRealization),
      (this.isSupply = param.isSupply),
      (this.lastChangeDate = param.lastChangeDate),
      (this.nmId = param.nmId),
      (this.number = param.number),
      (this.oblastOkrugName = param.oblastOkrugName),
      (this.odid = param.odid),
      (this.orderId = param.orderId),
      (this.priceWithDisc = param.priceWithDisc),
      (this.promoCodeDiscount = param.promoCodeDiscount),
      (this.quantity = param.quantity),
      (this.regionName = param.regionName),
      (this.saleID = param.saleID),
      (this.spp = param.spp),
      (this.subject = param.subject),
      (this.supplierArticle = param.supplierArticle),
      (this.techSize = param.techSize),
      (this.totalPrice = param.totalPrice),
      (this.warehouseName = param.warehouseName);
  }
}

const cardTemplate = document.querySelector(".templateCard").content;
const cardList = document.querySelector(".card_list");

function createCard(api) {
  const li = document.createElement("li");
  //  console.log(li);

  console.log(api);
  console.log(typeof api);
  api.forEach(function (params) {
    let nmid = params.nmId + "";

    const cardTemplate = document.querySelector(".templateCard").content;
    let image = `${imageArt}${nmid.substring(0, 4)}0000/${params.nmId}-1.jpg`;
    console.log(image);
    cardTemplate.querySelector(".photo-card_small").src = `${image}`;

    cardTemplate.querySelector(".name").textContent = params.name;
    cardTemplate.querySelector(".barcodeApi").textContent = params.barcode;
    cardTemplate.querySelector(".discountApi").textContent = params.Discount;
    cardTemplate.querySelector(".price-productApi").textContent = params.Price;
    cardTemplate.querySelector(".brandApi").textContent = params.brand;
    cardTemplate.querySelector(".categoryApi").textContent = params.category;
    // SCCode: "";
    cardTemplate.querySelector(".daysOnSiteApi").textContent =
      params.daysOnSite;
    cardTemplate.querySelector(".inWayFromClientApi").textContent =
      params.inWayFromClient;
    cardTemplate.querySelector(".inWayToClientApi").textContent =
      params.inWayToClient;

    cardTemplate.querySelector(".lastChangeDateApi").textContent =
      params.lastChangeDate;

    cardTemplate.querySelector(".nmidAPI").textContent = params.nmId;

    cardTemplate.querySelector(".quantityAPI").textContent = params.quantity;
    cardTemplate.querySelector(".quantityFullApi").textContent =
      params.quantityFull;
    cardTemplate.querySelector(".quantityNotInOrdersApi").textContent =
      params.quantityNotInOrders;
    cardTemplate.querySelector(".subjectApi").textContent = params.subject;
    cardTemplate.querySelector(".supplierArticleAPI").textContent =
      params.supplierArticle;
    cardTemplate.querySelector(".techSizeApi").textContent = params.techSize;
    cardTemplate.querySelector(".warehouseNameApi").textContent =
      params.warehouseName;

    // isRealization: false;
    // isSupply: true;

    li.append(cardTemplate.cloneNode(true));
    cardList.append(li);
  });
}

const createCardButton = document.querySelector(".createCardButton");
createCardButton.addEventListener("click", createCard);
