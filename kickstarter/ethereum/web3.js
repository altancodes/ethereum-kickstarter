import Web3 from "web3";


// Whenever the next server is compiling our code, WINDOW is not available
// Therefore, we can write easy checks to see whether we are running on the server or browser level

let web3;

const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/77fe33c2078a4c1a97ca73179d79b13a'
)
web3 = new Web3(provider);


if (typeof window !== "undefined") {
    // We are in the browser and metamask is running.
    window.ethereum.request({method: "eth_requestAccounts"});
    web3 = new Web3(window.ethereum);
} else {
    // We are on the server *OR* the user is not running metamask
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/77fe33c2078a4c1a97ca73179d79b13a'
    )
    web3 = new Web3(provider);
}
 
export default web3;
