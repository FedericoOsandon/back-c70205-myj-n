class ProductRepository {
    constructor(dao){
        this.dao = dao
    }

    getProuducts  = () => this.dao.get()
    getProduct    = filter => this.dao.getBy(filter)
    createProduct = newProduct => this.dao.create(newProduct)
    updateProduct = (pid, productToUpdate) => this.dao.update(pid, productToUpdate)
    deleteProduct = pid => this.dao.delete(pid)
}

module.exports = ProductRepository