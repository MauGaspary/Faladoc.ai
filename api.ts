import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const apiHandler = async (
  url: string,
  method: string,
  contentType: string,
  body?: string
) => {
  let token = "";
  AsyncStorage.getItem('key', (err, value) => {
    if (err) {
        console.log(err)
    } else {
        token = value || "";
    }
})
  const options: {
    method: string;
    headers: {
      Authorization: string;
      "Content-Type": string;
    };
    body?: string;
  } = {
    method: method,
    headers: {
      Authorization: token,
      "Content-Type": contentType,
    },
  };

  if (method != "GET") {
    options.body = body;
  }

  const raw = await axios(url, options);

  if (raw.status === 401) {
    sessionStorage.removeItem("token");
    window.location.href = "/";
    window.location.reload();
  }

  return raw;
};