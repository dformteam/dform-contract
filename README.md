# How to install

## Install dependencies
========================
```js
yarn install
```
## Deploy
===============

Every smart contract in NEAR has its [own associated account][NEAR accounts]. When you run `yarn dev`, your smart contract gets deployed to the live NEAR TestNet with a throwaway account. When you're ready to make it permanent, here's how.


Step 0: Install near-cli (optional)
-------------------------------------

[near-cli] is a command line interface (CLI) for interacting with the NEAR blockchain. It was installed to the local `node_modules` folder when you ran `yarn install`, but for best ergonomics you may want to install it globally:

    yarn install --global near-cli

Or, if you'd rather use the locally-installed version, you can prefix all `near` commands with `npx`

Ensure that it's installed with `near --version` (or `npx near --version`)


Step 1: Create an account for the contract
------------------------------------------

Each account on NEAR can have at most one contract deployed to it. If you've already created an account such as `your-name.testnet`, you can deploy your contract to `amm.your-name.testnet`. Assuming you've already created an account on [NEAR Wallet], here's how to create `amm.your-name.testnet`:

1. Authorize NEAR CLI, following the commands it gives you:

      near login

2. Create a subaccount (replace `YOUR-NAME` below with your actual account name):

      near create-account amm.YOUR-NAME.testnet --masterAccount YOUR-NAME.testnet


Step 2: set contract name in code
---------------------------------

Modify the line in `src/config.js` that sets the account name of the contract. Set it to the account id you used above.

    const CONTRACT_NAME = process.env.CONTRACT_NAME || 'amm.YOUR-NAME.testnet'


Step 3: deploy!
---------------

    yarn deploy or near deploy

As you can see in `package.json`, this does two things:

1. builds & deploys smart contract to NEAR TestNet
2. builds & deploys frontend code to GitHub using [gh-pages]. This will only work if the project already has a repository set up on GitHub. Feel free to modify the `deploy` script in `package.json` to deploy elsewhere.


## Troubleshooting

On Windows, if you're seeing an error containing `EPERM` it may be related to spaces in your path. Please see [this issue](https://github.com/zkat/npx/issues/209) for more details.


  [React]: https://reactjs.org/
  [create-near-app]: https://github.com/near/create-near-app
  [Node.js]: https://nodejs.org/en/download/package-manager/
  [jest]: https://jestjs.io/
  [NEAR accounts]: https://docs.near.org/docs/concepts/account
  [NEAR Wallet]: https://wallet.testnet.near.org/
  [near-cli]: https://github.com/near/near-cli
  [gh-pages]: https://github.com/tschaub/gh-pages

# Code structure

```js
/** 
* Vector ch???a c??c tr???n ?????u ??ang ch??? 
* PersistentVector ~ List ~ Danh s??ch li??n k???t ????n/????i
**/
const waitingMatch = new PersistentVector<Match>("w");
```

```js
/**
* Vector ch???a c??c tr???n ?????u ??ang di???n ra
* Khi 1 tr???n ?????u ??ang ??? waiting m?? ????? ng?????i ch??i, tr???n ?????u s??? chuy???n sang tr???ng th??i running
* Tr??nh t???: Remove match from waitingMatch Vertor -> Insert to RunningMatch Vector
**/
const runningMatch = new PersistentVector<Match>("r");
```

```js
/**
* Vector ch???a c??c tr???n ?????u ???? di???n ra
* Khi 1 tr???n ?????u ??ang ??? running m?? ???? c?? k???t qu???, d??? li???u tr???n ?????u s??? ???????c l??u v??o finishedMatch
* Tr??nh t???: Remove match from runningMatch vector -> Insert to FinishedMatch Vector
**/
const finishedMatch = new PersistentVector<Match>("f");
```

```js
/**
* Vector ch???a l???ch s??? thi ?????u c???a ng?????i ch??i
* Khi runningMatch ho??n th??nh, tr???n ?????u s??? k???t th??c
* H??? th???ng s??? ghi nh???n ng?????i th???ng/ thua v?? l??u v??o danh s??ch l???ch s??? c???a ng?????i ch??i
**/
const historyMatch = new PersistentMap<String, PersistentVector<History>>("h")
```