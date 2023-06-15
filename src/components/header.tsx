import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

export function Header() {
  return (
    <div className="groupParent">
      <div className="petParent">
        <b className="pet">
          PE
          <span className="t">T</span>
        </b>
        <img
          className="untitledDesign11"
          alt=""
          src="/untitled-design-1-1.svg"
        />
      </div>
      <div className="aboutUsParent">
        <div className="aboutUs">About us</div>
        <div className="aboutUs">Adopt</div>
        <div className="aboutUs">Contact us</div>
        <div className="aboutUs">Blog</div>
        <div className="aboutUs">Resources</div>
      </div>
      <div className="groupContainer">
        <div className="petsParent">
          <div className="pets">Pets</div>
          <img
            className="squaredMenuIcon"
            alt=""
            src="/squared-menu@2x.png"
            style={{ marginLeft: '10px' }}
          />
          <img
            className="expandArrowIcon"
            alt=""
            src="/expand-arrow@2x.png"
            style={{ marginLeft: '10px' }}
          />
        </div>
        <img className="flagIcon" alt="" src="/flag@2x.png" style={{ marginLeft: '10px' }} />
        <Link to="/login" className="signInLink" style={{ marginLeft: '10px' }}>Sign in</Link>
      </div>
    </div>

  );
}
