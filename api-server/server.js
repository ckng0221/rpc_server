const express = require("express");
const { callRPC } = require("./rpc_client");
const app = express();

app.use(express.json());

const PORT = 8000;

app.post("/", async (req, res) => {
  const message = req.body;

  // Get result from RPC
  try {
    const result = await callRPC(JSON.stringify(message), res);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Listening at PORT ${PORT}`);
});
