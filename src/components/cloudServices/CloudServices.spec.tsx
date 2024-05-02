import React from "react";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CloudServices from "./CloudServices";
import fetchMock from "jest-fetch-mock";
import haversine from "haversine-distance";
import { CloudServiceI } from "../../interfaces/CloudService.interface";

fetchMock.enableMocks();

describe("CloudServices", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    localStorage.clear();
  });

  test("renders CloudServices component", () => {
    render(<CloudServices />);
    expect(
      screen.getByText(/Filter cloud services by provider/i)
    ).toBeInTheDocument();
  });

  test("renders CloudServices component and fetches data", async () => {
    const mockData = { clouds: [{ cloud_name: "test" }] };
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    render(<CloudServices />);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("https://api.aiven.io/v1/clouds", {
      method: "GET",
    });
    expect(screen.getByText("List of Services")).toBeInTheDocument();
  });

  const sortCloudServices = (services: any[], location: any) => {
    return services.sort((a, b) => {
      const distanceA = haversine(
        { latitude: a.geo_latitude, longitude: a.geo_longitude },
        location
      );
      const distanceB = haversine(
        { latitude: b.geo_latitude, longitude: b.geo_longitude },
        location
      );
      return distanceA - distanceB;
    });
  };

  test("sorts services based on distance from location", () => {
    const mockData = [
      {
        cloud_description: "Cloud Service 1 Description",
        cloud_name: "Cloud Service 1",
        geo_latitude: 40.7128,
        geo_longitude: -74.006,
        geo_region: "New York",
        provider: "Provider 1",
        provider_description: "Provider 1 Description",
      },
      {
        cloud_description: "Cloud Service 2 Description",
        cloud_name: "Cloud Service 2",
        geo_latitude: 34.0522,
        geo_longitude: -118.2437,
        geo_region: "Los Angeles",
        provider: "Provider 2",
        provider_description: "Provider 2 Description",
      },
    ];

    const sortedServices = sortCloudServices(mockData, {
      lat: 35.0522,
      lng: -119.2437,
    });

    expect(sortedServices[0]).toEqual(mockData[1]);
  });

  const filterCloudProvider = (services: any[], provider: string) => {
    return services.filter((service) => service.provider === provider);
  };

  test("filters services based on provider", () => {
    const services = [
      { cloud_name: "service1", provider: "provider1" },
      { cloud_name: "service2", provider: "provider2" },
      { cloud_name: "service3", provider: "provider1" },
    ];
    const provider = "provider1";

    const filteredServices = filterCloudProvider(services, provider);

    expect(filteredServices).toEqual([
      { cloud_name: "service1", provider: "provider1" },
      { cloud_name: "service3", provider: "provider1" },
    ]);
  });
});
