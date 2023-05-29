import { FunctionComponent, useCallback } from 'react';
import './main.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
/* import Catlist from '../components/catlist'; */



const Desktop1: FunctionComponent = () => {
  return (
    <div className="desktop1">
      <div className="desktop1Child" />
      <div className="desktop1Item" />
      <div className="everyPetDeservesContainer">
        <span>Every Pet Deserves a Loving Home. </span>
        <span className="adopt">Adopt</span>
        <span> a Pet Today</span>
      </div>
      <div className="desktop1Inner" />
      <div className="browseOurAvailableContainer">
        <span>Browse our available animals and learn more about the adoption process. Together, we can </span>
        <b>rescue, rehabilitate, and rehome pets in need.</b>
        <span>
          Thank you for supporting our mission to bring joy to families through
          pet adoption.
        </span>
      </div>
      <div className="rectangleDiv" />
      {/* <Catlist /> */}


      <div className="cats37">
        <b>Cats </b>
        <span className="span">37</span>
      </div>
      <div className="desktop1Child5" />
      <div className="desktop1Child6" />
      <div className="huskies15">
        <p className="huskies">
          <b>Huskies</b>
        </p>
        <p className="p">15</p>
      </div>
      <div className="labradorRetriever20Container">
        <p className="huskies">
          <b>Labrador Retriever</b>
        </p>
        <p className="p">20</p>
      </div>
      <div className="germanShepherd25Container">
        <p className="huskies">
          <b>German shepherd</b>
        </p>
        <p className="p">25</p>
      </div>
      <div className="bullDog2Container">
        <p className="huskies">
          <b>Bull Dog</b>
        </p>
        <p className="p">2</p>
      </div>
      <img
        className="rectangleIcon"
        alt=""
        src="/rectangle-10@2x.png"
      />
      <img
        className="desktop1Child1"
        alt=""
        src="/rectangle-12@2x.png"
      />
      <img
        className="desktop1Child2"
        alt=""
        src="/rectangle-13@2x.png"
      />
      <img
        className="desktop1Child3"
        alt=""
        src="/rectangle-14@2x.png"
      />
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
            />
            <img
              className="expandArrowIcon"
              alt=""
              src="/expand-arrow@2x.png"
            />
          </div>
          <img className="flagIcon" alt="" src="/flag@2x.png" />
          <Link to="/signin">Sign in</Link>


        </div>
      </div>
      <div className="frequentParrotHuskyWhiteParent">
        <div className="frequentParrotHuskyContainer">
          Frequent:
          <span className="parrot">Parrot</span>
          <span className="parrot">Husky</span>

          <span className="parrot">White Cat</span>
        </div>
        <div className="rectangleParent">
          <div className="groupChild" />
          <div className="searchDogs">Search Cat...</div>
          <div className="searchParent">
            <img className="searchIcon" alt="" src="/search@2x.png" />
            <b className="search">Search</b>
          </div>
          <div className="dogSitParent">
            <img className="searchIcon" alt="" src="/dog-sit@2x.png" />
            <b className="search">Cats</b>
            <img
              className="searchIcon"
              alt=""
              src="/expand-arrow1@2x.png"
            />
          </div>
          <div className="uploadToTheCloudParent">
            <img
              className="searchIcon"
              alt=""
              src="/upload-to-the-cloud@2x.png"
            />
            <b className="search">Search by image</b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Desktop1;
