import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";
import { SpecificationInMemory } from "@modules/cars/repositories/in-memory/SpecificationInMemory";
import { AppError } from "@shared/errors/appError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let SpecificationRepositoryInMemory: SpecificationInMemory;

describe("Creaate Car Specification", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        SpecificationRepositoryInMemory = new SpecificationInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory, SpecificationRepositoryInMemory);

    });

    it("should not be able to add a new specification to a now-existent car car", async () => {

        expect(async () => {
            const car_id = "1234";
            const specifications_id = ["5421"];

            await createCarSpecificationUseCase.execute({ car_id, specifications_id });
        }).rejects.toBeInstanceOf(AppError)
    })

    it("should be able to add a new specification to the car", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "name Car",
            description: "Description car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Bramd",
            category_id: "category",
        });

        const specification = await SpecificationRepositoryInMemory.create({
            description: "test",
            name: "test"
        });

        const specifications_id = [specification.id];

        const specificationsCars = await createCarSpecificationUseCase.execute({ car_id: car.id, specifications_id });

        expect(specificationsCars).toHaveProperty("specifications");
        expect(specificationsCars.specifications.length).toBe(1);
    })
})