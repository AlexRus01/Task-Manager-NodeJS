const request = require('supertest');
const app = require('../../app'); // Assuming your Express app is exported from app.js or index.js
const Task = require('../../models/Task');

describe('GET /tasks', () => {
    it('should retrieve all tasks', async () => {
        const tasks = await Task.find({});

        const response = await request(app)
            .get('/tasks')
            .expect(200);

        expect(response.body.tasks.length).toBe(tasks.length);
    });
});
