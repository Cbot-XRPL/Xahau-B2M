# Xahau-B2M

A node.js tool to burn to mint XRP from mainnet to the Xahau sidechain. 

This tool will utilize your current XRP address to create an account on the Xahau sidechain. You will need an account seed to use this tool. This tool is desgined to be used locally using you perfered code editor with node.js support. You should be familer with XRPL code and the Xahau sidechain to use this tool. See links below to learn more about the XRPL, Xahau, B2M, and Xpop.

## Set up

Start by downloading this repo. After download open with your perffered code editor.
Once your in the file open a terminal. Download all dependencys by usting the command:
```
npm install
```
Go to the `config.json` file and add your account seed, amount of XRP to B2M, and indicate true or false if your address is funded on xahau on not. If you already have XAH in you account on Xahau use true if you have not funded you account on Xahau use false. Its advised not to do large B2M when you first use this tool.

## Run Program
Once you have set up your `config.json` file you are ready to B2M. To run this tool use the command:
```
npm start
```

## Disclaimer
USE AT YOUR OWN RISK IT IS POSSIBLE TO LOSE FUNDS DURING A B2M PROCESS. WE DO NOT ACCEPT LIABILITY FOR ANY LOST FUNDS. During the B2M process the program will log an xpop source. If burn xrp but fail to mint on xahau you can reference.
