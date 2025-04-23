const BaseService = require('./baseService');
const { PrismaClient } = require('@prisma/client');
const userSchema = require('../schemas/userSchema');
const bcrypt = require('bcryptjs'); // Importa o bcrypt para encriptação
const prisma = new PrismaClient();

class UserService extends BaseService {
  constructor() {
    super(prisma.user, userSchema);
  }

  async create(data) {
    try {
      this.validate(data, this.schema);

      const saltRounds = 10;
      const hashedPassword = bcrypt.hashSync(data.password, saltRounds);

      const userData = { ...data, password: hashedPassword };

      return await this.model.create({ data: userData });
    } catch (e) {
      console.log(e);
      throw new Error('Erro ao criar usuário');
    }
  }

  async getUserByUsername(username) {
    try {
      const user = await this.model.findUnique({
        where: { username },
      });
      if (!user) throw new Error('Usuário não encontrado');
      return user;
    } catch (e) {
      console.log(e);
      throw new Error('Erro ao buscar usuário');
    }
  }
}

module.exports = UserService;