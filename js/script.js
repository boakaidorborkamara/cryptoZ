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
    // extract form data
    let form_data = new FormData(DOM.crypto_converter_form);

    // Form values
    let convert_from = form_data.get("convert_from");
    let amount = form_data.get("amount");
    let convert_to = form_data.get("convert_to");
    let date = form_data.get("date");

    console.log({
      convert_from,
      amount,
      convert_to,
      date,
    });
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
  try {
    const api_url = url;

    const response = await fetch(api_url, {
      headers: {
        "x-rapidapi-key": "8267f7a4e0mshf69609913b1eb22p11bd12jsn710ca9ddccf3",
      },
    });

    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}
