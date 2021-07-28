import React, {useEffect, useState} from 'react';
import {Route} from 'react-router';
import '../styles/paymentURL.css';
import 'ipsp-js-sdk';

import axios from 'axios';

const baseURL = "http://localhost:8080/api";

const client = axios.create({
    baseURL
});

const styles = {}
const PaymentURL = ({match}) => {

    const userId = match.params.id;
    const [loading, setLoading] = useState(false);
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
        window.$ipsp('checkout').scope(function () {
            this.setCheckoutWrapper('#checkout_wrapper');
            this.addCallback(window.__DEFAULTCALLBACK__);
            this.action('show', function (data) {
                console.log(window);
                //window.$('#checkout_loader').remove();
                // window.$('#checkout').show();
            });
            this.action('hide', function (data) {
                console.log('hide');
                window.$('#checkout').hide();
            });
            this.action('resize', function (data) {
                setLoading(false);
                console.log('resize');

                // window.$('#checkout_wrapper').width(480).height(data.height);
            });
            this.loadUrl(url);
        });
    }

    const receiver = [
        {
            requisites: {
                amount: 0,
                settlement_description: "Назначение платежа для банковского перевода",
                merchant_id: 500001
            },
            type: "merchant"
        }, {
            requisites: {
                amount: 200,
                settlement_description: "Назначение платежа для банковского перевода",
                merchant_id: 600001
            },
            type: "merchant"
        }
    ];

    useEffect(() => {
        const button = window.$ipsp.get("button");
        button.setMerchantId(1396424);
        button.setAmount('', 'UAH', false);
        button.setHost('pay.fondy.eu');
        button.addField({
            receiver
        });
        setLoading(true);
        checkoutInit(button.getUrl());

    }, []);

    useEffect(() => {

    }, [loading]);

    return (<>
        {loading && <div>loading...</div>}
        <div id="checkout">
            <div style={{height: '90vh'}} id="checkout_wrapper"></div>

        </div>
    </>)
};

export default PaymentURL
