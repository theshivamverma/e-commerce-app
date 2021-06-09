import axios from "axios"

export async function validateUsername(username){
    if (username !== "") {
      let res = /^[a-zA-Z0-9]+$/.test(username);
      if (res) {
        let result = await usernameAvailable(username)
        if (result) {
          return ""
        } else {
          return "Username already taken";
        }
      } else {
        return "only letters and numbers allowed"
      }
    } else {
      return "username is required"
    }
}

async function usernameAvailable(username){
    try {
        const { status, data } = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/auth/username-check`, {
            username
        })
        if(status === 200 && data.success){
            return true
        }else{
            return false
        }
    } catch (error) {
        console.log(error)
        return false
    }
}

function checkEmailFormat(email) {
  const res = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    String(email).toLowerCase()
  );
  return res;
}

export async function validateEmail(email){
    if (email !== "") {
      if (checkEmailFormat(email)) {
        let result = await emailAvailable(email)
        if (result) {
          return ""
        } else {
          return "Email already exists";
        }
      } else {
        return "Enter a valid email"
      }
    } else {
      return "Email is required"
    }
}

async function emailAvailable(email) {
  try {
    const { status, data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/auth/email-check`,
      {
        email,
      }
    );
    if (status === 200 && data.success) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

export function validateName(name){
    if (name !== "") {
      let res = /^[a-zA-Z ]+$/.test(name);
      if (res) {
        return ""
      } else {
        return "Numbers not allowed for name"
      }
    } else {
      return "Name is required"
    }
}

export function validatePassword(password){
    if (password !== "") {
      if (password.length < 6) {
        return "Password should be atleast 6 digits long"
      } else {
        let res = /[0-9]/.test(password);
        if (res) {
          return ""
        } else {
          return "passowrd must contain a number"
        }
      }
    } else {
      return "Password is required"
    }
}