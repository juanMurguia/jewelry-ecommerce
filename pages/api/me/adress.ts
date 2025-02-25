import * as methods from "micro-method-router";

export default methods({
  async get(req, res) {
    res.send("soy GET me/adress");
  },
  async patch(req, res) {
    res.send("soy PATCH me/adress");
  },
});
