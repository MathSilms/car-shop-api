import { container } from "tsyringe";

import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository" 
import { CategoriesRepository } from "../../modules/cars/repositories/implementations/CategoriesRepository" 

import { SpecificationsRepository } from "../../modules/cars/repositories/implementations/SpecificationRepository";
import { ISpecificationRepository } from "../../modules/cars/repositories/ISpecificationRepository";

import { IUSersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { UsersRepository } from "../../modules/accounts/repositories/implementations/UsersRepository";

// ICategoriesRepository
container.registerSingleton<ICategoriesRepository>("CategoriesRepository",CategoriesRepository);
// ISpecificationRepository
container.registerSingleton<ISpecificationRepository>("SpecificationsRepository",SpecificationsRepository);
// IUsersRepository
container.registerSingleton<IUSersRepository>("UsersRepository",UsersRepository);