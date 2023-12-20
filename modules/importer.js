
//Import modules -------------------------------------------
const xrpl = require("@transia/xrpl")
const { seed, isFunded, network } = require('../config.json');


//set up seed -------------------------------------------
const wallet = xrpl.Wallet.fromSeed(seed)
const keypair = xrpl.deriveKeypair(seed)


// Wrap code in an async function so we can use await -------------------------------------------
async function importer(blob) {

  // Define the network client--------------------------------------------------------------------
  if(network == "main" ){
    global.c = "wss://xahau.network/"
  }
  if(network == "test" ){
    global.c = "wss://xahau-test.net"
  }
 
  const client = new xrpl.Client(c)
  await client.connect()
  console.log('Starting import to Xahau')


  const txJson = {
    "TransactionType": "Import",
    "NetworkID": 21337,
    "SigningPubKey": keypair.publicKey,
    "Blob": blob,
    "Account": wallet.address,
  }

  isFunded ? txJson.Fee = "110" : txJson.Fee = "0"
  isFunded ? console.log('Working with funded account') : txJson.Sequence = 0
  network == 'main' ? console.log('using mainnet account') : txJson.NetworkID = 21338

  //console.log(txJson)


  const prepared = await client.autofill(txJson)
  const max_ledger = prepared.LastLedgerSequence
  //console.log("Prepared transaction instructions:", prepared)
  //console.log("Transaction cost:", xrpl.dropsToXrp(prepared.Fee), "XRP")
  //console.log("Transaction expires after ledger:", max_ledger)


  // Sign prepared instructions ------------------------------------------------
  const signed = wallet.sign(prepared)
  //console.log("Identifying hash:", signed.hash)
  //console.log("Signed blob:", signed.tx_blob)

  // Submit signed blob --------------------------------------------------------
  const tx = await client.submitAndWait(signed.tx_blob)

  // Check transaction results -------------------------------------------------
  console.log("Transaction result:", tx.result.meta.TransactionResult)

  if (tx.result.meta.TransactionResult == "tesSUCCESS") {

    if(network == 'main'){
      console.log(`Import transaction succeeded: https://xahauexplorer.com/explorer/${signed.hash}`)
    }
    if(network == 'test'){
      console.log(`Import transaction succeeded: https://test.xahauexplorer.com/explorer/${signed.hash}`)
    }
  } else {
    throw `Error sending transaction: ${tx.result.meta.TransactionResult}`
  }
  console.log("Balance changes:", JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2))
  console.log("B2M Completed")



  client.disconnect()
  process.exit(0)

};

module.exports = importer; 
