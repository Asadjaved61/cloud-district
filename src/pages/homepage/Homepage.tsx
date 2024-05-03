import React, { useEffect } from "react";
import "./Homepage.css";
import CloudServices from "../../components/cloudServices/CloudServices";
import Stats from "../../components/stats/Stats";
import { Link, Events, animateScroll as scroll, scrollSpy } from "react-scroll";
import { off } from "process";

const Homepage = () => {
  useEffect(() => {
    // Registering the 'begin' event and logging it to the console when triggered.
    Events.scrollEvent.register("begin", (to, element) => {
      console.log("begin", to, element);
    });

    // Registering the 'end' event and logging it to the console when triggered.
    Events.scrollEvent.register("end", (to, element) => {
      console.log("end", to, element);
    });

    // Updating scrollSpy when the component mounts.
    scrollSpy.update();

    // Returning a cleanup function to remove the registered events when the component unmounts.
    return () => {
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    };
  }, []);

  const scrollTo = () => {
    scroll.scrollTo(500, {
      duration: 500,
      smooth: true,
      offset: -50,
    }); // Scrolling to 100px from the top of the page.
  };

  return (
    <main>
      <section id='hero' className='hero d-flex align-items-center'>
        <div className='container'>
          <div className='row d-flex justify-content-between'>
            <div className='col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center'>
              <h2 data-aos='fade-up'>
                The Secure{" "}
                <span className='highlight-colour'>cloud data plateform </span>{" "}
                tailored to your business needs.
              </h2>
              <p className='fw-bold'>
                We provide a wide range of cloud services to help you get the
                most out of your cloud data platform.
              </p>
              <Link
                activeClass='active'
                className='flex-wrap'
                to='services'
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
                ignoreCancelEvents={false}
              >
                <button
                  className='btn btn-md-sm explore-btn flex-wrap'
                  onClick={scrollTo}
                >
                  Explore Cloud Services <i className='bi bi-arrow-right'></i>
                </button>
              </Link>
              <div className='row' data-aos='fade-up' data-aos-delay='400'>
                <Stats />
              </div>
            </div>

            <div
              className='col-lg-5 col-md-4  order-1 order-lg-2 hero-img'
              data-aos='zoom-out'
            >
              {/* SVG by https://bootstrapmade.com/demo/Logis/ */}
              <img
                src='assets/img/hero-img.svg'
                className='img-fluid mb-3 mb-lg-0'
                alt='hero-img'
              />
            </div>
          </div>
        </div>
      </section>
      <section id='services' className='services d-flex p-1'>
        <CloudServices />{" "}
      </section>
      <section id='footer' className='footer'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-3 col-md-6 footer-contact'>
              <h6>Contact Us</h6>
              <p>
                A108 Adam Street <br />
                New York, NY 535022
                <br />
                United States <br />
                <strong>Phone:</strong> +1 5589 55488 55
                <br />
                <strong>Email:</strong>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Homepage;
