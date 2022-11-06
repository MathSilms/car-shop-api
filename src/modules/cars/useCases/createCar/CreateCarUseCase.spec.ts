import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";
import { AppError } from "@shared/errors/appError";
import { CreateCarUseCase } from "./CreateCarUseCase";


let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarseCase: CreateCarUseCase;


describe("Create Car", ()=>{

    beforeEach(()=>{
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarseCase = new CreateCarUseCase(carsRepositoryInMemory);
    })

    it("should be able to create car", async ()=>{

        const car = await createCarseCase.execute({
            name:"name Car",
            description: "Description car", 
            daily_rate:100, 
            license_plate:"ABC-1234",
            fine_amount:60, 
            brand:"Bramd", 
            category_id:"category", 
        });

        expect(car).toHaveProperty("id");
    });

    it("should be not be able to create a car with exists license plate", async ()=>{
        expect(async ()=>{
            await createCarseCase.execute({
                name:"Car",
                description: "Description car", 
                daily_rate:100, 
                license_plate:"ABC-1234",
                fine_amount:60, 
                brand:"Bramd", 
                category_id:"category", 
            });

            await createCarseCase.execute({
                name:"Car2",
                description: "Description car", 
                daily_rate:100, 
                license_plate:"ABC-1234",
                fine_amount:60, 
                brand:"Bramd", 
                category_id:"category", 
            });
        }).rejects.toBeInstanceOf(AppError);
    })

    it("should be able to create a car with available true by default", async ()=>{
        const car = await createCarseCase.execute({
            name:"Car Available",
            description: "Description car", 
            daily_rate:100, 
            license_plate:"ABCD-1234",
            fine_amount:60, 
            brand:"Bramd", 
            category_id:"category", 
        });

        expect(car.available).toBe(true);
    })
})