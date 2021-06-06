const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/user');

const { secret } = config;

/** @module auth */
module.exports = (app, nextMain) => {
  /**
   * @name /auth
   * @description Crea token de autenticación.
   * @path {POST} /auth
   * @body {String} email Correo
   * @body {String} password Contraseña
   * @response {Object} resp
   * @response {String} resp.token Token a usar para los requests sucesivos
   * @code {200} si la autenticación es correcta
   * @code {400} si no se proveen `email` o `password` o ninguno de los dos
   * @auth No requiere autenticación
   */
  app.post('/auth', (req, resp, next) => {
    const { email, password } = req.body;
    // resp.json({ text: 'Hola mundo' });
    if (!email || !password) {
      return next(400);
    }
    // TODO: autenticar a la usuarix
    const user = User.findOne({ email });
    // generar token
    const token = jwt.sign({ id: user._id }, secret);
    return resp.json({ token });
  });

  return nextMain();
};
