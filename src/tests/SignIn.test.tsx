import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import SignIn from "../pages/SignIn";

function renderSignInPage() {
  return render(
    <BrowserRouter>
      <SignIn />
    </BrowserRouter>
  );
}

test("Error States | User not found", async () => {
  const { unmount } = renderSignInPage();

  expect(screen.getByText(/Login to your account/)).toBeInTheDocument();
  expect(screen.getByText(/Welcome back!/)).toBeInTheDocument();

  userEvent.type(screen.getByTestId("username-input"), "test");
  userEvent.type(screen.getByTestId("password-input"), "test");
  await userEvent.click(screen.getByTestId("submit-button"));

  await waitFor(() => {
    expect(
      screen.getByText(/Incorect username or password/)
    ).toBeInTheDocument();
  });

  await userEvent.click(screen.getByTestId("close-error-message"));

  await waitFor(() => {
    expect(
      screen.queryByText(/Incorect username or password/)
    ).not.toBeInTheDocument();
  });

  unmount();
});

test("Error States | Required fields empty", async () => {
  const { unmount } = renderSignInPage();

  expect(screen.getByText(/Login to your account/)).toBeInTheDocument();
  expect(screen.getByText(/Welcome back!/)).toBeInTheDocument();

  await userEvent.click(screen.getByTestId("submit-button"));

  await waitFor(() => {
    expect(screen.getByText(/Please input your username!/)).toBeInTheDocument();
    expect(screen.getByText(/Please input your password!/)).toBeInTheDocument();
  });

  await userEvent.type(screen.getByTestId("username-input"), "test");

  await waitFor(() => {
    expect(
      screen.queryByText(/Please input your username!/)
    ).not.toBeInTheDocument();
    expect(screen.getByText(/Please input your password!/)).toBeInTheDocument();
  });

  userEvent.type(screen.getByTestId("password-input"), "test");

  await waitFor(() => {
    expect(
      screen.queryByText(/Please input your username!/)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Please input your password!/)
    ).not.toBeInTheDocument();
  });

  unmount();
});
