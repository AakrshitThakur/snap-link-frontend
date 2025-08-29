import type {
  SignupUser,
  SignupErrors,
  SigninUser,
  SigninErrors,
} from "../custom-types/auth.type";

// the previous character class i.e. [a-zA-Z0-9_] must repeat at least 3 times and at most 20
const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

// [^\s@] = any character except whitespace and @
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// (?= ... ) is a lookahead.
// It means: "there must be … somewhere in the string."
// .*[A-Z] = any characters, followed by an uppercase letter (A–Z).
// 👉 This ensures the string has at least one uppercase letter.
const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,128}$/;

// signup validation
function validateSignup(form: SignupUser): SignupErrors | boolean {
  let gotErrors = false;
  const errors: SignupErrors = {
    username: "",
    email: "",
    password: "",
    confirm: "",
  };

  // validations
  if (!usernameRegex.test(form.username)) {
    errors.username = "Invalid username format";
    gotErrors = true;
  }
  if (!emailRegex.test(form.email)) {
    errors.email = "Invalid email format";
    gotErrors = true;
  }
  if (!passwordRegex.test(form.password)) {
    errors.password = `Password must be at least 8 characters, contain \
    one uppercase and one number`;
    gotErrors = true;
  }
  if (!passwordRegex.test(form.confirm)) {
    errors.confirm = `Password must be at least 8 characters, contain \
    one uppercase, one special character and one number`;
    gotErrors = true;
  } else {
    if (form.password !== form.confirm) {
      errors.confirm = "Passwords you entered do not match";
      gotErrors = true;
    }
  }

  // return all the errors
  if (!gotErrors) return false;
  return errors;
}

// signin validation
function validateSignin(form: SigninUser): SigninErrors | boolean {
  let gotErrors = false;
  const errors: SigninErrors = {
    email: "",
    password: "",
  };

  // validations
  if (!emailRegex.test(form.email)) {
    errors.email = "Invalid email format";
    gotErrors = true;
  }
  if (!passwordRegex.test(form.password)) {
    errors.password = `Password must be at least 8 characters, contain \
    one uppercase and one number`;
    gotErrors = true;
  }

  // return all the errors
  if (!gotErrors) return false;
  return errors;
}

export { validateSignup, validateSignin };
