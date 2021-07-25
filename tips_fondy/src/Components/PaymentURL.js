import React, {useRef} from 'react';
import {Route} from 'react-router';
import { usePaymentInputs } from 'react-payment-inputs';

import 'ipsp-js-sdk';

import axios from 'axios';

const baseURL = "http://localhost:8080/api";

const client = axios.create({
    baseURL
});

const PaymentURL = ({match}) => {

    const userId = match.params.id;

    // const requestData = {
    //     order_id: '333erfdhderfggffewevrwg',
    //     operation_id: '333erfdhderfggffewevrwg',
    //     order_desc: userId,
    //     currency: 'UAH',
    //     amount: '10',
    //     card_number: '4444555511116666',
    //     cvv2: '333',
    //     expiry_date: '1232',
    // };

    // const data = {
    //     order_id: 'duiduehsiffddhhddd44',
    //     order_desc: userId,
    //     currency: 'UAH',
    //     amount: '1000',
    //     card_number: '4444555511116666',
    //     cvv2: '333',
    //     expiry_date: '1232'
    // };
    //
    // const handleChangeCardNumber = () => {
    //
    // };
    // const handleChangeExpiryDate = () => {
    //
    // };
    // const handleChangeCVC = () => {
    //
    // };
    //
    // const pay = async () => {
    //     return client.post("/pay", data)
    //         .then((response) => {
    //             console.log(response);
    //         })
    //         .catch(e => console.log(e));
    // };
    //
    // const { meta, getCardNumberProps, getExpiryDateProps, getCVCProps } = usePaymentInputs();

    function checkoutInit(url) {
        const checkoutElement = useRef();
        const checkoutElementWrapper = useRef();

        $ipsp(checkoutElement).scope(function() {
            this.setCheckoutWrapper(checkoutElementWrapper);
            this.addCallback(__DEFAULTCALLBACK__);
            this.action('show', function(data) {
                $('#checkout_loader').remove();
                $('#checkout').show();
            });
            this.action('hide', function(data) {
                $('#checkout').hide();
            });
            this.action('resize', function(data) {
                $('#checkout_wrapper').width(480).height(data.height);
            });
            this.loadUrl(url);
        });
    };

    const button = $ipsp.get("button");
    button.setMerchantId( 1396424);
    button.setAmount(10.99, 'USD', false);
    button.setHost('pay.fondy.eu');
    checkoutInit(button.getUrl());
    return (

    <div ref={checkoutElement} id="checkout">
        <div ref={checkoutElementWrapper} id="checkout_wrapper"></div>
    </div>
    )
};

export default PaymentURL
