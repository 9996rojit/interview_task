
import { Router } from 'express';
import { getNewToken, login, register } from '../modules/authModules/controller';

module.exports = (router: Router) => {
  router.post('/login', login);
  router.post('/register', register);
  router.get('/getToken', getNewToken);
}