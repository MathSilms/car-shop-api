import { container } from "tsyringe";

import "@shared/container/providers"

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository"
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository"

import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";

import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { CarsImagesRepository } from "@modules/cars/infra/typeorm/repositories/CarsImagesRepository";

import { IRentalsRepository } from "@modules/rentals/repositories/IrentalsRepository";
import { RentalsRepository } from "@modules/rentals/infra/typeorm/repositories/RentalsRepository";




// ICategoriesRepository
container.registerSingleton<ICategoriesRepository>("CategoriesRepository", CategoriesRepository);
// ISpecificationRepository
container.registerSingleton<ISpecificationRepository>("SpecificationsRepository", SpecificationsRepository);
// IUsersRepository
container.registerSingleton<IUsersRepository>("UsersRepository", UsersRepository);

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);

container.registerSingleton<ICarsImagesRepository>("CarsImagesRepository", CarsImagesRepository);

container.registerSingleton<IRentalsRepository>("RentalsRepository", RentalsRepository);
