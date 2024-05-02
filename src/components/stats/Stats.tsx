import React from "react";
import CountUp from "react-countup";
import "./Stats.css";

const Stats = () => {
  return (
    <>
      <div className='col-lg-3 col-6 col-md-3'>
        <div className='stats-item text-center w-100 h-100'>
          <CountUp start={0} end={1100} duration={1} />
          <p>Clients</p>
        </div>
      </div>

      <div className='col-lg-3 col-6 col-md-3'>
        <div className='stats-item text-center w-100 h-100'>
          <CountUp start={0} end={2455} duration={1} />
          <p>Projects</p>
        </div>
      </div>

      <div className='col-lg-3 col-6 col-md-3'>
        <div className='stats-item text-center w-100 h-100'>
          <CountUp start={0} end={200} duration={1} />
          <p>Support</p>
        </div>
      </div>

      <div className='col-lg-3 col-6 col-md-3'>
        <div className='stats-item text-center w-100 h-100'>
          <CountUp start={0} end={1463} duration={1} />
          <p>Workers</p>
        </div>
      </div>
    </>
  );
};

export default Stats;
