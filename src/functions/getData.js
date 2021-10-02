/**
 * ajax funtion to return the local json data
 * @param {string} url
 * @returns HTML tag element
 */

// import fs from "fs/promises";
// import path from "path";

export default function getData(url) {
  let http = new XMLHttpRequest();
  http.open("GET", url, false);
  http.send(null);
  return http.responseText;
}

export const fetchData = (url) => {
  fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
};

// export const readJsonData = async (url) => {
//   const filePath = path.resolve(__dirname, url);
//   const data = await fs.readFile(filePath);
//   return data;
// };
