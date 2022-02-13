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
            <h3>Open Campaigns</h3>
           <Button
            content="Create Campaign"
            icon="add circle"
            primary={true}
            labelPosition="left"
            floated="right"
            />
            {this.renderCampaigns()}
        </div>
        </Layout>);
   }
}

export default CampaignIndex;