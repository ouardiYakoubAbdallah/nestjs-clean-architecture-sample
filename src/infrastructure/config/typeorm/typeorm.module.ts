import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';

export const getTypeOrmModuleOptions = (
    config: EnvironmentConfigService,
): TypeOrmModuleOptions =>
    ({
        type: 'postgres',
        host: config.getDatabaseHost(),
        port: config.getDatabasePort(),
        username: config.getDatabaseUser(),
        password: config.getDatabasePassword(),
        database: config.getDatabaseName(),
        entities: [__dirname + './../../../**/*.entity{.ts,.js}'],
        synchronize: false,
        schema: process.env.DATABASE_SCHEMA,
        ssl: {
            rejectUnauthorized: false,
        },
    } as TypeOrmModuleOptions);

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [EnvironmentConfigService],
            inject: [EnvironmentConfigService],
            useFactory: getTypeOrmModuleOptions,
        }),
    ],
})
export class TypeOrmConfigModule {}
