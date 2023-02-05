import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";


class CarsRepositoryInMemory implements ICarsRepository {



    cars: Car[] = [];

    async create({ brand, category_id, daily_rate, description, fine_amount, license_plate, name, id }: ICreateCarDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, {
            name,
            description,
            daily_rate,
            license_plate,
            brand,
            category_id,
            fine_amount,
            id
        });

        this.cars.push(car);

        return car;

    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find(car => car.license_plate === license_plate)
    }

    async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
        const all = this.cars.filter((c) => {
            if (c.available === true ||
                (brand && c.brand === brand) ||
                (category_id && c.category_id === category_id) ||
                (name && c.name === name)) {
                return c;
            }
            return null;
        });

        return all;
    }

    async findById(id: string): Promise<Car> {
        return this.cars.find(car => car.id === id);
    }
}

export { CarsRepositoryInMemory }