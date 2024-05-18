import 'reflect-metadata'
import { DataSource, DataSourceOptions } from 'typeorm'
import { SeederOptions } from 'typeorm-extension'
import logger from '../logger'

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'potions-ecomm-db',
  synchronize: true,
  logging: false,
  entities: [__dirname + '/../../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/../../migration/*.{js,ts}'],
  seeds: [__dirname + '/seeds/*.{js,ts}'],
  factories: [__dirname + '/factories/*.{js,ts}'],
  subscribers: []
}

export const AppDataSource = new DataSource(options)

export const initializeDB = async () => {
  try {
    logger.info('********** Starting connection to Data Source... **********')
    // Initialize db connection
    await AppDataSource.initialize()
    logger.info('********** Data Source successfully initialized! **********')
    // Return db connection
    return AppDataSource
  } catch (error) {
    logger.info(
      '********** Error during Data Source initialization :( **********'
    )
  }
}
