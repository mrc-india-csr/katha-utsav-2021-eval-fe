import express from 'express'
import React from 'react'
import {renderToString} from 'react-dom/server'
import Dashboard from '../pages/dashboard';
import Auth from '../pages/auth';
import {VerifyLogin} from "./middleware/verifyLogin";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from '../client/reducers';
import {CheckIfLoggedIn} from "./middleware/checkIfLoggedIn";

const router = express.Router();

router.get('/health', async (req, res) => {
  return res.status(200).json({status: 'Healthy'});
})

router.get('/', VerifyLogin, async (req, res) => {
  res.redirect('/dashboard');
})

router.get('/login', CheckIfLoggedIn, async (req, res) => {
  const reactComp = renderToString(<Auth/>)
  res.cookie('csrfToken', req.csrfToken ? req.csrfToken() : null, {
    sameSite: true,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  });
  res.status(200).render('pages/auth', {reactApp: reactComp})
})

router.get('/dashboard', VerifyLogin, async (req, res) => {
  const store = createStore(rootReducer);
  const reactComp = renderToString(<Provider store={store}>
      <Dashboard/>
    </Provider>)
  res.cookie('csrfToken', req.csrfToken ? req.csrfToken() : null, {
    sameSite: true,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  });
  res.status(200).render('pages/dashboard', {reactApp: reactComp})
})

export default router

