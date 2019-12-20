import React from 'react';
import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_Zct9fH8SaKebbdTSsMQVwe08005toAuRfO'

    const onToken = (token) => {
        console.log(token);
        alert('Payment Successful')
    }

    return (
        <StripeCheckout 
            label="Pay Now"
            name="store Inc."
            billingAddress
            shippingAddress
            image="https://svgshare.com/i/CUz.svg"
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishableKey}
        />
    );
}

export default StripeCheckoutButton