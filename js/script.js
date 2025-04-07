const views = {
  crypto_converter_form: document.getElementById("crypto-converter-form"),

  amount_dropdown: document.getElementById("amount-dropdown"),

  convert_to_dropdown: document.getElementById("convert-to-dropdown"),
};

window.addEventListener("load", async () => {
  // get the list of crypto currencies
  let crypto_currencies = await getCryptoCurrencies();

  // display data from the API on the page
  renderView(crypto_currencies);
});

// get a list of all crypto currencies
async function getCryptoCurrencies() {
  let url = `${CONFIG.baseURL}/list?access_key=${CONFIG.apiKey}`;
  const crypto_currencies = await fetchData(url);

  return Object.entries(crypto_currencies.crypto);
}

// display dynamic data in DOM
function renderView(crypto_list) {
  // display crypto currencies for amount dropdown field in the converter form
  displayDropdownItems(crypto_list, views.amount_dropdown);

  // display crypto currencies for convert to dropdown field in the converter form
  displayDropdownItems(crypto_list, views.convert_to_dropdown);
}

async function displayDropdownItems(crypto_list, DOM_node) {
  // loop through crypto_list and create a new option element for each items in the list
  let dropdown_items = crypto_list.map((crypto, index) => {
    // check if crypto list is being displayed in the amount dropdown element
    let isDisplayingAmountDropdown =
      index == 2 && DOM_node.id === "amount-dropdown";

    // conditionally set select attribute
    let html = isDisplayingAmountDropdown
      ? `<option value=${crypto[1].symbol} selected> ${crypto[1].symbol}</option>`
      : `<option value=${crypto[1].symbol}> ${crypto[1].symbol}</option>`;

    return html;
  });

  // add created dropdown to the DOM
  DOM_node.insertAdjacentHTML("beforeend", dropdown_items);
}

// fetch and return data from api
async function fetchData(url) {
  const api_url = url;

  const response = await fetch(url);
  const data = await response.json();

  return data;
}
