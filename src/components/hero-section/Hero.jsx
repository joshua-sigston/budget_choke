import React from 'react';
// styles
import classes from './hero.module.css';
import { Form, useFetcher } from 'react-router-dom';
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
// img
import heroImg from '../../assets/hero_img.png';

const Hero = () => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === 'submitting';

  return (
    <section className={classes.hero_container}>
      <div className={classes.left_col}>
        <h3>
          Stop letting your <span>Money</span> get away from you!
        </h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio quasi
          voluptatibus itaque.
        </p>
        <fetcher.Form method="POST" className={classes.register_form}>
          <input
            type="text"
            name="username"
            placeholder="What is your name?"
            aria-label="Your name?"
            autoComplete="given-name"
            required
          />
          <input type="hidden" name="_action" value="newUser" />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <p>Creating user....</p>
            ) : (
              <>
                <p>Create User</p>
                <FontAwesomeIcon
                  icon={faUserPlus}
                  className={classes.add_user_icon}
                />
              </>
            )}
          </button>
        </fetcher.Form>
      </div>
      <div className={classes.right_col}>
        <img src={heroImg} alt="banner" />
      </div>
    </section>
  );
};

export default Hero;
