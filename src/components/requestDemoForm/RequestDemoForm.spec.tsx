import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import RequestDemoForm from "./RequestDemoForm";

describe("RequestDemoForm", () => {
  it("renders the form", () => {
    render(<RequestDemoForm show={true} onHide={() => {}} />);

    expect(screen.getByLabelText("Email address")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone Number")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("closes the modal when the close button is clicked", () => {
    const onHide = jest.fn();

    render(<RequestDemoForm show={true} onHide={onHide} />);

    fireEvent.click(screen.getByText("Close"));

    expect(onHide).toHaveBeenCalled();
  });
});
