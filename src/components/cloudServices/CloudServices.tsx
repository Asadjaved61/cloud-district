import React, { useEffect, useState } from "react";
import { CloudServiceI } from "../../interfaces/CloudService.interface";
import { capitalizeFirstLetter } from "../../utils/string_helpers";
import { LocationI } from "../../interfaces/Location.interface";
import haversine from "haversine-distance";
import Map from "../map/Map";
import cloudProviders, { CloudProvider } from "../../data/cloud-providers";
import "./CloudServices.css";

// Define the localStorage key as a variable
const userLocationKey = "userLocation";

// Define the API URL as a variable
const apiUrl = "https://api.aiven.io/v1/clouds";

const CloudServices = () => {
  const [currentLocation, setCurrentLocation] = useState<LocationI | null>(
    null
  );
  const [cloud_Providers, setCloudProviders] = useState<CloudProvider[] | null>(
    null
  );
  const [cloudServcies, setCloudServices] = useState<CloudServiceI[] | null>(
    null
  );

  const [filteredCloudServices, setFilteredCloudServices] = useState<
    CloudServiceI[] | null
  >(null);

  const [locationLoading, setLocationLoading] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<CloudServiceI | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  // Create an AbortController instance outside of your effect
  //const abortController = new AbortController();

  useEffect(() => {
    // Set the cloud providers from the imported data
    setCloudProviders(cloudProviders);
    // Check if there is a user location stored in local storage
    if (localStorage.getItem("userLocation")) {
      setCurrentLocation(JSON.parse(localStorage.getItem(userLocationKey)!));
      if (filteredCloudServices && currentLocation) {
        sortCloudServices(filteredCloudServices, currentLocation);
      }
    }
    getCloudServices();
    // Return a cleanup function that cancels the fetch request
    return () => {
      //abortController.abort();
    };
  }, []);

  const getCloudServices = async () => {
    const options = {
      method: "GET",
      //signal: abortController.signal,
    };
    try {
      const response = await fetch(apiUrl, options);
      // Check if the response is ok
      if (!response.ok) {
        // If not, throw an error
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Set the cloud services and filtered cloud services state to the fetched data
      setCloudServices(data.clouds);
      setFilteredCloudServices(data.clouds);
      // Sort the cloud services by location
      sortCloudServices(
        data.clouds,
        JSON.parse(localStorage.getItem(userLocationKey) || "")
      );
    } catch (e) {
      // Ignore fetch errors if the fetch was cancelled
      if ((e as Error).name === "AbortError") {
        return;
      }
      // Log any errors to the console
      console.error(e as Error);

      // Set the error state
      setError((e as Error).message);
    }
  };

  const getUserCurrentLocation = async () => {
    if (navigator.geolocation) {
      setLocationLoading(true);
      navigator.geolocation.getCurrentPosition(success, locationError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const success = async (position: GeolocationPosition) => {
    await setCurrentLocation({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
    // Store location in local storage
    localStorage.setItem(
      "userLocation",
      JSON.stringify({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    );
    setLocationLoading(false);
    filteredCloudServices &&
      sortCloudServices(filteredCloudServices, {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
  };

  const locationError = () => {
    setLocationLoading(false);
    alert("Sorry, no position available.");
  };

  const sortCloudServices = async (
    data: CloudServiceI[],
    location: LocationI
  ) => {
    const sortedArray = await [...data]?.sort((a, b) => {
      const aLocation = {
        latitude: a.geo_latitude,
        longitude: a.geo_longitude,
      };
      const bLocation = {
        latitude: b.geo_latitude,
        longitude: b.geo_longitude,
      };

      const aDistance = haversine(location, aLocation);

      const bDistance = haversine(location, bLocation);

      return aDistance - bDistance;
    });

    setFilteredCloudServices(sortedArray);
  };

  const filterCloudProvider = async (provider: CloudProvider) => {
    let arrayCopy = [...(cloud_Providers ?? [])] as CloudProvider[];
    // Set isActive property of all providers to false
    arrayCopy.map((p) => {
      p.isActive = false;
    });
    let filteredList: CloudServiceI[] = [];

    if (!provider.isActive) {
      let filteredList: CloudServiceI[] = [];
      if (cloudServcies) {
        // Filter the services based on the provider description
        filteredList = await cloudServcies.filter((service) => {
          return service.provider_description === provider.description;
        });
      }
      setFilteredCloudServices(filteredList);
      if (currentLocation) sortCloudServices(filteredList, currentLocation);
    } else {
      // If the provider is active, filter the services to exclude the ones with the provider description
      filteredList =
        (await (cloudServcies ?? []).filter((service) => {
          return service.provider_description !== provider.description;
        })) ?? [];
      setFilteredCloudServices(filteredList);
      // If there is a current location, sort the services based on the location
      if (currentLocation) sortCloudServices(filteredList, currentLocation!);
    }
    arrayCopy.find((p) => p.description === provider.description)!.isActive =
      !provider.isActive;

    setCloudProviders(arrayCopy);
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col filter-provider p-0 text-center justify-content-center align-items-center'>
          <ul className='my-2 d-flex flex-wrap list-group-horizontal list-group-horizontal-md position-relative overflow-auto gap-2'>
            {cloud_Providers &&
              cloud_Providers.map((provider, index) => (
                <li
                  className='list-group-item'
                  onClick={() => filterCloudProvider(provider)}
                  key={index}
                >
                  <button
                    className={`btn btn-outline-dark btn-lg ${
                      provider.isActive && "active"
                    }`}
                  >
                    {provider.displayName}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className='row mt-2'>
        <div className='col-12 col-lg-4 col-md-4 justify-content-between'>
          <h6>List of Services</h6>
          <div className='service-list overflow-scroll list-group small shadow'>
            {filteredCloudServices?.map(
              (service: CloudServiceI, index: number) => (
                <button
                  key={index}
                  className={`list-group-item list-group-item-action d-flex align-items-center justify-content-between p-3 ${
                    selectedService?.cloud_name === service.cloud_name &&
                    "active"
                  }`}
                  onClick={() => setSelectedService(service)}
                  content='service'
                >
                  <h6>
                    {capitalizeFirstLetter(
                      service.cloud_name.replace(/-/g, " ")
                    )}
                  </h6>
                  <span className='geo-region'>
                    {capitalizeFirstLetter(service.geo_region)}
                  </span>
                </button>
              )
            )}
          </div>
        </div>
        <div
          className={`col-12 col-lg-8 col-md-8 align-items-center justify-content-center ${
            !currentLocation && "d-flex"
          }`}
        >
          {currentLocation && filteredCloudServices && (
            <Map
              filteredServices={filteredCloudServices ?? []}
              currentLocation={currentLocation}
              selectedService={selectedService}
            />
          )}
          {!locationLoading && !currentLocation && (
            <button
              className='btn btn-success'
              onClick={getUserCurrentLocation}
            >
              Allow location see nearest services
            </button>
          )}
          {locationLoading && (
            <div className='spinner-border text-primary' role='status'></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CloudServices;
