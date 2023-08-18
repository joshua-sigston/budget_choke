import React from 'react';
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faTrash } from '@fortawesome/free-solid-svg-icons';
// styles
import classes from './nav.module.css';
import { Form, NavLink } from 'react-router-dom';

const Nav = ({ username }) => {
  return (
    <header className="flex_row">
      <NavLink to="/" aria-label="go to homepage" className={classes.home_link}>
        <FontAwesomeIcon icon={faHouse} className={classes.home_icon} />
        <h5>
          budget<span>Choke</span>
        </h5>
      </NavLink>
      {username && (
        <Form
          method="POST"
          action="/logout"
          onSubmit={(e) => {
            if (!confirm('Delete user and all data?')) {
              e.preventDefault();
            }
          }}
        >
          <button type="submit" className={classes.delete_btn}>
            <span>Delete User</span>
            <FontAwesomeIcon icon={faTrash} className={classes.trash_can} />
          </button>
        </Form>
      )}
    </header>
  );
};

export default Nav;
