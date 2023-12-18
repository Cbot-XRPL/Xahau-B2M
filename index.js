// Import modules -------------------------------------------
const xrpl = require("@transia/xrpl")
const watcher = require('./modules/watcher');
const { seed } = require('./config.json');


//set up wallet -------------------------------------------
const wallet = xrpl.Wallet.fromSeed(seed)

//Main func -------------------------------------------
async function main() {

    //start watcher 
    console.log('Starting B2M Tool')
    watcher(wallet.address)

}

main()