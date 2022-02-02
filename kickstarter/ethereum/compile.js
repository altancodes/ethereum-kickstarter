const path = require("path"); 
const solc = require("solc"); // solidity compiler
const fs = require("fs-extra"); // filesystem


const buildPath = path.resolve(__dirname, 'build');

// Removes all the files within the build path
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');

// Extract all the contracts from the solidity compiler
const output = solc.compile(source, 1).contracts; 


// Checks to ensure that the buildPath exists
fs.ensureDirSync(buildPath);


console.log(output);
for (let contract in output) {
    // Write the contract JSON to the buildPath
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(":", "") + ".json"),
        output[contract]
    );
}