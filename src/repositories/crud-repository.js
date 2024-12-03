const { where } = require("sequelize");
const {logger} = require("../config")

class CrudRepository{

    constructor(model){
        this.model = model;
    }

    async create(data){
        try {
            const response = await this.model.create(data);
            return response;
        } catch (error) {
            logger.error("Something went wrong in the Crud Repo : create")
            throw error;
        }
    }

    async destroy(data){
        try {
            const response = await this.model.destroy({
                where: {
                    id : data,
                }
            });
            return response;
        } catch (error) {
            logger.error("Something went wrong in the Crud Repo : destroy")
            throw error;
        }
    }

    async getAll(){
        try {
            const response = await this.model.findAll();
            return response;
        } catch (error) {
            logger.error("Something went wrong in the Crud Repo : getAll")
            throw error;
        }
    }

    async findByPk(data){
        try {
            const response = await this.model.findByPk(data);
            return response;
        } catch (error) {
            logger.error("Something went wrong in the Crud Repo : find by pk")
            throw error;
        }
    }

    async update(id,data){ // data is given in the form of object { col : val,....}
        try {
            const response = await this.model.update(data,{
                where : {
                    id : id
                }
            });
            return response;
        } catch (error) {
            logger.error("Something went wrong in the Crud Repo : update")
            throw error;
        }
    }
}

module.exports = CrudRepository;