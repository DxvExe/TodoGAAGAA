const request = require('supertest');
const assert = require('assert');
const mongoose = require('mongoose');
const Task = require('./src/models/Task');
const app = require('./src/app');

let inMemoryTasks = [];

Task.create = async function (data) {
  const newTask = {
    _id: new mongoose.Types.ObjectId(),
    title: data.title,
    description: data.description || '',
    completed: data.completed || false,
    createdAt: new Date(),
    updatedAt: new Date(),
    toJSON() {
      const copy = { ...this };
      copy.id = this._id.toString();
      delete copy.__v;
      return copy;
    }
  };
  inMemoryTasks.push(newTask);
  return newTask;
};

Task.find = function (query = {}) {
  let filtered = [...inMemoryTasks];

  if (query.completed !== undefined) {
    filtered = filtered.filter((t) => t.completed === query.completed);
  }

  if (query.$or) {
    const titleRegex = query.$or[0].title.$regex;
    const re = new RegExp(titleRegex, 'i');
    filtered = filtered.filter((t) => re.test(t.title) || re.test(t.description));
  }

  return {
    sort: function () {
      return Promise.resolve(filtered);
    }
  };
};

Task.findById = async function (id) {
  const found = inMemoryTasks.find((t) => t._id.toString() === id.toString());
  return found || null;
};

Task.findByIdAndUpdate = async function (id, update, options) {
  const index = inMemoryTasks.findIndex((t) => t._id.toString() === id.toString());
  if (index === -1) return null;

  const current = inMemoryTasks[index];
  const updated = {
    ...current,
    ...update,
    updatedAt: new Date()
  };
  inMemoryTasks[index] = updated;
  return updated;
};

Task.findByIdAndDelete = async function (id) {
  const index = inMemoryTasks.findIndex((t) => t._id.toString() === id.toString());
  if (index === -1) return null;
  const deleted = inMemoryTasks.splice(index, 1)[0];
  return deleted;
};

async function runTests() {
  console.log('--- STARTING COMPREHENSIVE BACKEND API TESTS ---');
  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
    try {
      await fn();
      console.log(`[PASS] ${name}`);
      passed++;
    } catch (err) {
      console.error(`[FAIL] ${name}: ${err.message}`);
      failed++;
    }
  }

  let createdId = null;

  await test('POST /api/v1/tasks creates a task and returns 201', async () => {
    const res = await request(app)
      .post('/api/v1/tasks')
      .send({ title: 'Complete Assignment 7', description: 'API Design and Planning' });

    assert.strictEqual(res.status, 201);
    assert.strictEqual(res.body.success, true);
    assert.strictEqual(res.body.data.title, 'Complete Assignment 7');
    assert.strictEqual(res.body.data.completed, false);
    assert.ok(res.body.data.id || res.body.data._id);
    createdId = res.body.data.id || res.body.data._id;
  });

  await test('GET /api/v1/tasks retrieves all tasks and returns 200', async () => {
    const res = await request(app).get('/api/v1/tasks');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.success, true);
    assert.strictEqual(Array.isArray(res.body.data), true);
    assert.strictEqual(res.body.data.length, 1);
  });

  await test('GET /api/v1/tasks/:id retrieves a specific task and returns 200', async () => {
    const res = await request(app).get(`/api/v1/tasks/${createdId}`);
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.success, true);
    assert.strictEqual(res.body.data.title, 'Complete Assignment 7');
  });

  await test('PUT /api/v1/tasks/:id updates a task and returns 200', async () => {
    const res = await request(app)
      .put(`/api/v1/tasks/${createdId}`)
      .send({ title: 'Complete Full-Stack Application', description: 'Updated description', completed: true });

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.success, true);
    assert.strictEqual(res.body.data.title, 'Complete Full-Stack Application');
    assert.strictEqual(res.body.data.completed, true);
  });

  await test('PATCH /api/v1/tasks/:id toggles task completion and returns 200', async () => {
    const res = await request(app)
      .patch(`/api/v1/tasks/${createdId}`)
      .send({ completed: false });

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.success, true);
    assert.strictEqual(res.body.data.completed, false);
  });

  await test('GET /api/v1/tasks?search=Full-Stack finds matched tasks', async () => {
    const res = await request(app).get('/api/v1/tasks?search=Full-Stack');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.data.length, 1);
  });

  await test('GET /api/v1/tasks?status=completed filters tasks', async () => {
    const res = await request(app).get('/api/v1/tasks?status=completed');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.data.length, 0);
  });

  await test('GET /api/v1/tasks?status=pending filters tasks', async () => {
    const res = await request(app).get('/api/v1/tasks?status=pending');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.data.length, 1);
  });

  await test('POST /api/v1/tasks with empty title returns 400 Bad Request', async () => {
    const res = await request(app)
      .post('/api/v1/tasks')
      .send({ title: '   ' });

    assert.strictEqual(res.status, 400);
    assert.strictEqual(res.body.success, false);
  });

  await test('GET /api/v1/tasks with invalid ObjectId returns 400 Bad Request', async () => {
    const res = await request(app).get('/api/v1/tasks/not-a-valid-id');
    assert.strictEqual(res.status, 400);
    assert.strictEqual(res.body.success, false);
  });

  await test('GET /api/v1/tasks with nonexistent ObjectId returns 404 Not Found', async () => {
    const dummyId = new mongoose.Types.ObjectId().toString();
    const res = await request(app).get(`/api/v1/tasks/${dummyId}`);
    assert.strictEqual(res.status, 404);
    assert.strictEqual(res.body.success, false);
  });

  await test('DELETE /api/v1/tasks/:id deletes task and returns 204 No Content', async () => {
    const res = await request(app).delete(`/api/v1/tasks/${createdId}`);
    assert.strictEqual(res.status, 204);
  });

  await test('GET /api/v1/tasks/:id on deleted task returns 404 Not Found', async () => {
    const res = await request(app).get(`/api/v1/tasks/${createdId}`);
    assert.strictEqual(res.status, 404);
  });

  console.log(`\nTEST SUMMARY: ${passed} passed, ${failed} failed.`);
  if (failed > 0) process.exit(1);
}

runTests();
