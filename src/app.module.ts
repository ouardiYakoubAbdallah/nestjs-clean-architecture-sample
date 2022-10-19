import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { TypeOrmConfigModule } from './infrastructure/config/typeorm/typeorm.module';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';

@Module({
    imports: [EnvironmentConfigModule, TypeOrmConfigModule, LoggerModule, ExceptionsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
