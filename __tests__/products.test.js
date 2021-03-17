
const app = require('../src/app');
const request = require('supertest');
const mongoose = require('../src/config/database/DbConfig');

describe("Peoducts CRUD", () => {
    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    describe("Peoducts CRUD Products", () => {
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

            it("Should be Edit product and create new category", async () => {

                const response = await request(app).put(`/products/${productToBeEdited.body._id}`).send({
                    title: "produto B",
                    description: "descricao B edited",
                    price: 3.00,
                    category: "catNew"
                });
                expect(response.status).toBe(201);
            });
        });

        describe("Filter - list a product for title", () => {

            it("Should list the products that have in their title an excerpt of the parameter sent by query.title", async () => {
                const response = await request(app).get('/products/?title=a');

                expect.anything();
                expect(response.status).toBe(200);
            });

            it("Should not list the products if 'title' is not sent in query", async () => {
                const response = await request(app).get('/products/?anything');
                expect(response.status).toBe(404);
            });

            it("Should NOT list products if there is no data", async () => {
                const response = await request(app).get('/products/?title=blabla');
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

            it("Should NOT delete  the products if ID does not exists ", async () => {

                const response = await request(app).delete(`/products/60513a9cfd61132df8667cb2`)
                expect(response.status).toBe(404);
            });
        });
    });

    describe("Peoducts CRUD Categories", () => {
        describe("create - Create a new category", () => {
            it("Should be create a new Product", async () => {
                const response = await request(app).post("/categories").send({
                    name: "Cat AC"
                });
                expect(response.status).toBe(201);
            });

            it("Should be NOT create a new Product if category alread exists", async () => {
                const response = await request(app).post("/categories").send({
                    name: "Cat AC"
                });
                expect(response.status).toBe(401);
            });
            it("Should be NOT create a new Product if does not body.name", async () => {
                const response = await request(app).post("/categories").send({

                });
                expect(response.status).toBe(401);
            });
        });

        describe("Filter - Select especifc categories", () => {

            it("Should be list Product by its name", async () => {
                const response = await request(app).get("/categories/?name=a")
                expect(response.status).toBe(200);
            });

            it("Should be NOT list Product if name.query does not exists", async () => {
                const response = await request(app).get("/categories/blabla");
                expect(response.status).toBe(404);
            });

            it("Should be NOT list category if name.query alread exists but not found data", async () => {
                const response = await request(app).get("/categories/?name=blabla");
                expect(response.status).toBe(404);
            });

            it("Should be NOT list category if does not body.name", async () => {
                const response = await request(app).get("/categories").send();
                expect(response.status).toBe(404);
            });
        });

        describe("Update - Update categories", () => {
            it("Should be NOT create a new category if params _id is invalid ", async () => {

                const response = await request(app).put(`/categories/blabla`).send({
                    name: "Cat Edit1"
                });

                expect(response.status).toBe(404);
            });

            it("Should be NOT create a new category if params does not localized", async () => {

                const response = await request(app).put(`/categories/604255bb77da0a0e48790404`).send({
                    name: "Cat Edit"
                });

                expect(response.status).toBe(404);
            });

            it("Should be NOT create a new category if body.name not send", async () => {
                const createCategory = await request(app).post("/categories").send({
                    name: "Cat Edit-test-01"
                });

                const response = await request(app).put(`/categories/${createCategory.body._id}`).send();

                expect(response.status).toBe(401);
            });

            it("Should be create a new category", async () => {
                const createCategory = await request(app).post("/categories").send({
                    name: "Cat Edit-new-test-01"
                });
                const response = await request(app).put(`/categories/${createCategory.body._id}`).send({
                    name: "Cat Edited-new-test-01"
                });

                expect(createCategory.body).toHaveProperty("_id")
                expect(response.status).toBe(201);
            });

            it("Should be NOT create a new Product if name alread exists", async () => {
                const createCategory02 = await request(app).post("/categories").send({
                    name: "Cat Edit-new-test-02"
                });

                const createCategory03 = await request(app).post("/categories").send({
                    name: "Cat Edit-new-test-03"
                });

                const response = await request(app).put(`/categories/${createCategory02.body._id}`).send({
                    name: "Cat Edit-new-test-03"
                });

                expect(response.status).toBe(404);
            });
        });

        describe("Index - list all categories", () => {
            it("Should be list all categories ", async () => {

                const response = await request(app).get('/categories/list');

                expect(JSON.stringify(response.body)).toMatch("[");
                expect(response.status).toBe(200);
            });
        });

        describe("Destroy - Delete a category", () => {
            it("Should be NOT delete a category if invalid params._id", async () => {

                const response = await request(app).delete(`/categories/blabla`);
                expect(response.status).toBe(401);
            });
            
            it("Should be NOT delete a category if does not localized category", async () => {

                const response = await request(app).delete(`/categories/604255bb77da0a0e48790404`);
                expect(response.status).toBe(404);
            });

            it("Should be delete a category", async () => {

                const createCategory = await request(app).post("/categories").send({
                    name: "Cat delete-new-test-01"
                });

                const response = await request(app).delete(`/categories/${createCategory.body._id}`);
                expect(response.status).toBe(203);
            });
        });
    });
});