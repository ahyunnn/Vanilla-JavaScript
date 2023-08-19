const main = document.getElementById("main");
const addUserBtn = document.querySelector(".add-user");
const doubleBtn = document.querySelector(".double");
const showMillionairesBtn = document.querySelector(".show-millionaires");
const sortBtn = document.querySelector(".sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// ✅ Fetch random user and add money : api를 통해 랜덤 이름, 자산 불러오기
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

// ✅ Add new obj to data arr : 데이터 배열에 새로운 객체 추가
function addData(obj) {
  data.push(obj);

  updateDOM();
}

// ✅ Update DOM (forEach 메서드 사용)
// 계속 DOM을 새롭게 갱신해주는 함수
// 매개변수를 아래와 같이 쓰면 인자가 전달되지 않았을 때 해당 변수를 쓰겠다는 뜻!
function updateDOM(providedData = data) {
  // Clear main div
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

// ✅ Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
// 돈 단위로 보일 수 있도록 수정
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// ✅ Double Money (map 메서드 사용)
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
}

// ✅ Sort users by richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}

// Filter only millionaires
function showMillionaires() {
  data = data.filter((user) => user.money > 1000000);

  updateDOM();
}

// ✅ Event listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", showMillionaires);
