"use client"

import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";


const stripePromise = loadStripe("pk_test_51OYxpiBIBxJKppQzE7YTUrB87cbWjOvUaD79PsUsW70icCkyequj4VmnkdtFhfaP7wyD90PgVyQBBEjU5EkGPkfd00n0yORGNP");

export default function App() {
    const [clientSecret, setClientSecret] = React.useState("");
  
    React.useEffect(() => {
 
      fetch("/api/auth/price", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }, []);
  
    const appearance = {
      theme: 'night',
      variables: {
        colorPrimary: '#fe1252',
      },
    };
    const options = {
      clientSecret,
      appearance,
    };
  
    return (
      <div className="App">
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    );
  }