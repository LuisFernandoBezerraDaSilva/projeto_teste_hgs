const Joi = require('joi');

class BaseService {
  constructor(model, schema) {
    this.model = model;
    this.schema = schema;
  }

  async create(data, schema, model) {
    try {
      this.validate(data, schema ? schema : this.schema);
      const modelToUse = model ? model : this.model;
      return await modelToUse.create({ data });
    } catch (e) {
      console.log(e);
    } 
  }

  async getAll() {
    try {
      return await this.model.findMany();
    } catch (e) {
      console.log(e);
    }
  }

  async getOne(id) {
    try{
      const item = await this.model.findUnique({ where: { id: Number(id) } });
      if (!item) throw new Error('Item not found');
      return item;
    } catch (e) {
      console.log(e);
    }
  }

  async update(id, data) {
    try{
      this.validate(data, this.schema);
      return await this.model.update({
        where: { id: Number(id) },
        data,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async delete(id) {
    try {
      return await this.model.delete({ where: { id: Number(id) } });
    } catch (e) {
      console.log(e);
    } 
  }

  validate(data, schema) {
    try{ 
      const { error } = schema.validate(data);
      if (error) {
        throw new Error(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
      }
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = BaseService;