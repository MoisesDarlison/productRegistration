
const app = require('../src/app');
const request = require('supertest');
const mongoose = require('../src/config/database/DbConfig');

describe("Peoducts CRUD", () => {
    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });


    describe("create - Create a new product", () => {
        it("Should be NOT create a new Product", async () => {
            const response = await request(app).post("/products").send({
                title: "produto A",
                description: "descricao A",
                category: "catA"
            });

            expect(response.status).toBe(401);
        });

        it("Should be create a new Product", async () => {
            const response = await request(app).post("/products").send({
                title: "produto A",
                description: "descricao A",
                price: 1.00,
                category: "catA"
            });

            expect(response.status).toBe(201);
        });

        it("Should be NOT create a new Product if 'name' product alread exists", async () => {
            const response = await request(app).post('/products').send({
                title: "produto A",
                description: "descricao A replay",
                price: 1.00,
                category: "catA"
            });
            expect(response.status).toBe(401);
        });
    });

    describe("index - List all products with categories", () => {
        it("Should be List all products with categories", async () => {
            const response = await request(app).get('/products/list');

            expect(JSON.stringify(response.body)).toMatch("[");
            expect(response.status).toBe(200);
        });

    });

    describe("Update - edit products", () => {

        //Var for save Product ID
        let productToBeEdited = undefined;

        it("Should be Edit product", async () => {
            //create produt for to be edited in all tests  of describe "UPDATE"
            productToBeEdited = await request(app).post("/products").send({
                title: "produto B",
                description: "descricao B",
                price: 2.00,
                category: "catB"
            });

            const response = await request(app).put(`/products/${productToBeEdited.body._id}`).send({
                title: "produto B",
                description: "descricao B edited",
                price: 3.00,
                category: "catB"
            });

            expect(response.status).toBe(201);
        });

        it("Should be NOT edit product if id product does not objectID mongoose  valid", async () => {

            const response = await request(app).put(`/products/blabla`).send({
                title: "produto H",
                description: "descricao B edited",
                price: 4.00,
                category: "catC"
            });

            expect(response.status).toBe(404);
        });

        it("Should be NOT edit product if id product does not exists", async () => {

            const response = await request(app).put(`/products/60425688255bab33342304e7`).send({
                title: "produto H",
                description: "descricao B edited",
                price: 4.00,
                category: "catC"
            });

            expect(response.status).toBe(404);
        });

        it("Should be NOT edit product if name of product alread registred on another product", async () => {

            const response = await request(app).put(`/products/${productToBeEdited.body._id}`).send({
                title: "produto A",
                description: "descricao B edited",
                price: 4.00,
                category: "catC"
            });

            expect(response.status).toBe(401);
        });
    });

    describe("List - list a product for title", () => {

        it("Should list the products that have in their title an excerpt of the parameter sent by query.title", async () => {
            const response = await request(app).get('/products/?title=a');

            expect(response.body).toHaveProperty('product');
            expect(response.status).toBe(200);
        });
        it("Should not list the products if 'title' is not sent in query", async () => {
            const response = await request(app).get('/products/?anything');
            expect(response.status).toBe(404);
        });

    });
    describe("Destroy - Delete a product by its ID ", () => {

        it("Should delete the products that by its ID sending in params.id ", async () => {

            const createProduct = await request(app).post("/products").send({
                title: "produto D",
                description: "Product deleted",
                price: 4.00,
                category: "catA"
            });
            const response = await request(app).delete(`/products/${createProduct.body._id}`)
            expect(response.status).toBe(203);
        });
        it("Should NOT delete  the products if ID is invalid ", async () => {

            const createProduct = await request(app).post("/products").send({
                title: "produto D2",
                description: "Product deleted 2",
                price: 4.00,
                category: "catA"
            });
            const response = await request(app).delete(`/products/blabla`)
            expect(response.status).toBe(404);
        });
    });



});