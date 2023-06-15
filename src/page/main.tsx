import { FunctionComponent, useCallback, useState } from 'react';
import './main.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Store } from '../page/catlist';



const Desktop1: FunctionComponent = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="desktop1">

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
      <Store searchValue={searchValue} setSearchValue={setSearchValue} />

      <div className="frequentParrotHuskyWhiteParent">
        <div className="frequentParrotHuskyContainer">
          Frequent:
          <span className="parrot">Parrot</span>
          <span className="parrot">Husky</span>

          <span className="parrot">White Cat</span>
        </div>
        <div className="rectangleParent">
          <div className="groupChild" />
          <div className="searchDogs"><div className="searchCats">
            <input
              type="text"
              id="search-input"
              placeholder="Search Cats"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div></div>
          <div className="searchParent">
            <img className="searchIcon" alt="" src="/search@2x.png" />
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
