const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require("../ethereum/build/Campaign.json");
const { compile } = require("solc");
const { isStringObject } = require("util/types");

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(
    async () => {
        accounts = await web3.eth.getAccounts();

        // Deploy the factory contract to the Ganache Local CLI
        factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({data: compiledFactory.bytecode})
        .send({from: accounts[0], gas:"1000000"});

        await factory.methods.createCampaign('100').send({
            from: accounts[0],
            gas: '1000000'
        });

        [campaignAddress] = await factory.methods.getDeployedCampaign().call();
        campaign = await new web3.eth.Contract(
            JSON.parse(compiledCampaign.interface),
            campaignAddress
        )
    }
)

describe('Campaings', () => {
    it('deploys a factory and a campaign', () => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address); 
    });

    it('marks caller as the campaign manager', async () => {
        // Retrieve the variable
        const manager = await factory.methods.manager().call();

        // Compare it against the manager
        assert.equal(accounts[0], manager);
    })

    it('allows people to contribute money and marks them as approvers', async () => {
        const participant = accounts[1];
        await campaign.methods.contribute().send({
            from: participant,
            value:'100000'
        });

        const approver = await campaign.methods.approvers(participant).call();
        assert.equal(true, approver);
    })

    it('requires minimum contribution of 100 wei', async () => {
        try {
            const participant = accounts[1];
            await campaign.methods.contribute().send({
                from: participant,
                value:'100000'
            });
            assert(false);
        } catch (err) {
            assert(err);
        }
    })

    it('allows a manager to make a payment request', async () => {
        const manager = await factory.methods.manager().call();
        await campaign.methods
        .createRequest('Buy batteries', '100', accounts[1])
        .send({
            from: accounts[0],
            gas: '1000000'
        });
        const request = await campaign.methods.requests(0).call();
        assert.equal(request.description, "Buy batteries");
    })

    it('process a request', async () => {
        await campaign.methods.contribute().send({
            from: accounts[0],
            value: web3.utils.toWei('10', 'ether')
        });

        await campaign.methods
        .createRequest('A', web3.utils.toWei('5', 'ether'), accounts[1])
        .send({
            from: accounts[0],
            gas: '1000000'
        });

        await campaign.methods
        .approveRequest(0).send({
            from: accounts[0],
            gas: '1000000'
        });

        await campaign.methods.finalizeRequest(0).send({
            from: accounts[0],
            gas: '1000000'
        });

        let balance = await web3.eth.getBalance(accounts[1]);
        balance = web3.utils.fromWei(balance, 'ether');
        balance = parseFloat(balance);

        console.log(balance);

        assert(balance > 104);

    })
});