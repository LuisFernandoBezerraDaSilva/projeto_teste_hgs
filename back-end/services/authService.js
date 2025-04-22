const BaseService = require('./baseService');
const { PrismaClient } = require('@prisma/client');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

class AuthService extends BaseService {
  constructor() {
    const authSchema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
      role: Joi.number().required(),
    });
    super(prisma.user, authSchema);
  }

  async findByUsername(username) {
    return await this.model.findUnique({ where: { username } });
  }

  async authenticate(username, password) {
    const user = await this.findByUsername(username);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: user.id, role: user.role }, 'your_secret_key', { expiresIn: '1h' });
    return { token };
  }
}

module.exports = AuthService;