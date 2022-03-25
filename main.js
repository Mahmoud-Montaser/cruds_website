let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");

// Calc Price
function getTotal() {
  if (price.value != "") {
    let additionalNumbers = +price.value + +taxes.value + +ads.value;
    let result = additionalNumbers - Number(discount.value);
    total.innerHTML = result;
    total.style.backgroundColor = "rgb(53, 112, 61)";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "rgb(214, 73, 73)";
  }
}
// create product
let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

create.onclick = function () {
  let newPro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    category: category.value,
    count: count.value,
  };
  if (newPro.count > 1) {
    for (let i = 0; i < newPro.count; i++) {
      dataPro.push(newPro);
    }
  } else {
    dataPro.push(newPro);
  }
  // add array in localstorage
  localStorage.setItem("product", JSON.stringify(dataPro));
  showData();
  clearData();
};

// clear data

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  category.value = "";
  total.innerHTML = "";
  total.style.backgroundColor = "rgb(214, 73, 73)";
}

// read Data

function showData() {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `   
     <tr>
        <td>${i + 1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>`;
  }
  let tbody = document.getElementById("tbody");
  tbody.innerHTML = table;
  let deleteAll = document.getElementById("deleteAll");
  if (dataPro.length > 0) {
    deleteAll.innerHTML = `
      <button onclick="deleteAll()" class="delete-all-btn">delete All</button>
      `;
  } else {
    deleteAll.innerHTML = "";
  }
}
showData();

// delete

function deleteData(index) {
  dataPro.splice(index, 1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}

function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}
