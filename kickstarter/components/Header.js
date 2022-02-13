import React from 'react';
import {Menu} from 'semantic-ui-react';

export default () => {
    return (
        <Menu style={{ marginTop: '15px'}}>
            <Menu.Menu position="left">
                <Menu.Item>
                    CrowdCoin
                </Menu.Item>
            </Menu.Menu>
            <Menu.Menu position="right">
                <Menu.Item>
                    Campaigns
                </Menu.Item>

                <Menu.Item>
                    +
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    )
}