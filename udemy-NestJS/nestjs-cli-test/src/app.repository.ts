import { AppEntity } from "./app.entity";
import { Repository, CustomRepository } from "typeorm";

@CustomRepository(AppEntity)
export class UserRepository extends Repository<AppEntity> {}