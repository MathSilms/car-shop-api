import { IcreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IrentalsRepository";
import { getRepository, Repository } from "typeorm";
import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>;

    constructor() {
        this.repository = getRepository(Rental);
    }


    async findOpenRentalByCar(car_id: any): Promise<Rental> {
        const openByCar = await this.repository.findOne({ car_id });
        return openByCar;
    }
    async findOpenRentalByUser(user_id: any): Promise<Rental> {
        const openByUser = await this.repository.findOne({ user_id });
        return openByUser;
    }
    async create({ car_id, expected_return_date, user_id }: IcreateRentalDTO): Promise<Rental> {

        const rental = await this.repository.create({
            car_id,
            expected_return_date,
            user_id
        });

        await this.repository.save(rental);

        return rental;
    }

}

export { RentalsRepository }