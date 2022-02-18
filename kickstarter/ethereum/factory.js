import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    "0x08486F0e3e66BF895C36EaF68E7BBC4Ca81ec863"
);

export default instance;