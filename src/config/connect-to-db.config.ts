import { AppDataSource } from "./typeorm.config";

export async function connectToDb() {
    await AppDataSource.initialize()
} 