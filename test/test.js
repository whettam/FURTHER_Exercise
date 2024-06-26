const email = inputData.email;
const phone = inputData.phone;

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^\+?[1-9]\d{1,14}$/;

const isEmailValid = emailRegex.test(email);
const isPhoneValid = phoneRegex.test(phone);

console.log("Email is: " + isEmailValid);

if (isEmailValid && isPhoneValid) {
  return { isValid: true, email: email, phone: phone, firstName: inputData.firstName, lastName: inputData.lastName };
} else {
  return { isValid: false, email: email, phone: phone, firstName: inputData.firstName, lastName: inputData.lastName };
}
