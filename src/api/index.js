export const api = {
  chooseWord: () =>
    fetch(
      "/api/chooseWord",
      {
        method: "GET",
        headers: new Headers({
          "accept": "application/json"
        })
      })
      .then(res => res.json())
};
