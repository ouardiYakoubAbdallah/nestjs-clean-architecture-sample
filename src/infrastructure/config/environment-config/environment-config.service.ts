import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from '../../../domain/config/database.interface';

@Injectable()
export class EnvironmentConfigService implements DatabaseConfig {
    constructor(private configService: ConfigService) {}

    getDatabaseHost(): string {
        return this.configService.get<string>('DTABASE_HOST');
    }
    getDatabasePort(): number {
        return this.configService.get<number>('DATABASE_PORT');
    }
    getDatabaseUser(): string {
        return this.configService.get<string>('DTABASE_USER');
    }
    getDatabasePassword(): string {
        return this.configService.get<string>('DTABASE_PASSWORD');
    }
    getDatabaseName(): string {
        return this.configService.get<string>('DTABASE_NAME');
    }
    getDatabaseSchema(): string {
        return this.configService.get<string>('DTABASE_SCHEMA');
    }
    getDatabaseSync(): boolean {
        return this.configService.get<boolean>('DATABASE_SYNCHRONIZE');
    }
}
