import app from '../src/index';
import { expect } from 'chai';
import { HttpCode } from '../src/util/httpCode';
import { agent as request} from 'supertest';


const base_url = '/api/v1';

describe('general routes', () => {
  it('should return 404 for non-existing routes', async () => {
    const response = await request(app).get(base_url + '/doesnot-exist')
      .set('Accept', 'application/json');
    expect(response.status).to.equal(HttpCode.NOT_FOUND);
    expect(response.body).to.include({ success: false, status_code: HttpCode.NOT_FOUND, message: 'Route /api/v1/doesnot-exist not found', data: null });
  });

  it('it should return okay for health check', async () => {
    const response = await request(app).get(base_url + '/healthcheck')
      .set('Accept', 'application/json');
    
    expect(response.status).to.equal(HttpCode.OK);
    expect(response.body).to.include({ success: true, status_code: HttpCode.OK, message: 'Service available' });
  })
});
