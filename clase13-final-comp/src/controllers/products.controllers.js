const { productService } = require("../services")

class ProductController {
    constructor(){
        this.service = productService
    }

    getProducts = async (req, res) => {
        try {
           const products = await productService.getProuducts() 
            res.send({status: 'success', data: products})
        } catch (error) {
            console.log(error)
        }
    }
    getProduct = async (req, res) => {
        try {
            const { pid } = req.params
            const product = await productService.getProduct(pid) 
             res.send({status: 'success', data: product})
         } catch (error) {
             console.log(error)
         }
    }
    createProduct = async (req, res) => {
        try {
            const { body } = req
            const result = await productService.createProduct(body) 
             res.send({status: 'success', data: result })
         } catch (error) {
             console.log(error)
         }
    }
    updateProduct = (req, res) => {
        res.send('update product')
    }
    deleteProduct = (req, res) => {
        res.send('delete product')
    }
}

module.exports = {
    ProductController
}