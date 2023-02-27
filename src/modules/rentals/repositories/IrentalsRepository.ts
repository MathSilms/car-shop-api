import { IcreateRentalDTO } from "../dtos/ICreateRentalDTO";
import { Rental } from "../infra/typeorm/entities/Rental";

interface IRentalsRepository {
    findOpenRentalByCar(car_id): Promise<Rental>;
    findOpenRentalByUser(user_id): Promise<Rental>;
    create(data: IcreateRentalDTO): Promise<Rental>;
}

export { IRentalsRepository }