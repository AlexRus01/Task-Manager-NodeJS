const request = require('supertest');
const app = require('../../app'); // Assuming your Express app is exported from app.js or index.js
const Task = require('../../models/Task');

describe('PUT /tasks/:id', () => {
    it('should update an existing task', async () => {
        const task = new Task({ title: 'Old Task', description: 'Old description' });
        await task.save();

        const updatedTask = { title: 'Updated Task', description: 'Updated description' };

        const response = await request(app)
            .put(`/tasks/${task._id}`)
            .send(updatedTask)
            .expect(200);

        expect(response.body.task.title).toBe(updatedTask.title);
        expect(response.body.task.description).toBe(updatedTask.description);

        const updatedTaskInDb = await Task.findById(task._id);
        expect(updatedTaskInDb.title).toBe(updatedTask.title);
        expect(updatedTaskInDb.description).toBe(updatedTask.description);
    });
});
