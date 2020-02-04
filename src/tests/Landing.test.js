import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Landing from "../pages/Landing";
import { Provider as AuthProvider } from "../contexts/AuthContext";
import { Provider as CartProvider } from "../contexts/TestCartContext";
import { BrowserRouter as Router } from "react-router-dom";
import { act } from "react-dom/test-utils";

test(`loads and display h1`, () => {
  const tree = (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Landing />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
  const { getByRole, findByText } = render(tree);
});