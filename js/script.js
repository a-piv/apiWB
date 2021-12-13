const barcode = document.querySelector(".barcode");
const brand = document.querySelector(".brand");
const cancel_dt = document.querySelector(".cancel_dt");
const category = document.querySelector(".category");
const date = document.querySelector(".date");
const discountPercent = document.querySelector(".discountPercent");
const gNumber = document.querySelector(".gNumber");
const incomeID = document.querySelector(".incomeID");
const isCancel = document.querySelector(".isCancel");
const lastChangeDate = document.querySelector(".lastChangeDate");
const nmId = document.querySelector(".nmId");
const number = document.querySelector(".number");
const oblast = document.querySelector(".oblast");
const odid = document.querySelector(".odid");
const quantity = document.querySelector(".quantity");
const subject = document.querySelector(".subject");
const supplierArticle = document.querySelector(".supplierArticle");
const techSize = document.querySelector(".techSize");
const totalPrice = document.querySelector(".totalPrice");
const warehouseName = document.querySelector(".warehouseName");
const countryName = document.querySelector(".countryName");
const finishedPrice = document.querySelector(".finishedPrice");
const forPay = document.querySelector(".forPay");
const isRealization = document.querySelector(".isRealization");
const IsStorno = document.querySelector(".IsStorno");
const isSupply = document.querySelector(".isSupply");
const oblastOkrugName = document.querySelector(".oblastOkrugName");
const orderId = document.querySelector(".orderId");
const priceWithDisc = document.querySelector(".priceWithDisc");
const promoCodeDiscount = document.querySelector(".promoCodeDiscount");
const regionName = document.querySelector(".regionName");
const saleID = document.querySelector(".saleID");
const spp = document.querySelector(".spp");
const daysOnSite = document.querySelector(".daysOnSite");
const Discount = document.querySelector(".Discount");
const inWayFromClient = document.querySelector(".inWayFromClient");
const inWayToClient = document.querySelector(".inWayToClient");
const Price = document.querySelector(".Price");
const quantityFull = document.querySelector(".quantityFull");
const quantityNotInOrders = document.querySelector(".quantityNotInOrders");
const SCCode = document.querySelector(".SCCode");

const timeApi = document.querySelector("#timeApi");
console.log(timeApi.value);

const apiInfo_all = document.querySelector(".apiInfo_all");
// const inputApi = document.querySelector(".inputApi").value;

const buttonGetStocks = document.querySelector(".buttonGetStocks");
const buttonGetOrders = document.querySelector(".buttonGetOrders");
const buttonGetSales = document.querySelector(".buttonGetSales");

const buttonGetIncomes = document.querySelector(".buttonGetIncomes");
const buttonGetreportDetailByPeriod = document.querySelector(
  ".buttonGetreportDetailByPeriod"
);

// const stockURL =
// "https://suppliers-stats.wildberries.ru/api/v1/supplier/stocks?dateFrom=2021-10-13T00:00:00.000Z&key=OGRlMzFjMTQtYThiNy00ZTc0LWI4N2ItOTdlYTg5NmU0OTdh";

let inWayToClientCounter = 0;
let inWayFromClientCounter = 0;

let salesOkCounter = 0;
let salesRefundCounter = 0;

let salesStornoRefundCounter = 0;
let salesStornoalesCounter = 0;

let orderOkCounter = 0;
let orderCancelCounter = 0;
let salesDoplataCounter = 0;

// document.querySelector(".buttonGetTest").addEventListener("click", () => {
//   console.log("чик");
// });

buttonGetStocks.addEventListener("click", () => {
  getJson("stocks");
});
buttonGetOrders.addEventListener("click", () => {
  getJson("orders");
});
buttonGetSales.addEventListener("click", () => {
  getJson("sales");
});

buttonGetIncomes.addEventListener("click", () => {
  getJson("incomes");
});
// buttonGetreportDetailByPeriod.addEventListener("click", () => {
//   getJson("buttonGetreportDetailByPeriod");
// });

//const imageArt-big = "https://images.wbstatic.net/c516x688/new/";
const imageArt = "https://img1.wbstatic.net/tm/new/";

// function apiKey() {
//   fetch(stockURL).then((response) => console.log(response.json()));
//   // .catch((result) => console.log("Ошибка HTTP: " + response.status));
// }

//Проверяем флаг
let flagApi = document.getElementById("flagApi");
let flag = "1";
flagApi.addEventListener("click", function (event) {
  if (event.target.checked) {
    return (flag = 1);
  } else {
    return (flag = 0);
  }
});
// flagApi.value == "checked" ? (flagApi = 1) : (flagApi = 0);

// let response = fetch(stockURL);
// console.log(response);

// Проверка выбора чекбокса

// Рабочая функция которая достаёт API
function getJson(method) {
  const dateApi = document.querySelector("#dateApi").value;
  const api = document.querySelector(".inputApi").value;
  console.log(document.querySelector(".product"));
  console.log(flag);
  const stockURL = `https://suppliers-stats.wildberries.ru/api/v1/supplier/${method}?dateFrom=${dateApi}T00:00:00.000Z&flag=${flag}&key=${api}`;
  console.log(stockURL);
  console.log(method);
  const xhr = new XMLHttpRequest();
  xhr.open("GET", stockURL);
  xhr.responseType = "json";
  xhr.onload = () => {
    let api = "[]";
    xhr.status >= 400
      ? alert("Ошибка! Попробуйте позже")
      : (api = xhr.response);
    console.log(method);
    console.log(typeof method);
    console.log(api.length);
    // createCardStock(api, method);
    if (method == "stocks") {
      console.log("Метод склад");

      createCardStock(api);
      itogInfoApi(apiInfo_all, api, dateApi, flag, "Всего товаров");
      // console.log(inWayToClientCounter, inWayFromClientCounter);
      generalInfoList("К клиенту", inWayToClientCounter, apiInfo_all);
      generalInfoList("От клиента", inWayFromClientCounter, apiInfo_all);
    } else if (method == "orders") {
      console.log("Метод заказы");
      createCardOrders(api);
      itogInfoApi(apiInfo_all, api, dateApi, flag, "Всего заказов");
      generalInfoList("Успешных заказов", orderOkCounter, apiInfo_all);
      if (orderCancelCounter > 0) {
        generalInfoList("Отменёных заказов", orderCancelCounter, apiInfo_all);
      }
    } else if (method == "sales") {
      console.log("Метод продажи");
      createCardSales(api);
      itogInfoApi(apiInfo_all, api, dateApi, flag, "Всего продаж и возвратов");
      generalInfoList("Продаж", salesOkCounter, apiInfo_all);
      generalInfoList("Возвратов", salesRefundCounter, apiInfo_all);
      generalInfoList("Доплат", salesDoplataCounter, apiInfo_all);
      generalInfoList(
        "Сторно-возвратов",
        salesStornoRefundCounter,
        apiInfo_all
      );
      generalInfoList("Сторно-Доплат", salesStornoalesCounter, apiInfo_all);

      // generalInfoList("Доплат", salesDoplataCounter, apiInfo_all);

      // if (salesDoplataCounter > 0) {
      //   generalInfoList("Доплат", salesRefundCounter, apiInfo_all);
      // }
    } else if (method == "incomes") {
      createCardIncomes(api);
    } else if (method == "buttonGetreportDetailByPeriod") {
      console.log("Клик buttonGetreportDetailByPeriod");
    } else {
      console.log("Не понятный метод");
    }
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

class CardOld {
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

class Section {
  constructor({ api }, containerSelector) {
    this._initialArray = api;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    // Переберем массив _initialArray с начальными сообщениями
    this._initialArray.forEach((item) => {
      // Исходя из поля isOwner создадим экземпляры классов
      const card = item.isOwner
        ? new UserCard(item, ".card-template_type_user")
        : new DefaultCard(item, ".card-template_type_default");

      const cardElement = card.generateCard();

      // Вставим разметку на страницу,
      // используя метод setItem класса Section
      this.setItem(cardElement);
    });
  }

  setItem(element) {
    this._container.append(element);
  }
}

class Card {
  constructor(cardSelector) {
    this.cardSelector = cardSelector;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this.cardSelector)
      .content.cloneNode(true);
    console.log(cardElement);
  }
}

class CardStock extends Card {
  constructor(param, cardSelector) {
    (this.barcode = param.barcode),
      (this.brand = param.brand),
      (this.category = param.category),
      (this.lastChangeDate = param.lastChangeDate),
      (this.nmId = param.nmId),
      (this.quantity = param.quantity),
      (this.subject = param.subject),
      (this.supplierArticle = param.supplierArticle),
      (this.techSize = param.techSize),
      (this.warehouseName = param.warehouseName),
      (this.barcode = param.barcode),
      (this.brand = param.brand),
      (this.category = param.category),
      (this.lastChangeDate = param.lastChangeDate),
      (this.nmId = param.nmId),
      (this.quantity = param.quantity),
      (this.subject = param.subject),
      (this.supplierArticle = param.supplierArticle),
      (this.techSize = param.techSize),
      (this.warehouseName = param.warehouseName),
      (this.barcode = param.barcode),
      (this.brand = param.brand),
      (this.category = param.category),
      (this.lastChangeDate = param.lastChangeDate),
      (this.nmId = param.nmId),
      (this.quantity = param.quantity),
      (this.subject = param.subject),
      (this.supplierArticle = param.supplierArticle),
      (this.techSize = param.techSize),
      (this.warehouseName = param.warehouseName),
      (this.daysOnSite = param.daysOnSite),
      (this.Discount = param.Discount),
      (this.inWayFromClient = param.inWayFromClient),
      (this.inWayToClient = param.inWayToClient),
      (this.isRealization = param.isRealization),
      (this.isSupply = param.isSupply),
      (this.Price = param.Price),
      (this.quantityFull = param.quantityFull),
      (this.quantityNotInOrders = param.quantityNotInOrders),
      (this.SCCode = param.SCCode);
  }
}

class CardOrders extends Card {
  constructor(param) {
    (this.barcode = param.barcode),
      (this.brand = param.brand),
      (this.category = param.category),
      (this.lastChangeDate = param.lastChangeDate),
      (this.nmId = param.nmId),
      (this.quantity = param.quantity),
      (this.subject = param.subject),
      (this.supplierArticle = param.supplierArticle),
      (this.techSize = param.techSize),
      (this.warehouseName = param.warehouseName),
      (this.barcode = param.barcode),
      (this.brand = param.brand),
      (this.category = param.category),
      (this.lastChangeDate = param.lastChangeDate),
      (this.nmId = param.nmId),
      (this.quantity = param.quantity),
      (this.subject = param.subject),
      (this.supplierArticle = param.supplierArticle),
      (this.techSize = param.techSize),
      (this.warehouseName = param.warehouseName),
      (this.barcode = param.barcode),
      (this.brand = param.brand),
      (this.category = param.category),
      (this.lastChangeDate = param.lastChangeDate),
      (this.nmId = param.nmId),
      (this.quantity = param.quantity),
      (this.subject = param.subject),
      (this.supplierArticle = param.supplierArticle),
      (this.techSize = param.techSize),
      (this.warehouseName = param.warehouseName),
      (this.daysOnSite = param.daysOnSite),
      (this.Discount = param.Discount),
      (this.inWayFromClient = param.inWayFromClient),
      (this.inWayToClient = param.inWayToClient),
      (this.isRealization = param.isRealization),
      (this.isSupply = param.isSupply),
      (this.Price = param.Price),
      (this.quantityFull = param.quantityFull),
      (this.quantityNotInOrders = param.quantityNotInOrders),
      (this.SCCode = param.SCCode);
  }
}

class CardSales extends Card {
  constructor(param) {
    (this.barcode = param.barcode),
      (this.brand = param.brand),
      (this.category = param.category),
      (this.lastChangeDate = param.lastChangeDate),
      (this.nmId = param.nmId),
      (this.quantity = param.quantity),
      (this.subject = param.subject),
      (this.supplierArticle = param.supplierArticle),
      (this.techSize = param.techSize),
      (this.warehouseName = param.warehouseName),
      (this.barcode = param.barcode),
      (this.brand = param.brand),
      (this.category = param.category),
      (this.lastChangeDate = param.lastChangeDate),
      (this.nmId = param.nmId),
      (this.quantity = param.quantity),
      (this.subject = param.subject),
      (this.supplierArticle = param.supplierArticle),
      (this.techSize = param.techSize),
      (this.warehouseName = param.warehouseName),
      (this.barcode = param.barcode),
      (this.brand = param.brand),
      (this.category = param.category),
      (this.lastChangeDate = param.lastChangeDate),
      (this.nmId = param.nmId),
      (this.quantity = param.quantity),
      (this.subject = param.subject),
      (this.supplierArticle = param.supplierArticle),
      (this.techSize = param.techSize),
      (this.warehouseName = param.warehouseName),
      (this.countryName = param.countryName),
      (this.date = param.date),
      (this.discountPercent = param.discountPercent),
      (this.finishedPrice = param.finishedPrice),
      (this.forPay = param.forPay),
      (this.gNumber = param.gNumber),
      (this.incomeID = param.incomeID),
      (this.isRealization = param.isRealization),
      (this.IsStorno = param.IsStorno),
      (this.isSupply = param.isSupply),
      (this.oblastOkrugName = param.oblastOkrugName),
      (this.odid = param.odid),
      (this.orderId = param.orderId),
      (this.priceWithDisc = param.priceWithDisc),
      (this.promoCodeDiscount = param.promoCodeDiscount),
      (this.regionName = param.regionName),
      (this.saleID = param.saleID),
      (this.spp = param.spp),
      (this.totalPrice = param.totalPrice),
      (this.number = param.number);
  }
}

// const cardTemplate = document.querySelector(".templateCard").content;
const cardList = document.querySelector(".card_list");

function createCardStock(api) {
  //  console.log(li);

  console.log(api);
  api.forEach(function (params, i) {
    let nmid = params.nmId + "";

    const cardTemplate = document.querySelector(".templateCard-stocks").content;

    cardTemplate
      .querySelector(".photo-card-href")
      .setAttribute(
        "href",
        `https://www.wildberries.ru/catalog/${params.nmId}/detail.aspx`
      );

    cardTemplate.querySelector(".number-card").textContent = `${i + 1}.`;
    let image = `${imageArt}${nmid.substring(0, 4)}0000/${params.nmId}-1.jpg`;

    cardTemplate.querySelector(".photo-card_small").src = `${image}`;
    cardTemplate.querySelector(".name").textContent = params.name;
    cardTemplate.querySelector(".barcodeApi").textContent = params.barcode;
    cardTemplate.querySelector(".discountApi").textContent = params.Discount;
    cardTemplate.querySelector(".price-productApi").textContent = params.Price;
    cardTemplate.querySelector(".final-price").textContent = `${
      params.Price - (params.Price / 100) * params.Discount
    }`;
    cardTemplate.querySelector(".brandApi").textContent = params.brand;
    cardTemplate.querySelector(".categoryApi").textContent = params.category;
    cardTemplate.querySelector(".daysOnSiteApi").textContent =
      params.daysOnSite;
    cardTemplate.querySelector(".inWayFromClientApi").textContent =
      params.inWayFromClient;
    inWayFromClientCounter = inWayFromClientCounter + params.inWayFromClient;

    cardTemplate.querySelector(".inWayToClientApi").textContent =
      params.inWayToClient;
    inWayToClientCounter = inWayToClientCounter + params.inWayToClient;

    cardTemplate.querySelector(".lastChangeDateApi").textContent =
      params.lastChangeDate;

    cardTemplate.querySelector(".nmidAPI").textContent = params.nmId;

    cardTemplate.querySelector(".quantityAPI").textContent = params.quantity;

    if (params.quantity == 0) {
      console.log(params.quantity, typeof params.quantity);
      cardTemplate.querySelector(
        ".card-comment"
      ).textContent = `${params.quantity}`;
    } else {
      console.log("dctt");
    }

    // }
    // console.log(params.quantity);
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

    // Не задействованы параметры из апи:
    // SCCode: "";
    // isRealization: false;
    // isSupply: true;
    const li = document.createElement("li");
    li.classList.add("card_stocks");
    li.append(cardTemplate.cloneNode(true));
    cardList.append(li);
  });
}

function createCardSales(api) {
  console.log(api);
  api.forEach(function (params, i) {
    let nmid = params.nmId + "";
    console.log(params.nmId);

    const cardTemplate = document.querySelector(".templateCard-sales").content;
    cardTemplate.querySelector(".number-card").textContent = `${i + 1}.`;
    cardTemplate
      .querySelector(".photo-card-href")
      .setAttribute(
        "href",
        `https://www.wildberries.ru/catalog/${params.nmId}/detail.aspx`
      );

    let image = `${imageArt}${nmid.substring(0, 4)}0000/${params.nmId}-1.jpg`;
    console.log(image);
    cardTemplate.querySelector(".photo-card_small").src = `${image}`;

    cardTemplate.querySelector(".barcodeApi").textContent = params.barcode;
    cardTemplate.querySelector(".brandApi").textContent = params.brand;
    cardTemplate.querySelector(".categoryApi").textContent = params.category;
    cardTemplate.querySelector(".countryNameApi").textContent =
      params.countryName;
    cardTemplate.querySelector(".dateApi").textContent = params.date;
    cardTemplate.querySelector(".discountPercentApi").textContent =
      params.discountPercent;
    cardTemplate.querySelector(".finishedPriceApi").textContent =
      params.finishedPrice;
    cardTemplate.querySelector(".forPayApi").textContent = params.forPay;
    cardTemplate.querySelector(".gNumberApi").textContent = params.gNumber;
    cardTemplate.querySelector(".incomeIDApi").textContent = params.incomeID;
    cardTemplate.querySelector(".isRealizationApi").textContent =
      params.isRealization;
    cardTemplate.querySelector(".IsStornoApi").textContent = params.IsStorno;
    cardTemplate.querySelector(".isSupplyApi").textContent = params.isSupply;
    cardTemplate.querySelector(".lastChangeDateApi").textContent =
      params.lastChangeDate;
    cardTemplate.querySelector(".nmIdApi").textContent = params.nmId;
    cardTemplate.querySelector(".oblastOkrugNameApi").textContent =
      params.oblastOkrugName;
    cardTemplate.querySelector(".odidApi").textContent = params.odid;
    cardTemplate.querySelector(".orderIdApi").textContent = params.orderId;
    cardTemplate.querySelector(".priceWithDiscApi").textContent =
      params.priceWithDisc;
    cardTemplate.querySelector(".promoCodeDiscountApi").textContent =
      params.promoCodeDiscount;
    cardTemplate.querySelector(".quantityApi").textContent = params.quantity;
    cardTemplate.querySelector(".regionNameApi").textContent =
      params.regionName;
    cardTemplate.querySelector(".saleIDApi").textContent = params.saleID;
    cardTemplate.querySelector(".sppApi").textContent = params.spp;
    cardTemplate.querySelector(".subjectApi").textContent = params.subject;
    cardTemplate.querySelector(".supplierArticleApi").textContent =
      params.supplierArticle;
    // if (params.techSize > 0) {
    //   cardTemplate.querySelector(
    //     ".techSizeApi"
    //   ).textContent = `${params.techSize}`;
    // }
    cardTemplate.querySelector(".techSizeApi").textContent = params.techSize;

    cardTemplate.querySelector(".totalPriceApi").textContent =
      params.totalPrice;
    cardTemplate.querySelector(".warehouseNameApi").textContent =
      params.warehouseName;
    cardTemplate.querySelector(".numberApi").textContent = params.number;

    // Не задействованы параметры из апи:
    // SCCode: "";
    // isRealization: false;
    // isSupply: true;
    const li = document.createElement("li");
    li.classList.add("card_li");
    let numberSale = params.saleID;
    console.log(numberSale.substring(0, 1));
    let indexSale = numberSale.substring(0, 1);
    console.log(indexSale);
    if (numberSale.substring(0, 1) == "S") {
      li.classList.add("card_sales");
      salesOkCounter++;
    } else if (numberSale.substring(0, 1) == "R") {
      li.classList.add("card_sales_refund");
      salesRefundCounter++;
    } else if (numberSale.substring(0, 1) == "D") {
      li.classList.add("card_sales_doplata");
      salesDoplataCounter++;
    } else if (numberSale.substring(0, 1) == "B") {
      li.classList.add("card_sales_storno_refund");
      salesStornoRefundCounter++;
    } else if (numberSale.substring(0, 1) == "A") {
      li.classList.add("card_sales_storno_sales");
      salesStornoalesCounter++;
    }
    // params.quantity > 0
    //   ? li.classList.add("card_sales")
    //   : li.classList.add("card_sales_refund");
    li.append(cardTemplate.cloneNode(true));
    cardList.append(li);
    console.log(cardTemplate);
  });
}

function createCardOrders(api) {
  //  console.log(li);
  const template = `templateCard-orders`;
  console.log(template);
  console.log(api);
  api.forEach(function (params, i) {
    let nmid = params.nmId + "";
    console.log(params.nmId);

    const cardTemplate = document.querySelector(`.${template}`).content;

    cardTemplate.querySelector(".number-card").textContent = `${i + 1}.`;
    cardTemplate
      .querySelector(".photo-card-href")
      .setAttribute(
        "href",
        `https://www.wildberries.ru/catalog/${params.nmId}/detail.aspx`
      );
    console.log(cardTemplate);
    let image = `${imageArt}${nmid.substring(0, 4)}0000/${params.nmId}-1.jpg`;
    console.log(image);
    cardTemplate.querySelector(".photo-card_small").src = `${image}`;

    cardTemplate.querySelector(".barcodeApi").textContent = params.barcode;
    cardTemplate.querySelector(".brandApi").textContent = params.brand;
    cardTemplate.querySelector(".cancel_dtApi").textContent = params.cancel_dt;
    cardTemplate.querySelector(".categoryApi").textContent = params.category;
    cardTemplate.querySelector(".dateApi").textContent = params.date;
    cardTemplate.querySelector(".discountPercentApi").textContent =
      params.discountPercent;
    cardTemplate.querySelector(".gNumberApi").textContent = params.gNumber;
    cardTemplate.querySelector(".incomeIDApi").textContent = params.incomeID;
    cardTemplate.querySelector(".isCancelApi").textContent = params.isCancel;
    cardTemplate.querySelector(".lastChangeDateApi").textContent =
      params.lastChangeDate;
    cardTemplate.querySelector(".nmIdApi").textContent = params.nmId;
    cardTemplate.querySelector(".numberApi").textContent = params.number;
    cardTemplate.querySelector(".oblastApi").textContent = params.oblast;
    cardTemplate.querySelector(".odidApi").textContent = params.odid;
    cardTemplate.querySelector(".quantityApi").textContent = params.quantity;
    cardTemplate.querySelector(".subjectApi").textContent = params.subject;
    cardTemplate.querySelector(".supplierArticleApi").textContent =
      params.supplierArticle;
    cardTemplate.querySelector(".techSizeApi").textContent = params.techSize;
    cardTemplate.querySelector(".totalPriceApi").textContent =
      params.totalPrice;
    cardTemplate.querySelector(".warehouseNameApi").textContent =
      params.warehouseName;

    // Не задействованы параметры из апи:
    // SCCode: "";
    // isRealization: false;
    // isSupply: true;
    const li = document.createElement("li");
    li.classList.add("card_orders");
    if (params.isCancel) {
      orderCancelCounter++;
      li.classList.add("card_orders_cancel");
    } else {
      orderOkCounter++;
    }
    li.append(cardTemplate.cloneNode(true));
    cardList.append(li);
  });
}

function itogInfoApi(selector, api, date, flag, text) {
  let list = document.createElement("li");
  list.classList.add("generalInfo");

  if (flag) {
    list.textContent = `${text} за ${date}: ${api.length} шт.`;
  } else {
    list.textContent = `${text} c ${date} по настоящее время: ${api.length} шт.`;
  }
  selector.append(list);
}

function generalInfoList(name, inWayTo, selector) {
  // select = document.querySelector(selector);
  let list = document.createElement("li");
  list.classList.add("secondaryInfo");
  list.textContent = `${name}: ${inWayTo}`;
  selector.append(list);
  console.log(list);
  // console.log(list);
}

// const createCardButton = document.querySelector(".createCardButton");
// createCardButton.addEventListener("click", createCard);

// --------------------------
// Переводим в классы

//Допустим, в проекте есть класс Card, который возвращает разметку карточки товара.
// И класс Section, который вставляет разметку в DOM. Card и Section связаны друг с другом. Section отрисовывает разметку, которую возвращает Card.
// class Card {
//   constructor() {}
// }

function createCardIncomes(api) {
  const template = `templateCard-incomes`;
  console.log(template);
  console.log(api);
  api.forEach(function (params, i) {
    let nmid = params.nmId + "";
    console.log(params.nmId);

    const cardTemplate = document.querySelector(`.${template}`).content;

    cardTemplate.querySelector(".number-card").textContent = `${i + 1}.`;
    cardTemplate
      .querySelector(".photo-card-href")
      .setAttribute(
        "href",
        `https://www.wildberries.ru/catalog/${params.nmId}/detail.aspx`
      );
    console.log(cardTemplate);
    let image = `${imageArt}${nmid.substring(0, 4)}0000/${params.nmId}-1.jpg`;
    console.log(image);
    cardTemplate.querySelector(".photo-card_small").src = `${image}`;

    cardTemplate.querySelector(".incomeidApi").textContent = params.incomeId;
    cardTemplate.querySelector(".numberApi").textContent = params.number;
    cardTemplate.querySelector(".dateApi").textContent = params.date;
    cardTemplate.querySelector(".lastChangeDateApi").textContent =
      params.lastChangeDate;
    cardTemplate.querySelector(".supplierArticleApi").textContent =
      params.supplierArticle;
    cardTemplate.querySelector(".techSizeApi").textContent = params.techSize;
    cardTemplate.querySelector(".barcodeApi").textContent = params.barcode;
    cardTemplate.querySelector(".quantityApi").textContent = params.quantity;
    cardTemplate.querySelector(".totalPriceApi").textContent =
      params.totalPrice;
    cardTemplate.querySelector(".dateCloseApi").textContent = params.dateClose;
    cardTemplate.querySelector(".warehouseNameApi").textContent =
      params.warehouseName;
    cardTemplate.querySelector(".nmidApi").textContent = params.nmId;
    cardTemplate.querySelector(".statusApi").textContent = params.status;

    // Не задействованы параметры из апи:
    // SCCode: "";
    // isRealization: false;
    // isSupply: true;
    const li = document.createElement("li");
    li.classList.add("card_orders");
    li.append(cardTemplate.cloneNode(true));
    cardList.append(li);
  });
}
