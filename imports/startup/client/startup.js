import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import HomePage from '../../ui/pages/home/home-page.jsx';

Meteor.startup(() => {
  console.log('[client] startup');

  render(<HomePage />, document.getElementById('react-root'));
});
