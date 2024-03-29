import { app } from '@shared/infra/http/app';
import request from 'supertest';
import { v4 as uuidv4 } from "uuid";
import createConnection from "@shared/infra/typeorm";
import { Connection } from 'typeorm';
import { hash } from 'bcryptjs';


let connection: Connection;

describe("Create Category Controller", () => {

    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        const id = uuidv4()
        const password = await hash("admin", 8)

        await connection.query(
            `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
            values('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', 'XXXXXX' )
        `
        );
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });


    it("should be able to list all categories", async () => {
        const responseToken = await request(app).post("/sessions").send({
            "email": "admin@rentx.com",
            "password": "admin"
        });

        const { token } = responseToken.body;

        await request(app).post("/categories").send({
            "name": "teste",
            "description": "Categoria de supertest"
        }).set({
            Authorization: `Bearer ${token}`
        });

        const response = await request(app).get("/categories");

        console.log(response);
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty("id");
        expect(response.body[0].name).toEqual("teste");
    });

    // it("should not be able to create a new category", async () => {
    //     const responseToken = await request(app).post("/sessions").send({
    //         "email": "admin@rentx.com",
    //         "password": "admin"
    //     });

    //     const { token } = responseToken.body;

    //     const response = await request(app).post("/categories").send({
    //         "name": "teste",
    //         "description": "Categoria de supertest"
    //     }).set({
    //         Authorization: `Bearer ${token}`
    //     });

    //     expect(response.status).toBe(400);
    // });
});