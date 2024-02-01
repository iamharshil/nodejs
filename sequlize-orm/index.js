import sequelize from "./utils/database.js";
import Customer from "./models/customer.js";
import Order from "./models/order.js";

Customer.hasMany(Order);

let customerId = null;

sequelize
    .sync({ force: true })
    .then(result => {
        return Customer.create({ name: "John Doe", email: "johndoe@gmail.com" });
    })
    .then(customer => {
        customerId = customer.id; 
        console.log("First customer", customer);
        return customer.createOrder({ total: 300 });
    })
    .then(order => {
        console.log("Order", order);
        return Order.findAll({ where: customerId });
    })
    .then(orders => {
        console.log("Orders", orders);
    })
    .catch(err => {
        console.error(err);
    });
