module.exports = (router) => {

  router.get("https://api.thecatapi.com/api/images/get?format=json&results_per_page=10&size=small&type=png", (req, res) => {
    if (res) {
      console.log(res);
      // build out
    }
  });

  return router;
};
