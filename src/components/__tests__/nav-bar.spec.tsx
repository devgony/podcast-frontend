import { ApolloProvider } from "@apollo/client";
import { getByRole, waitFor } from "@testing-library/dom";
import { render, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { NavBar } from "../../components/nav-bar";

const mockPush = jest.fn();

// jest.mock("react", () => {
//   return jest.fn(()=>{
//     useState:
//   })
// })

jest.mock("react-router-dom", () => {
  const realModule = jest.requireActual("react-router-dom");
  return {
    ...realModule,
    useHistory: () => {
      return {
        push: mockPush,
      };
    },
  };
});

describe("<NavBar />", () => {
  let renderResult: RenderResult;
  beforeEach(async () => {
    await waitFor(() => {
      renderResult = render(
        <Router>
          <NavBar />
        </Router>
      );
    });
  });
  it("renders OK", () => {
    const { getByText } = renderResult;
    getByText("Home");
  });
  it("open menu", async () => {
    const { container } = renderResult;
    await waitFor(() => {
      userEvent.click(getByRole(container, "menu"));
    });
    expect(container.getElementsByClassName("hidden").length).toBe(0);
  });
  it("can logout", async () => {
    const { container } = renderResult;
    await waitFor(() => {
      userEvent.click(getByRole(renderResult.container, "logout"));
    });
    expect(container.getElementsByClassName("hidden").length).toBe(1);
    expect(mockPush).toHaveBeenCalledWith("/");
  });
  it("can edit profile", async () => {
    const { container } = renderResult;
    await waitFor(() => {
      userEvent.click(getByRole(container, "menu"));
      userEvent.click(getByRole(container, "edit-profile"));
    });
    expect(container.getElementsByClassName("hidden").length).toBe(1);
  });
});
