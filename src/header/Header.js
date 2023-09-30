import React, { useState } from 'react';
import { AppBar, Tab, Tabs, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const linksArr = ['about', 'login'];
const loggedInLinks = ['home', 'about', 'new', 'profile'];
const Header = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [value, setValue] = useState();
  return (
    <AppBar sx={{ bgcolor: 'transparent', position: 'sticky' }}>
      <Toolbar>
        <Tabs
          value={value}
          onChange={(e, val) => setValue(val)}
          sx={{ textDecoration: 'none' }}
        >
          {isLoggedIn
            ? loggedInLinks.map((link) => (
                <Tab
                  LinkComponent={Link}
                  to={`/${link === 'home' ? '' : link}`}
                  sx={{
                    textDecoration: 'none',
                    ':hover': {
                      textDecoration: 'underline',
                      textUnderlineOffset: '18px',
                    },
                  }}
                  key={link}
                  label={link}
                />
              ))
            : linksArr.map((link) => (
                <Tab
                  LinkComponent={Link}
                  to={`/${link === 'home' ? '' : link}`}
                  sx={{
                    textDecoration: 'none',
                    ':hover': {
                      textDecoration: 'underline',
                      textUnderlineOffset: '18px',
                    },
                  }}
                  key={link}
                  label={link}
                />
              ))}
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
