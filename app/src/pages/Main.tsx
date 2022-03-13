import React, { useState } from 'react';

import { Button, Card, Input, Page } from '@tiendanube/components';

import { copyToClipboard, getSessionToken, getStoreInfo } from '../libs/nexo/helpers';
import nexo from '../nexoClient';
import { useHistory } from 'react-router';

import axios from '../axios';

function Main() {
    const { push } = useHistory();
    const [token, setToken] = useState('');
    const [copy, setCopy] = useState('');
    const [storeInfo, setStoreInfo] = useState({});
    const [privateInfo, setPrivateInfo] = useState({});

    const handleGetToken = async () => {
        const sessionToken = await getSessionToken(nexo);
        setToken(sessionToken);
    }

    const handleGoToSubpage = () => {
        push('/subpage');
    }

    const handleGetStoreInfo = async () => {
        const infoStore = await getStoreInfo(nexo);
        setStoreInfo(infoStore);
    }

    const handleChangeCopy = (event: Record<'name' | 'value', string>) => {
        setCopy(event.value);
    }

    const handleCopyToClipBoard = () => {
        copyToClipboard(nexo, copy);
    }

    const handleGetPrivateInfo = async () => {
        const { data } = await axios.get('/secret');
        setPrivateInfo(data);
    }

    const handleGoToProducts = () => {
        push('/products');
    }

    return (
        <Page title='Workshop Nexo'>
            <Card title='Info Store'>
                <Button onClick={handleGetStoreInfo}>Get info store</Button>
                <Code>{printJson(storeInfo)}</Code>
            </Card>

            <Card title='Navegate'>
                <Button onClick={handleGoToSubpage}>Go to sub page</Button>
            </Card>

            <Card title='Copy to clipboard'>
                <Input name='copy' value={copy} onChange={handleChangeCopy} />
                <br />
                <Button onClick={handleCopyToClipBoard}>Copy</Button>
            </Card>

            <Card title='Generate Token'>
                <Button onClick={handleGetToken}>Get Token</Button>
                <Code>{token}</Code>
            </Card>

            <Card title='Get private info'>
                <Button onClick={handleGetPrivateInfo}>Request</Button>
                <Code>{printJson(privateInfo)}</Code>
            </Card>


            <Card title='Product list'>
                <Button onClick={handleGoToProducts}>Go to products</Button>
            </Card>
        </Page>
    )
}

function printJson(object: {}) {
    return Object.values(object).length > 0 ? JSON.stringify(object, null, 2) : ''
}

function Code({ children }: { children: React.ReactNode }) {
    return <>
        <br />
        <br />
        <div style={{ fontSize: '11px', wordWrap: 'break-word' }}>
            <code>{children}</code>
        </div>
    </>
}

export default Main;