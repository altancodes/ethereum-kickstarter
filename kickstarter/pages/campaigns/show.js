import React, {Component} from 'react';
import { Card, Grid } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';


class CampaignShow extends Component {
    static async getInitialProps(props) {
        const campaign = Campaign(props.query.address);
        const summary = await campaign.methods.getSummary().call();
        console.log(summary);
        return {
            minimumContribution: summary[0],
            balance: summary[1],
            requestsLength: summary[2],
            numberOfContributors: summary[3],
            manager: summary[4]
        };
    }
    renderCards() {
        const {
            minimumContribution,
            balance,
            requestsLength,
            numberOfContributors,
            manager
        } = this.props;

        const items = [
            {
                header: manager,
                meta: "Address of Manager",
                description: "The manager created this campaign and can create requests to withdraw money",
                style: {overflowWrap: "break-word"}
            },
            {
                header: minimumContribution,
                meta: "Minimum Contribution (wei)",
                description: "You must contribute at least this much wei to be a part of the campaign",
                style: {overflowWrap: "break-word"}
            },
            {
                header: requestsLength,
                meta: "Number of Requests",
                description: "A request tries to withdraw money from the account to pay for the vendors",
                style: {overflowWrap: "break-word"}
            }, 
            {
                header: numberOfContributors,
                meta: "Number of Approvers",
                description: "Number of people who have already donated to the campaign",
                style: {overflowWrap: "break-word"}
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: "Campaign Balance (ether)", 
                description: "The balance is how much money this campaign has",
                style: {overflowWrap: "break-word"}
            }
        ]

        return <Card.Group items={items} />;
    }
    render() {
        return (
            <Layout>
            <h3>Campaign Show</h3>
            <Grid>
                <Grid.Column width={10}>
                    {this.renderCards()}
                </Grid.Column>
                <Grid.Column width={6}>
                    <ContributeForm/>
                </Grid.Column>
            </Grid>
            </Layout>
        )
    }
}

export default CampaignShow;