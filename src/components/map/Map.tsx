import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import LocationPin from "./LocationPin";
import "./Map.css";
import { CloudServiceI } from "../../interfaces/CloudService.interface";
import { LocationI } from "../../interfaces/Location.interface";

// Define a type for the props
type MapProps = {
  filteredServices: CloudServiceI[];
  currentLocation: LocationI;
  selectedService: CloudServiceI | null;
};

const Map = ({
  filteredServices,
  currentLocation,
  selectedService,
}: MapProps) => {
  const mapStyles = {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#e9e9e9" }, { lightness: 17 }],
  };
  const [serviceInFocus, setServiceInFocus] = useState<CloudServiceI | null>(
    null
  );
  const togglePopover = (event: React.MouseEvent, service: CloudServiceI) => {
    setServiceInFocus(service);
  };

  return (
    <div className='google-map'>
      <h6>View cloud Services on map</h6>
      <div className='map-container'>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyBvL0dXSOzOawcoMuZXZOPs0_gAJCAm0ek",
          }}
          defaultCenter={
            filteredServices.length > 0
              ? {
                  lat: filteredServices[0].geo_latitude!,
                  lng: filteredServices[0].geo_longitude!,
                }
              : currentLocation
          }
          defaultZoom={5}
          zoom={selectedService ? 5 : 12}
          center={
            selectedService
              ? {
                  lat: selectedService.geo_latitude!,
                  lng: selectedService.geo_longitude!,
                }
              : {
                  lat: filteredServices[0].geo_latitude!,
                  lng: filteredServices[0].geo_longitude!,
                }
          }
          options={{
            styles: [mapStyles],
            disableDefaultUI: true,
            zoomControl: true,
          }}
        >
          {filteredServices.map((service: CloudServiceI, index: number) => (
            <LocationPin
              key={index}
              lat={service.geo_latitude}
              lng={service.geo_longitude}
              text={service.cloud_name}
              service={service}
              setServiceInFocus={setServiceInFocus}
            />
          ))}
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default React.memo(Map);
