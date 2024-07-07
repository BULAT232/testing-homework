// @ts-ignore
import React from 'react';
import { render, screen} from '@testing-library/react';
import {Provider} from "react-redux";
import '@testing-library/jest-dom'
import {Application} from "../../src/client/Application";
import {BrowserRouter} from "react-router-dom";
import {initStore} from "../../src/client/store";
import {CartApi, ExampleApi} from "../../src/client/api";
describe('шапка', () => {
    const basename = "/hw/store"
    const api = new ExampleApi(basename)
    const cart = new CartApi()
    const store = initStore(api, cart)

    it('есть ссылки на старницы магазина', () => {

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Application/>
                </BrowserRouter>
            </Provider>
        );


        const linkCatalog = screen.getByRole('link', {name: 'Catalog'});
        const linkDelivery = screen.getByRole('link', {name: 'Delivery'});
        const linkContacts = screen.getByRole('link', {name: 'Contacts'});
        const linkHome = screen.getByRole('link', {name: 'Kogtetochka store'});
        const linkCart = screen.getByRole('link', {name: 'Cart'});

        expect(linkCatalog).toBeInTheDocument();
        expect(linkDelivery).toBeInTheDocument();
        expect(linkContacts).toBeInTheDocument();
        expect(linkHome).toBeInTheDocument();
        expect(linkCart).toBeInTheDocument();
    });

    it('есть ссылка на корзину с количеством', () => {
        const mockState = {
            cart: [{name: 'Product 1', price: 100, count: 1},
                {name: 'Product 2', price: 100, count: 1}]
        };

        cart.setState(mockState.cart)
        const store = initStore(api, cart)

        const count = Object.keys(mockState.cart).length;

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Application/>
                </BrowserRouter>
            </Provider>
        );

        const linkCart = screen.getByRole('link', {name: `Cart (${count})`});
        expect(linkCart).toBeInTheDocument();
    });
});