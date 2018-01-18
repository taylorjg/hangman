export const api = {
  chooseWord: () =>
    fetch("/api/chooseWord", { method: "POST" })
      .then(res => res.json())
};
