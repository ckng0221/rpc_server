[![API Server CI](https://github.com/ckng0221/rpc_server/actions/workflows/api-server-ci.yml/badge.svg)](https://github.com/ckng0221/rpc_server/actions/workflows/api-server-ci.yml)

# RPC Server
A Remote Procedure Call (RPC) server, used as a POC for sending request to API server on ExpressJs, while the machine learning model processing at another server using Python.

There are 2 servers: `api-server` and `ml-server`. 
The API server in ExpressJS, used to host the REST API endpoint. 
The ML (Machine Learning) server (as RPC server) consists of a classification model, which can perform binary classification.

Upon receiving request from the API server, the server will perform a RPC, to send the message to the ML server via the `rpc_queue`.
The ML server will take the message as the input for the ML model, and send the classification result to a pre-defined callback queue.
The API server will consume again the message with result in the callback queue. After verifying the `correlation_id`, the API server will return the result to the client.

---
To install:

```bash
# api-server/
npm install
```

```bash
# ml-server
pip install -r requirements.txt
```

To run: 

```bash
# api-server/
npm start
```

```bash
# ml-server/s
python rpc_server.pys
```
