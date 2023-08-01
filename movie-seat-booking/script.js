// ✅ 필요한 요소 변수로 저장
// querySelector :
// querySelectorAll
// getElementById :
const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();

let ticketPrice = +movieSelect.value;

// ✅ Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// ✅ Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  // Local storage에 저장하기
  // 1. copy selected seats into arr
  // 2. map through array
  // 3. return a new array : seatIndex
  // 내가 선택한 값(selectedSeats)의 위치를 seats(not occupied된 자리)에서의 인덱스로 저장
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  // 로컬스토리지에 저장하기
  // JSON.stringify :
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// ✅ Get Data from Local Storage and Populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  // ✨ 선택한 자리 유지
  // 로컬스토리지에 저장된 selectedSeats 배열이 있으면
  // 전체 seats를 돌면서 selectedSeats에 포함된 인덱스 번호의 seat에 selected 클래스 추가
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  // ✨ 선택한 영화 유지
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// ✅ Movie Select event - 영화를 누르면 해당 영화가 선택되도록 하는 함수
movieSelect.addEventListener("click", (event) => {
  ticketPrice = +event.target.value;
  setMovieData(event.target.selectedIndex, event.target.value);
  updateSelectedCount();
});

// ✅ Seat click event;
// N/A 상태(not Occupied)의 좌석을 누르면 Selected로 클래스명 변경
// container태그에서 click이벤트로 일어나는 모든 것들
// classList :
// contains :
// toggle / add / remove :
// class명을 적을 때 두개를 쓰는 건 각각의 클래스 명인건가? <div class="seat occupied"></div>
container.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("seat") &&
    !event.target.classList.contains("occupied")
  ) {
    event.target.classList.toggle("selected");

    updateSelectedCount();
  }
});

// ✅ Initial count and total set
updateSelectedCount();
