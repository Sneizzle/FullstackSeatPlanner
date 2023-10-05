import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Admin from "@/app/admin/page";
import axios from "axios";
import { RecoilRoot } from "recoil";
import "@testing-library/jest-dom";
describe("Admin Component", () => {
  it("renders the Dashboard title", () => {
    render(
      <RecoilRoot>
        <Admin />
      </RecoilRoot>
    );
    const dashboardTitle = screen.getByText("DashBoard");
    expect(dashboardTitle).toBeInTheDocument();
  });

  it("renders the Members Overview title", () => {
    render(
      <RecoilRoot>
        <Admin />
      </RecoilRoot>
    );
    const membersOverviewTitle = screen.getByText("Members Overview");
    expect(membersOverviewTitle).toBeInTheDocument();
  });

  it("renders the Names, Location, Team, and Route columns", () => {
    render(
      <RecoilRoot>
        <Admin />
      </RecoilRoot>
    );
    const namesColumn = screen.getByText("Name");
    const locationColumn = screen.getByText("Location");
    const teamColumn = screen.getByText("Team");
    const routeColumn = screen.getByText("Route?");

    expect(namesColumn).toBeInTheDocument();
    expect(locationColumn).toBeInTheDocument();
    expect(teamColumn).toBeInTheDocument();
    expect(routeColumn).toBeInTheDocument();
  });
});
