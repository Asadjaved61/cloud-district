import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import LocationPin from "./LocationPin";
import "./Map.css";
import { CloudServiceI } from "../../interfaces/CloudService.interface";
import { LocationI } from "../../interfaces/Location.interface";

// Define a type for the props
type MapProps = {
  filteredServices: CloudServiceI[] | null;
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
          defaultCenter={currentLocation}
          defaultZoom={7}
          zoom={serviceInFocus ? 14 : 7}
          center={
            selectedService
              ? {
                  lat: selectedService.geo_latitude!,
                  lng: selectedService.geo_longitude!,
                }
              : filteredServices && filteredServices.length > 0
              ? {
                  lat: filteredServices[0].geo_latitude!,
                  lng: filteredServices[0].geo_longitude!,
                }
              : currentLocation
          }
          options={{
            styles: [mapStyles],
            disableDefaultUI: true,
            zoomControl: true,
          }}
        >
          {filteredServices &&
            filteredServices.map((service: CloudServiceI, index: number) => (
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
