import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import GoogleMapReact from "google-map-react";
import Map from "./Map";
import { CloudServiceI } from "../../interfaces/CloudService.interface";

jest.mock("google-map-react", () => jest.fn());

const currentLocation = {
  lat: 51.5074,
  lng: 0.1278,
};

jest.mock("google-map-react", () => jest.fn());

describe("Map", () => {
  it("renders without crashing", () => {
    const { getByText } = render(
      <Map
        filteredServices={[]}
        currentLocation={currentLocation}
        selectedService={null}
      />
    );
    expect(screen.getByText("View cloud Services on map")).toBeInTheDocument();
  });

  it("renders the GoogleMapReact component", () => {
    const mockFilteredServices: CloudServiceI[] = [
      {
        geo_latitude: 123,
        geo_longitude: 456,
        cloud_name: "Test Cloud",
        cloud_description: "Test Cloud Description",
        geo_region: "Test Region",
        provider: "Test Provider",
        provider_description: "Test Provider Description",
      },
    ];

    render(
      <Map
        filteredServices={mockFilteredServices}
        currentLocation={currentLocation}
        selectedService={null}
      />
    );

    expect(GoogleMapReact).toHaveBeenCalled();
  });

  it("renders LocationPin with correct props", () => {
    // Mock the filteredServices and selectedService props
    const mockSelectedService: CloudServiceI = {
      geo_latitude: 123,
      geo_longitude: 456,
      cloud_name: "Test Cloud",
      cloud_description: "Test Cloud Description",
      geo_region: "Test Region",
      provider: "Test Provider",
      provider_description: "Test Provider Description",
    };

    render(
      <Map
        filteredServices={[]}
        currentLocation={currentLocation}
        selectedService={mockSelectedService}
      />
    );

    // Check that LocationPin is rendered with the correct props
    const locationPin = screen.getByText("Test Cloud");
    expect(locationPin).toBeInTheDocument();
    expect(screen.getByTestId("location-pin")).toHaveAttribute("lat", "123");
    expect(screen.getByTestId("location-pin")).toHaveAttribute("lng", "456");
  });
});
