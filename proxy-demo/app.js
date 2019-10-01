const express = require("express");
const app = express();
const axios = require("axios");
app.get("/api/autocomplete/:query", (r, s) => {
  const endpoint = `http://autocomplete.geocoder.api.here.com/6.2/suggest.json?app_id=4IKCkjwaZesTZW0WqFrA&app_code=CIfJLMF_at6bUUK09tHyAg&query=${r.params.query}&beginHighlight=<b>&endHighlight=</b>`;
  axios({
    method: "GET",
    url: endpoint,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      s.send(JSON.stringify(response.data));
    })
    .catch(error => {
      s.send(JSON.stringify(error), 400);
    });
  //s.send("hello world");
});
app.listen(3001, () => {
  console.log("app is running on port");
});
