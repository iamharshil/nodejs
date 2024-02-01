import Fastify from "fastify";
import responseTime from "response-time";
import middie from '@fastify/middie';

import database from "./utils/database.js";
import Customer from "./models/customer.js";
import Order from "./models/order.js";

const fastify = Fastify({
	logger: true
});


// config
fastify.register(middie);
fastify.register(responseTime);

fastify.addHook('onRequest', async (request, reply) => {
  console.log('onRequest');
});


fastify.get("/", async (req,reply) => {
	return { hello: "world" };
});

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
    console.log(`Server is listening on ${address}`);
})
