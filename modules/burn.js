const xrpl = require('xrpl')
const { seed, burnAmount, network } = require('../config.json');


// Define wallet --------------------------------------------------------------------
const wallet = xrpl.Wallet.fromSeed(seed)

// Switch xrp burn amount to drops --------------------------------------------------------------------
let fee = xrpl.xrpToDrops(burnAmount)

// Wrap code in an async function so we can use await-------------------------------------------
async function burn() {

  // Define the network client --------------------------------------------------------------------
if(network == "main" ){
  global.c = "wss://xrplcluster.com/"
}
if(network == "test" ){
  global.c = "wss://s.altnet.rippletest.net:51233"
}

  const client = new xrpl.Client(c)
  await client.connect();
  console.log("Starting XRP burn tx")

  // XRP burn TX ----------------------------------
  const tx = {
    "TransactionType": "AccountSet",
    "Account": wallet.address,
    "Fee": fee,
    "OperationLimit": 21337,
  }

  // Sign prepared instructions ------------------------------------------------
  const cst_prepared = await client.autofill(tx)
  const cst_signed = wallet.sign(cst_prepared)


  // Submit signed blob --------------------------------------------------------
  const cst_result = await client.submitAndWait(cst_signed.tx_blob)

  // Check transaction results -------------------------------------------------
  console.log(`Transaction result: ${cst_result.result.meta.TransactionResult}`)
  if (cst_result.result.meta.TransactionResult == "tesSUCCESS") {
    console.log(`Burn transaction succeeded: https://mainnet.xrpl.org/transactions/${cst_signed.hash}`)
  } else {
    throw `Error sending transaction: ${cst_result}`
  }
}

module.exports = burn;