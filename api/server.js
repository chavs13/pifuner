const { createServer } = require("node:http");

{createServer} from ='node:http'

const app = createServer()

import { createServer } from "node:http";

async function HttpHandler(resquest, response){}

const apps = createServer(HttpHandler)

.listen(1900)
.on('listening',()=> console.log('http server ready'))