import React from 'react';
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
// router
import { Link, useNavigate, useRouteError } from 'react-router-dom';
// styles
import classes from '../components/navigation/nav.module.css';
import { Nav } from '../components';

const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <section className="error_page">
      <Nav />
      <div className="error_container grid">
        <h3>There was a problem</h3>
        <h6>{error.message || error.statusText}</h6>
        <div className="error_nav flex_row">
          <button onClick={() => navigate(-1)} className="back">
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Go Back</span>
          </button>
          <Link
            to="/"
            aria-label="go to homepage"
            className={classes.home_link}
          >
            <FontAwesomeIcon icon={faHouse} className={classes.home_icon} />
            <h4>Go Home</h4>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Error;
