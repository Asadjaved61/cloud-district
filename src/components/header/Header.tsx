import React, { useEffect, useRef, useState } from "react";
import RequestDemoForm from "../requestDemoForm/RequestDemoForm";
import "./Header.css";

// Header component
export const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Reference to the header element
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Function to handle scroll event
    const handleScroll = () => {
      // Check if the header element is available
      if (headerRef.current) {
        // If the scroll position is more than 100, add the 'sticked' class
        if (window.scrollY > 100) {
          (headerRef.current as HTMLElement).classList.add("sticked");
        } else {
          // Otherwise, remove the 'sticked' class
          (headerRef.current as HTMLElement).classList.remove("sticked");
        }
      }
    };
    // Add the scroll event listener
    document.addEventListener("scroll", handleScroll);

    // Cleanup function to remove the event listener
    return () => document.removeEventListener("scroll", handleScroll);
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  return (
    <header id='header' className='header fixed-top' ref={headerRef}>
      <div className='container-fluid'>
        <div className='row d-flex align-items-center'>
          <div className='logo col-lg-7 col-md-7 col-sm-6'>
            <h1>Cloud District</h1>
          </div>
          <div className='col-lg-5 col-md-5 col-sm-6 d-flex gap-2 flex-wrap text-right justify-content-end align-items-end'>
            <button
              type='submit'
              className='btn btn-outline-info'
              onClick={() => setIsModalOpen(!isModalOpen)}
            >
              Request a Demo
            </button>
            {isModalOpen && (
              <RequestDemoForm
                show={isModalOpen}
                onHide={() => setIsModalOpen(false)}
              />
            )}
            <button
              type='submit'
              className='mx-2 btn btn-outline-info'
              onClick={() => setIsModalOpen(!isModalOpen)}
            >
              Free Trial
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
