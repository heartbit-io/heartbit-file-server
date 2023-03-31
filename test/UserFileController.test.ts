import { expect } from 'chai';
import app from '../src';
import {agent as request} from 'supertest';
import { HttpCode } from '../src/util/httpCode';
import UserFile from '../src/models/UserFileSchema';


const base_url = '/api/v1';

describe('create a user file', () => {
     afterEach(async () => {
        await UserFile.deleteMany({});
     });
    
    const user_id = '93ODKADJAIDDJAD8EJDIDKAJ';
    const file = './files/test.png';
    const title = new Date().toString() + 'file upload test';

    it('it should create a file', async () => {
        const response = await request(app).post(base_url + '/userfiles/create')
            .attach('file', file)
            .field('user_id', user_id)
            .field('file_title', title)
            .set('Accept', 'application/json');
        expect(response.status).to.equal(HttpCode.CREATED);
        expect(response.body).to.include({ success: true, status_code: HttpCode.CREATED, message: 'User file saved successfully' });
        expect(response.body.data).to.contain({ user_id, file_title: title });
    })
        
    it('it should return all user files', async () => {
        const response = await request(app).get(`${base_url}/userfiles/${user_id}`).set('Accept', 'application/json');
        expect(response.status).to.equal(HttpCode.OK);
        expect(response.body.data).to.be.an('array');
        expect(response.body).to.include({ success: true, status_code: HttpCode.OK, message: 'All user files' });
    })

    it('it should return a specific user file', async () => {
        const new_title = new Date().toString() + ' get all user files test';
        const response = await request(app).post(base_url + '/userfiles/create')
            .attach('file', file)
            .field('user_id', user_id)
            .field('file_title', new_title)
            .set('Accept', 'application/json');
        
        const file_id = response.body.data._id;
        const result = await request(app).get(`${base_url}/userfiles/files/${file_id}`).set('Accept', 'application/json');
        expect(result.status).to.equal(HttpCode.OK);
        expect(result.body.data).to.be.an('object');
        expect(result.body).to.include({ success: true, status_code: HttpCode.OK, message: 'successfully retrieved file' });
    })

    it('should delete a userfile', async () => {
         const new_title = new Date().toString() + ' delete file test';
        const response = await request(app).post(base_url + '/userfiles/create')
            .attach('file', file)
            .field('user_id', user_id)
            .field('file_title', new_title)
            .set('Accept', 'application/json');
        
        const file_id = response.body.data._id;
        const result = await request(app).delete(`${base_url}/userfiles/${file_id}`).set('Accept', 'application/json');
        expect(result.status).to.equal(HttpCode.OK);
        expect(result.body).to.include({ success: true, status_code: HttpCode.OK, message: `file ${file_id} deleted successfully`, data: null });
    })

    it('should return validation error for duplicate file title', async () => {
         await request(app).post(base_url + '/userfiles/create')
            .attach('file', file)
            .field('user_id', user_id)
            .field('file_title', title)
            .set('Accept', 'application/json');

        const response = await request(app).post(base_url + '/userfiles/create')
            .attach('file', file)
            .field('user_id', user_id)
            .field('file_title', title)
            .set('Accept', 'application/json');
        
        expect(response.status).to.equal(HttpCode.BAD_REQUEST);
        expect(response.body.message).to.equal(`Validation error`);
    })

    it('should return validation error if user id is not supplied', async () => {
        const new_title = new Date().toString();
        const response = await request(app).post(base_url + '/userfiles/create')
            .attach('file', file)
            .field('file_title', new_title)
            .set('Accept', 'application/josn');
        expect(response.status).to.equal(HttpCode.BAD_REQUEST);
        expect(response.body.success).to.equal(false);
        expect(response.body.message).to.equal('Validation error');
        expect(response.body.data).to.deep.include({ msg: 'User id is required', param: 'user_id', location: 'body' })
    })

    it('should return validation error if file is not supplied', async () => {
        const new_title = new Date().toString();

        const response = await request(app).post(base_url + '/userfiles/create')
            .attach('file', false)
            .field('user_id', user_id)
            .field('file_title', new_title)
            .set('Accept', 'application/json');
        expect(response.status).to.equal(HttpCode.BAD_REQUEST);
        expect(response.body).to.include({success: false, status_code: HttpCode.BAD_REQUEST, message: 'Select file to upload', data: null});
    })

    it('should return validation error if file title is not supplied', async () => {
        const response = await request(app).post(base_url + '/userfiles/create')
            .attach('file', file)
            .field('user_id', user_id)
            .set('Accept', 'application/json');
        expect(response.status).to.equal(HttpCode.BAD_REQUEST);
        expect(response.body).to.include({ success: false, status_code: HttpCode.BAD_REQUEST, message: 'Validation error' });
    })

})
