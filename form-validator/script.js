// Document.getElementById("") : 주어진 문자열과 일치하는 id속성을 가진 요소를 찾아내고, 이를 나타내는 element 객체를 반환
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// ✅ Show input error message
function showError(input, message) {
  const formControl = input.parentElement; // input태그의 부모 태그인 div태그 지칭
  formControl.className = "form-control error"; // className : 특정 엘리먼트 클래스 속성의 값을 가져오거나 설정
  const small = formControl.querySelector("small"); // querySelector : 제공한 선택자 또는 선택자 뭉치와 일치하는 문서 내 첫 번째  element 반환
  small.innerText = message; // innerText : 요소와 그 자손의 렌더링 된 텍스트 콘텐츠
}

// ✅ Show success outline
function showSuccess(input) {
  const formControl = input.parentElement; // input태그의 부모 태그인 div태그 지칭
  formControl.className = "form-control success";
}

// ✅ Check email is valid : 이메일 형식인지 확인하는 정규식
function checkEmail(input) {
  const regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
  if (regex.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}

// ✅ Check required fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// ✅ Get Fieldname : 첫 글자만 대문자로 만들기 위해 함수를 따로 빼서 사용
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// ✅ Check input length : input값 길이 체크
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

// Check passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match");
  }
}
// ✅ Event listeners
// EventTarget.addEventListener() : 지정한 유형의 이벤트를 대상이 수신할 때마다 호출할 함수를 설정
// 구문 : addEventListener(type, listener)
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Event.preventDefault() : 해당 이벤트에 대한 기본 동작을 실행하지 않도록 차단 - submit 기능 차단

  checkRequired([username, email, password, password2]);

  checkLength(username, 3, 15);
  checkLength(password, 6, 25);

  checkEmail(email);

  checkPasswordsMatch(password, password2);
  // ❌
  // username.value가 존재하지 않으면 showError함수(Username is required라는 에러메세지가 뜨도록 하는 기능) 실행
  // if (username.value === "") {
  //   showError(username, "Username is required");
  // } else {
  //   showSuccess(username);
  // }

  // if (email.value === "") {
  //   showError(email, "Email is required");
  // } else if (!isValidEmail(email.value)) {
  //   showError(email, "Email is not valid");
  // } else {
  //   showSuccess(email);
  // }

  // if (password.value === "") {
  //   showError(password, "Password is required");
  // } else {
  //   showSuccess(password);
  // }

  // if (password2.value === "") {
  //   showError(password2, "Password is required again");
  // } else {
  //   showSuccess(password2);
  // }
});
