import React from 'react';
import { useHistory } from 'react-router';

import { Page } from '@tiendanube/components';


function Subpage() {
    const { push } = useHistory();
    
    const handleGoToMain = () => {
        push('/');
    }
    return (
        <Page title='Subpage' headerNavigation={{ onClick: handleGoToMain }}>
            <img alt="cat" src='http://placekitten.com/200/300' />
        </Page>
    )
}

export default Subpage;