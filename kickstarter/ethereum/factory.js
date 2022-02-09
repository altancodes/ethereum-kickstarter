import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    "0xD1da24b8096245bAac795f0959af16e122a05c8f"
);

export default instance;