// CustomMarker.tsx
import React, { useRef, useState } from "react";
import { Icon } from "@iconify/react";
import locationIcon from "@iconify/icons-mdi/map-marker";
import { capitalizeFirstLetter } from "../../utils/string_helpers";
import Overlay from "react-bootstrap/Overlay";
import { Button, Popover } from "react-bootstrap";
import { CloudServiceI } from "../../interfaces/CloudService.interface";

// Define the props for the LocationPin component
interface LocationPinProps {
  lat: number;
  lng: number;
  service: CloudServiceI;
  text: string;
  setServiceInFocus: (service: CloudServiceI) => void;
}

const LocationPin = ({ service, setServiceInFocus }: LocationPinProps) => {
  const [show, setShow] = useState(false);
  const target = useRef<HTMLButtonElement | null>(null);

  const handleClick = (e: React.MouseEvent) => {
    setShow(!show);
    setServiceInFocus(service);
    target.current = e.target as HTMLButtonElement;
  };

  return (
    <Button
      className='pin cluster-marker'
      variant='outline-dark'
      style={{
        position: "absolute",
        transform: "translate(-50%, -50%)",
        cursor: "pointer",
      }}
      ref={target}
      onClick={handleClick}
    >
      <Icon icon={locationIcon} fontSize={30} className='pin-icon' />
      <Overlay
        show={show}
        target={target}
        placement='top'
        //container={ref}
        containerPadding={10}
        rootClose={true}
        onHide={() => setShow(false)}
      >
        <Popover id='popover-contained'>
          <Popover.Header as='h3'>Service Info</Popover.Header>
          {service && (
            <Popover.Body>
              <p>
                <strong>Service Name:</strong>{" "}
                {capitalizeFirstLetter(service.cloud_name.replace(/-/g, " "))}
              </p>
              <p>
                <strong>Service Details:</strong>{" "}
                {capitalizeFirstLetter(service?.cloud_description)}
              </p>
            </Popover.Body>
          )}
        </Popover>
      </Overlay>
    </Button>
  );
};

export default React.memo(LocationPin);
