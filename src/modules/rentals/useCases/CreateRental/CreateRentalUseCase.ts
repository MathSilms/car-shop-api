import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IrentalsRepository";
import { IDateProvider } from "@shared/container/providers/DayjsProvider/IDateProvider";
import { AppError } from "@shared/errors/appError";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { inject, injectable } from "tsyringe";

dayjs.extend(utc);
interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date
}

@injectable()
class CreateRentalUseCase {

    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DateProvider")
        private dateProvider: IDateProvider
    ) { }
    async execute({ user_id, car_id, expected_return_date }: IRequest): Promise<Rental> {
        const minimumHours = 24;

        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);
        if (carUnavailable) throw new AppError("Car is unavailable")

        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

        if (rentalOpenToUser) throw new AppError("there's a rental in progress by user")

        const dateNow = this.dateProvider.dateNow();
        const compare = this.dateProvider.compareInHours(expected_return_date, dateNow);

        if (compare > minimumHours)
            throw new AppError("Invalid return time!");


        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date,
        });

        return rental;
    }


}

export { CreateRentalUseCase }