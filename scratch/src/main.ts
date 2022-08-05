import { Controller, Module, Get } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";


@Controller()
class AppController {
    @Get()
    getRoot() {
        return "string";
    }

}

@Module({
    controllers: [AppController] // creates instances of stuff here
})
class AppModule {}

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    
    await app.listen(3000);
}

bootstrap();