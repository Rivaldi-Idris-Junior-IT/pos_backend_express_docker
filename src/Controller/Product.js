const model = require('../Model/Product')
const { request, response } = require('express')
const redis = require("../Config/redis")
const result = require("../Helper/respon")
// Membuat bungkusan dengan variabel
const Product = {}

Product.all = async (req, res) => {
    try {
        const data = await model.GetAll()
        const data_redis = JSON.stringify(data)
        redis.redisdb.setex("getAll", 10, data_redis)                
        return result(res,200, data)
    }catch(error) {
        return res.send("errror")
    }
}

Product.search = async (request, response) => {
    try {
        const  nama = request.params.nama
        console.log(nama);
        const data = await model.searchName(nama)
        return response.send(data);
    }catch (error) {
        return response.status(500).json(error)
    }
}

Product.joinall = async (request,response) => {
    try {
        const data = await model.JoinAll()
        return response.send(data)
    } catch (error) {
        return response.send("error")
    }
}

Product.add = async (req, res) => {    
    try {
        if(req.file === undefined) {
            console.log(req.file)
            return res.status(500).json("Data Kosong")
        }
        const data_product = {
            nama : req.body.nama,
            harga : req.body.harga,
            stok : req.body.stok,
            kategori_id : req.body.kategori_id,
            link_gambar : req.file.path,
        }
        console.log(data_product)
        const data = await model.Add(data_product.nama, data_product.harga, data_product.stok, data_product.kategori_id, data_product.link_gambar)
        return result(res, 201, data_product)      
    } catch (error) {
        return res.status(500).json(error)
    }         
}

Product.edit = async (req, res) => {
    try {
        const { id, nama, harga, stok,kategori_id,link_gambar} = req.body
        const data = await model.Edit(id, nama, harga, stok, kategori_id,link_gambar)
        return res.send(data)   
    } catch (error) {
        return res.status(500).json(error)
    }    
}

Product.delete = async (req, res) => {
    try {
        const {id} = req.params
        const data = await model.Delete(id)
        return res.send(data)    
    } catch (error) {
        return res.status(500).json(error)
    }
    
}


// Export file Product.js pada folder controller ke file di dalam folder yang membutuhkan
module.exports = Product