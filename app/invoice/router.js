const router = require("express").Router();
const controller = require("./controller");

router.get("/invoices/:order_id", controller.show);
router.put("/invoices/:order_id/payment", controller.pay);
// router.get("/invoices/:order_id/initiate-payment", controller.initiatePayment);
// router.post("/invoices/handle-midtrans", controller.handleMidtransNotification);

module.exports = router;
