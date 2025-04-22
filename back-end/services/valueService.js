const BaseService = require('./baseService');
const { PrismaClient } = require('@prisma/client');
const valueSchema = require('../schemas/valueSchema');
const prisma = new PrismaClient();

class ValueService extends BaseService {
  constructor() {
    super(prisma.monthlyValue, valueSchema);
  }

  async getAll() {
    try {
      const values = await this.model.findMany({
        include: {
          user: {
            select: {
              username: true,
            },
          },
        },
      });

      return values.map(value => ({
        ...value,
        name: value.user.username,
        user: undefined,
      }));
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = ValueService;