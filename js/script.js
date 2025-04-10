const DOM = {
  crypto_converter_form: document.getElementById("crypto-converter-form"),

  amount_dropdown: document.getElementById("amount-dropdown"),

  convert_to_dropdown: document.getElementById("convert-to-dropdown"),
};

window.addEventListener("load", async () => {
  // get the lists of currencies
  let crypto_currencies = await getCurrencies("/crypto-symbols");
  let fiat_currencies = await getCurrencies("/fiat-symbols"); //regular currency- ie: USD

  // display data from the API on the page
  renderView(crypto_currencies, fiat_currencies);

  // monitor form for changes in fields
  DOM.crypto_converter_form.addEventListener("change", async (e) => {
    let target_ele = e.target;

    let amount_currency =
      target_ele.id == "amount-dropdown" ? target_ele.value : null;

    let amount_to_convert =
      target_ele.id == "amount-to-be-converted" ? target_ele.value : null;

    let currency_to_convert_to =
      target_ele.id == "convert-to-dropdown" ? target_ele.value : null;

    let date = target_ele.id == "date" ? target_ele.value : null;

    console.log(
      amount_currency,
      amount_to_convert,
      currency_to_convert_to,
      date
    );

    // http://api.coinlayer.com/convert?access_key=8917ef8540765aaf5d1f0fa451b332e0&from=BTC&to=ETH&amount=10
    let data = await fetchData(
      "https://fast-price-exchange-rates.p.rapidapi.com/api/v1/convert?amount=1&base_currency=EUR&quote_currency=USD%2CBTC"
    );

    console.log("data", data);
  });
});

// get a list of all crypto currencies
async function getCurrencies(api_endpoint) {
  let url = `${CONFIG.baseURL}${api_endpoint}`;
  const result = await fetchData(url);

  return Object.keys(result);
  return result;
}

// display dynamic data in DOM
function renderView(crypto_currencies, fiat_currencies) {
  // display crypto currencies for amount dropdown field in the converter form
  displayDropdownItems(crypto_currencies, DOM.amount_dropdown);

  // display crypto currencies for convert to dropdown field in the converter form
  displayDropdownItems(fiat_currencies, DOM.convert_to_dropdown);
}

async function displayDropdownItems(crypto_list, DOM_node) {
  // loop through crypto_list and create a new option element for each items in the list
  let dropdown_items = crypto_list.map((crypto, index) => {
    // conditionally set select attribute
    let html = `<option value=${crypto}> ${crypto}</option>`;

    return html;
  });

  // add created dropdown to the DOM
  DOM_node.insertAdjacentHTML("beforeend", dropdown_items);
}

// fetch and return data from api
async function fetchData(url) {
  const api_url = url;

  const response = await fetch(api_url, {
    headers: {
      "x-rapidapi-key": "8267f7a4e0mshf69609913b1eb22p11bd12jsn710ca9ddccf3",
    },
  });

  const data = await response.json();

  return data;
}
