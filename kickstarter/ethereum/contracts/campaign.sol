pragma solidity ^0.4.17;

contract CampaignFactory {
    /* 
    CampaignFactory contract that can create Campaign contracts
    */
    // Stores the deployed campaigns for all the Campaign contracts
    address[] deployedCampaigns;
    address public manager;


    function createCampaign(uint minimumContribution) public {
        /* Creates a Campaign contract with minimum contribution  value */
        // Assigns the manager to be the address that created the Campaign contract
        manager = msg.sender;

        // Creates and deploys a new campaign with the manager and minimum contribution
        address newCampaign = new Campaign(manager, minimumContribution);

        // Track all the campaigns that are created by the CampaignFactors
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaign() public view returns(address[]) {
        /* Returns the list of addresses that have campaigns */ 
        return deployedCampaigns;
    }
}


contract Campaign {

    // Struct definition
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    address public manager;
    uint public minimumContribution;

    mapping(address => bool) public approvers;
    uint numberOfContributors;
    Request[] public requests;
    

    modifier restricted() {
        /* Restricted modifier for the manager*/ 
        require(msg.sender == manager);
        _;
    }

    function Campaign (address manager, uint minimum) public {
        /* Constructor function that helps */
        manager = manager;
        minimumContribution = minimum;
        numberOfContributors = 0;
    }

    function contribute() public payable {
        // Requires the value of the contribution to be greater than the minimum contribution
        require(msg.value > minimumContribution);

        // Receive the address of the sender
        address sender = msg.sender;

        // Push the address to the approvers
        approvers[sender] = true;

        // Increase the number of contributors 
        numberOfContributors += 1;
    }

    function createRequest(string description, uint value, address recipient) public {
        // Requires the manager to call this function 
       Request memory newRequest = Request({
           description: description,
           value: value,
           recipient: recipient,
           complete: false, 
           approvalCount: 0
       });
       requests.push(newRequest);
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];
        // Requires that the sender is in the approvers mapping
        require(approvers[msg.sender]);
        // Requires that the sender did not vote on this request
        require(!requests[index].approvals[msg.sender]);

        // Approve 
        requests[index].approvalCount++;
        requests[index].approvals[msg.sender] = true;
    }

    function finalizeRequest(uint index) public {
        Request storage request = requests[index];
        // This is only called by the manager

        // Check that the request is not complete
        require(!request.complete);

        // Check that there is majority gained
        require(request.approvalCount > (numberOfContributors / 2));

        // Send the money to the vendor
        request.recipient.transfer(request.value);

        // Given that it is not complete, then set the complete flag to true
        request.complete = true;
    }
}