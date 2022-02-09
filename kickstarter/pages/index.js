import React, {Component} from 'react';
import factory from '../ethereum/factory';

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

   render() {
       return <div>{this.props.campaigns[0]}</div>
   }
}

export default CampaignIndex;