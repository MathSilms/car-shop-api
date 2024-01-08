import dayjs from 'dayjs';

import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/rentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DayjsProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/appError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsProvider: DayjsDateProvider;

describe('Create Rental', () => {
    const dayAdd24Hours = dayjs().add(1, 'day').toDate();

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        dayjsProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            dayjsProvider,
        );
    });

    it('should be able to create Rental', async () => {
        const rental = await createRentalUseCase.execute({
            user_id: '123Teste',
            car_id: '121212',
            expected_return_date: dayAdd24Hours,
        });

        expect(rental).toHaveProperty('id');
        expect(rental).toHaveProperty('start_date');
    });

    it('should not be able to create a new Rental if therer another open to the same user', async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: '123Teste',
                car_id: '121212',
                expected_return_date: dayAdd24Hours,
            });

            await createRentalUseCase.execute({
                user_id: '123Teste',
                car_id: '121212',
                expected_return_date: dayAdd24Hours,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create a new Rental if therer another open to the same car', async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: 'teste123',
                car_id: '121212',
                expected_return_date: dayAdd24Hours,
            });

            await createRentalUseCase.execute({
                user_id: '123Teste',
                car_id: '121212',
                expected_return_date: dayAdd24Hours,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create a new Rental with invalid return time', async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: 'teste123',
                car_id: '121212',
                expected_return_date: dayjs().toDate(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
