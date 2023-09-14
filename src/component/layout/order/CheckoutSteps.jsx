import {
  Typography,
  Stepper,
  StepLabel,
  Step,
  StepContent,
} from "@mui/material";
import {
  LocalShipping,
  LibraryAddCheck,
  AccountBalance,
} from "@mui/icons-material";

import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const CheckoutSteps = ({ activeStep }) => {
  const params = useLocation();
  console.log(params.pathname);
  const [curr, setCurr] = useState(
    params.pathname === "/process/payment" ? 1 : 0
  );
  setTimeout(() => {
    setCurr(activeStep);
  }, 10);

  const steps = [
    {
      label: <Typography>Shippings Details</Typography>,
      icon: <LocalShipping />,
      description: `For each ad campaign that you create, you can control how much
      you're willing to spend on clicks and conversions, which networks
      and geographical locations you want your ads to show on, and more.`,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <LibraryAddCheck />,
      description: `For each ad campaign that you create, you can control how much
      you're willing to spend on clicks and conversions, which networks
      and geographical locations you want your ads to show on, and more.`,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <AccountBalance />,
      description: `For each ad campaign that you create, you can control how much
      you're willing to spend on clicks and conversions, which networks
      and geographical locations you want your ads to show on, and more.`,
    },
  ];
  const stepstyle = {
    position: "absolute",
    top: "10vmax",
    left: "2vmax",
    height: "fit-content",
    width: "45vmax",
    fontSize: "1.2vmax",
  };
  return (
    <>
      <Stepper alternativeLabel activeStep={curr} style={stepstyle}>
        {steps.map((item, idx) => (
          <Step
            key={idx}
            active={curr === idx ? true : false}
            completed={curr >= idx ? true : false}
          >
            <StepLabel
              icon={item.icon}
              style={{ color: curr >= idx ? `darkred` : `black` }}
            >
              {item.label}
            </StepLabel>
            <StepContent style={{ color: "grey", marginTop: "1.5vmax" }}>
              {item.description}
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </>
  );
};

export default CheckoutSteps;
