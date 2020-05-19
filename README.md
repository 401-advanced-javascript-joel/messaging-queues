# Lab 19 - Message Queues

For this lab, you should have four independent applications running on terminal and communicating with one another. These applications will be:

- The message queue server (socket server)
- The delivery API server (socket client, express server)
- Vendor 01 (socket client)
- Vendor 02 (socket client)

The delivery API server should expose an HTTP POST route of the format /delivery/:vendor/:order-id. This route will not have any body parameters, and when triggered using Postman or a similar service, it should tell the appropriate vendor that an order was delivered. If that vendor happens to be disconnected, the message should be saved and sent when the vendor is back online

## Author: Joel Watson

### Links and Resources

- [PR Lab 19](https://github.com/401-advanced-javascript-joel/messaging-queues/pull/1)
- No Testing

### Setup

- `npm install`

### How to run

- `npm start`

### UML

![UML 19](https://raw.githubusercontent.com/401-advanced-javascript-joel/messaging-queues/master/assets/lab-19-uml.jpg)
