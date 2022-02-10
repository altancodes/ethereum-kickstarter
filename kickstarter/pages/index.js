import React, {Component} from 'react';
import { Card, Button } from "semantic-ui-react";
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import 'semantic-ui-css/semantic.min.css'

// Functional Component
// export default () => {
//     return (
//         <h1> Welcome to the new campaign page! </h1>
//     )
// }


class CampaignIndex extends Component {
   // For static functions, we don't have to create an instance
   static async getInitialProps () {
    const campaigns = await factory.methods.getDeployedCampaign().call();
    return {campaigns};
   }

   renderCampaigns() {
       // Iterate over the list of campaigns
       // Fluid = true causes our cards to stretch from the left side to the right side
       const items = this.props.campaigns.map(address => {
           return {
               header: address,
               description: <a>View Campaign</a>,
               fluid: true
           };
       });

       return <Card.Group items={items}/>;
   }

   render() {
       return(
       <Layout>
       <div>
           <link rel="stylesheet" type="text/css" href="semantic/dist/semantic.min.css"/>
            <script
            src="https://code.jquery.com/jquery-3.1.1.min.js"
            integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
            crossorigin="anonymous"></script>
            <script src="semantic/dist/semantic.min.js"></script>
            <h3>Open Campaigns</h3>
           {this.renderCampaigns()}
           <Button
            content="Create Campaign"
            icon="add circle"
            primary={true}
            labelPosition="left"
            />
        </div>
        </Layout>);
   }
}

export default CampaignIndex;