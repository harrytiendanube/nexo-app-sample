import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { DataList, ImageItem, Page } from '@tiendanube/components';
import axios from '../axios';


function ProductList() {
    const { push } = useHistory();
    const [products, setProducts] = useState([]);

    const handleGoToMain = () => {
        push('/');
    }

    const getProducts = async () => {
        const { data } = await axios.get('/products');
        setProducts(data);
    }

    useEffect(() => {
        getProducts();
    }, [])

    return (
        <Page title='Products' headerNavigation={{ onClick: handleGoToMain }}>
            <DataList ruled >
                {products.length === 0 && Array.from(Array(5).keys()).map((index) => (
                    <DataList.Row id={`${index}`} key={index}>
                        <DataList.Cell>
                            <ImageItem.Skeleton />
                        </DataList.Cell>
                    </DataList.Row>
                ))}
                {products.map((product: any) => (
                    <DataList.Row id={product.id} key={product.id}>
                        <DataList.Cell>
                            <ImageItem thumbnail={product.images[0]?.src} link={{
                                children: product.name.es || product.name.pt,
                                onClick: () => { window.open(product.canonical_url) }
                            }} />
                        </DataList.Cell>
                    </DataList.Row>
                ))}
            </DataList>
        </Page>
    )
}

export default ProductList;