import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication System (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('handles a signup request', async () => {
        const res = await request(app.getHttpServer())
            .post('/auth/signup')
            .send({ email: 'asd@asd.csom', password: 'can' })
            .expect(201);
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(email);
    });
    // it('signup as a new user then get the currently logged in user', async () => {
    //     const email = 'epasd@asd.com';
    //     const res = request(app.getHttpServer())
    //     .post('/auth/signup')
    //     .send({email, password: 'cancain'})
    //     .expect(201)
    //     console.log(res)
    //     const cookie = res.get('Set-Cookie')
    //     console.log(cookie)
    //     const {body} = await request(app.getHttpServer())
    //     .get('/auth/whoami')
    //     .set('Cookie', cookie)
    //     .expect(200);
        
    //     expect(body.email).toEqual(email);
    // });
});
