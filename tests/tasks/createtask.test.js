const request = require('supertest');
const app = require('../../app'); // Assuming your Express app is exported from app.js or index.js
const Task = require('../../models/Task');

describe('POST /tasks', () => {
    it('should create a new task', async () => {
        const newTask = { title: 'Test Task', description: 'Test description' };

        const response = await request(app)
            .post('/tasks')
            .send(newTask)
            .expect(201);

        expect(response.body.task).toHaveProperty('_id');
        expect(response.body.task.title).toBe(newTask.title);
        expect(response.body.task.description).toBe(newTask.description);

        const task = await Task.findById(response.body.task._id);
        expect(task).not.toBeNull();
        expect(task.title).toBe(newTask.title);
        expect(task.description).toBe(newTask.description);
    });
});
