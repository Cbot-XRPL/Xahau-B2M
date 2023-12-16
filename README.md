# Xahau-B2M

Node.js tool to burn to mint XRP from mainnet to the Xahau sidechain. 

This tool will utilize your current XRP address on the Xahau sidechain. You will need an account seed to use this tool. This tool is designed to be used locally with you preferred code editor with node.js support. You should be familer with XRPL code and the Xahau sidechain to use this tool. See links below to learn more about the XRPL, Xahau, B2M, and Xpop.

## Set up

Start by downloading this repo. After download open with your preferred code editor.
Once your in the file open a terminal in the root of this repo. Download all dependencies by usting the command:
```
npm install
```
Go to the `config.json` file and add your account seed, amount of XRP to B2M, and indicate true or false if your address is funded on xahau on not. If you already have XAH in you account on Xahau use true if you have not funded your account on Xahau use false. Its advised not to do large B2M when you first use this tool.

## Run Program
Once you have set up your `config.json` file you are ready to B2M. To run this tool use the command:
```
npm start
```

## Links
- Learn about the XRPL: https://xrpl.org/docs.html
- Learn about Xahau: https://docs.xahau.network/
- Explore B2M indexer: https://xpop.zerp.network/



## Disclaimer
USE THIS TOOL AT YOUR OWN RISK. IT IS POSSIBLE TO LOSE FUNDS DURING A B2M PROCESS IF YOU STOP THIS TOOL BEFORE IT IMPORTS YOUR XRP TO XAHAU OR YOU HAVE AN UNEXPECTED ERROR. WE DO NOT ACCEPT ANY LIABILITY FOR LOST FUNDS. During the B2M process the program will console log an xpop source. If burn xrp but fail to mint on xahau vist the xpop source. The xpop file can be used to import your burned xrp if you stop this tool before it imports to Xahau or you encounter an unexpected error. If you do not receive an xpop source or lose it you may be able to use the B2M indexer link listed above to find your missing xpop.
