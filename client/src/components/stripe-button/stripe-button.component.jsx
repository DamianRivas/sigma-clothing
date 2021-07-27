import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51JHl8sI0AOiv7hGHKpZGy298tMbiVC6u7CVukDWFD52VRogwwGheHBAvnztI7Nj83NsBN2TS4pZegGWQaRjKSb8000rmi9rWmS";

  const onToken = token => {
    axios({
      url: "payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token,
      },
    })
      .then(res => {
        alert("Payment successful");
      })
      .catch(error => {
        console.warn("PAYMENT ERROR:", JSON.parse(error));
        alert(
          "There was an issue with your payment. Please be sure you use the provided credit cart"
        );
      });
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="Sigma Clothing Ltd."
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
};

export default StripeCheckoutButton;
