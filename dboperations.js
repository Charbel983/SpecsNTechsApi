var config = require('./dbconfig');
const sql = require('mssql/msnodesqlv8');
const Product = require('./product');
const User = require('./user');
const { MAX } = require('mssql/msnodesqlv8');

async function getUsers () {
    try{
        let pool = await sql.connect(config);
        let user = await pool.request()
        .query("SELECT * from users ");
        return user.recordsets;
    }catch (error) {
        console.log(error);
    }
}

async function getUserById(userId){
    try{
        let pool = await sql.connect();
        let user = await pool.request().input("id", sql.Int, userId)
        .query("select * from users where id = @id");
        return user.recordsets;
    }catch(err){
        console.log(err);
    }
}

async function getUserByEmail(email) {
    try{
        let pool = await sql.connect(config);
        let user = await pool.request().input('username', sql.NVarChar(MAX),  email)
        .query("SELECT * from users where email = @email")
        return user.recordset;
    }catch(error){
        console.log(error);
    }
}

async function updateUser(id, firstname, lastname, username){
    try{
        let pool = await sql.connect(config);
        let u = await pool.request()
            .input('id', sql.Int, id)
            .input('firstname', sql.NVarChar(MAX), firstname)
            .input('lastname', sql.NVarChar(MAX), lastname)
            .input('username', sql.NVarChar(MAX), username)
            .query("update users set firstname = @firstname, lastname = @lastname, username = @username where id = @id");
            return u.recordsets;
    }catch(error){
        console.log(error);
    }
}


async function updateUserProfilePicture(email, profilepicture){
    try{
        let pool = await sql.connect(config);
        let profilepic = await pool.request()
        .input('email', sql.NVarChar(MAX), email)
        .input('profilepicture', sql.NVarChar(MAX), profilepicture)
        .query("update users set profilepicture = @profilepicture where email = @email");
        return profilepic.recordsets;
    }catch(error){
        console.log(error);
    }
}

async function updateUserPassword(id, password){
    try{
        let pool = await sql.connect(config);
        let pass = await pool.request()
        .input('id', sql.Int, id)
        .input('password', sql.NVarChar(MAX), password)
        .query("update users set password = @password where id = @id");
        return pass.recordsets;
    }catch(error){
        console.log(error);
    }
}

async function addUser(user){
    try {
        let pool = await sql.connect(config);
        let insertUser = await pool.request()
            .input('firstname', sql.NVarChar(MAX), user.firstname.toString())
            .input('lastname', sql.NVarChar(MAX), user.lastname.toString())
            .input('username', sql.NVarChar(MAX), user.username.toString())
            .input('email', sql.NVarChar(MAX), user.email.toString())
            .input('password', sql.NVarChar(MAX), user.password.toString())
            .input('isAdmin', sql.Bit, user.isAdmin)
            .input('profilepicture', sql.NVarChar(MAX), user.profilepicture.toString())
            .query("insert into users (firstname, lastname, username, email, password, isAdmin, profilepicture) values(@firstname, @lastname, @username, @email, @password, @isAdmin, @profilepicture)"); 
        return isertUser.recordsets;
    }catch(err){
        console.log(err);
    }
}

async function deleteUser(email){
    try{
        let pool = await sql.connect(config);
        let user = await pool.request().input('input_parameter', sql.NVarChar(MAX), email)
        .query("delete from users where email = @input_parameter");
        return user.recordsets;
    }catch(error){
        console.log(error);
    }
}

async function getProducts () {
    try {
        let pool = await sql.connect(config);
        let product = await pool.request()
        .query("SELECT * from products ");
        return product.recordsets;
    }catch (error) {
        console.log(error);
    }
}

async function getProductId(name) {
    try{
        let pool = await sql.connect(config);
        let id = await pool.request().input('name', sql.NVarChar(MAX),  name)
        .query("select id from products where name = @name");
        return id.recordsets;
    }catch(error) {
        console.log(error);
    }
}

async function getProduct (id) {
    try {
        let pool = await sql.connect(config);
        let product = await pool.request().input('input_parameter', sql.Int, id)
        .query("SELECT * from products where id = @input_parameter");
        return product.recordsets;
    }catch (error) {
        console.log(error);
    }
}

async function deleteProduct(id) {
    try{
        let pool = await sql.connect(config);
        let product = await pool.request().input('input_parameter', sql.Int, id)
        .query("delete from products where id = @input_parameter");
        return product.recordsets;
    }catch(error){
        console.log(error);
    }
}

async function updateProduct(id, product) {
    try{
        let pool = await sql.connect(config);
        let p = await pool.request().input('id', sql.Int, id)
            .input('name', sql.VarChar(255), product.name)
            .input('description', sql.VarChar(255), product.description)
            .input('price', sql.Int, product.price)
            .input('image', sql.VarChar(255), product.image)
            .input('tags', sql.VarChar(255), product.tags)
            .input('inStock', sql.Bit, product.inStock)
            .query("update products set name = @name, description = @description, price = @price, image = @image, tags = @tags, inStock = @inStock where id = @id");
            return p.recordsets;
    }catch(error){
        console.log(error);
    }
}

async function addProduct(product) {
    try {
        let pool = await sql.connect(config);
        let insertProduct = await pool.request()
            .input('name', sql.NVarChar(MAX), product.name.toString())
            .input('description', sql.NVarChar(MAX), product.description.toString())
            .input('price', sql.Int, product.price)
            .input('image', sql.NVarChar(MAX), product.image.toString())
            .input('tags', sql.NVarChar(MAX), product.tags.toString())
            .input('inStock', sql.Bit, product.inStock)
            .query("insert into products (name, description, price, image, tags, inStock) values(@name, @description, @price, @image, @tags, @inStock)"); 
        return insertProduct.recordsets;
    }catch(err){
        console.log(err);
    }
}

async function addProductToCart(userId, quantity, id, name, image, price, inStock){
    try{
        let pool = await sql.connect(config);
        let addProduct = await pool.request().input('id', sql.Int, id)
        .input('userId', sql.Int, userId)
        .input('name', sql.NVarChar(MAX), name)
        .input('image', sql.NVarChar(MAX), image)
        .input('price', sql.Int, price)
        .input('quantity', sql.Int, quantity)
        .input('inStock', sql.Bit, inStock)
        .query('insert into carts (productId, userId, productName, productImage, productPrice, productQuantity, productInStock) values(@id, @userId, @name, @image, @price, @quantity, @inStock)');

        return addProduct.recordsets;
    }catch(err){
        console.log(err);
    }
}

async function getCartById(userId){
    try{
        let pool = await sql.connect();
        let cart = await pool.request().input('userId', sql.Int, userId)
        .query('SELECT * from carts where userId = @userId');

        return cart.recordsets;
    }catch(err){
        console.log(err);
    }
}

async function getAllCarts(){
    try{
        let pool = await sql.connect();
        let carts = await pool.request().query('SELECT * from carts')
        return carts.recordsets;
    }catch(err){
        console.log(err);
    }
}

async function updateProductQuantityInCart(productId, userId, quantity){
    try{
        let pool = await sql.connect(config);
        let update = await pool.request().input('productId', sql.Int, productId)
        .input('userId', sql.Int, userId)
        .input('quantity', sql.Int, quantity)
        .query('update carts set productQuantity = @quantity where productId = @productId and userId = @userId');

        return update.recordsets;
    }catch(err){
        console.log(err);
    }
}

async function removeCartItem(userId, itemId){
    try{
        let pool = await sql.connect();
        let item = await pool.request().input("userId", sql.Int, userId)
        .input("itemId", sql.Int, itemId)
        .query("delete from carts where productId = @itemId and userId = @userId");
        return item.recordsets;
    }catch(err){
        console.log(err);
    }
}

module.exports = {
    getProducts : getProducts,
    getProduct : getProduct,
    addProduct : addProduct,
    deleteProduct : deleteProduct,
    updateProduct : updateProduct,
    getProductId : getProductId,
    getUsers : getUsers,
    getUserByEmail : getUserByEmail,
    addUser : addUser,
    updateUser : updateUser,
    updateUserProfilePicture : updateUserProfilePicture,
    updateUserPassword : updateUserPassword,
    deleteUser : deleteUser, 
    addProductToCart : addProductToCart,
    getCartById : getCartById,
    updateProductQuantityInCart : updateProductQuantityInCart,
    getAllCarts : getAllCarts,
    getUserById : getUserById,
    removeCartItem : removeCartItem
}