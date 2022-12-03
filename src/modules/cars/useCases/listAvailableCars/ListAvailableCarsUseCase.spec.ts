import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory; CarsRepositoryInMemory

describe("List Cars", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    })

    it("should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            "name": "Car1",
            "description": "CAr desc",
            "daily_rate": 110,
            "license_plate": "DEF-12133",
            "fine_amount": 100,
            "brand": "Audi",
            "category_id": "category+Id"
        })

        const cars = await listAvailableCarsUseCase.execute({});
        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by name ", async () => {
        const car = await carsRepositoryInMemory.create({
            "name": "Car2",
            "description": "CAr desc",
            "daily_rate": 110,
            "license_plate": "DEF-12133",
            "fine_amount": 100,
            "brand": "Audi2",
            "category_id": "category+Id"
        })

        const cars = await listAvailableCarsUseCase.execute({ brand: "Audi2" });
        expect(cars).toEqual([car]);
    })

    it("should be able to list all available cars by name ", async () => {
        const car = await carsRepositoryInMemory.create({
            "name": "Car3",
            "description": "CAr desc",
            "daily_rate": 110,
            "license_plate": "DEF-12133",
            "fine_amount": 100,
            "brand": "Audi2",
            "category_id": "category+Id"
        })

        const cars = await listAvailableCarsUseCase.execute({ name: "Car3" });
        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by category ", async () => {
        const car = await carsRepositoryInMemory.create({
            "name": "Car3",
            "description": "CAr desc",
            "daily_rate": 110,
            "license_plate": "DEF-12133",
            "fine_amount": 100,
            "brand": "Audi2",
            "category_id": "12345"
        })

        const cars = await listAvailableCarsUseCase.execute({ category_id: "12345" });
        expect(cars).toEqual([car]);
    })
})