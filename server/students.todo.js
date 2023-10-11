// const db = require('./db/db')
// const request = require('supertest')
// const server = require('./server')

// jest.mock('./db/db')

// jest.spyOn(console, 'error')

// afterEach(() => {
//   console.error.mockReset()
// })

// describe('GET allStudents /api/v1/students', () => {
//   test('returns all students', () => {
//     const mockStudentData = [
//       { id: 3, name: 'jim jim' },
//       { id: 6, name: 'Sarah' },
//       { id: 7, name: 'Hone' },
//     ]
//     expect.assertions(2)

//     db.getAllStudents.mockReturnValue(Promise.resolve(mockStudentData))
//     return request(server)
//       .get('/api/v1/students')
//       .then((res) => {
//         expect(res.body[0].id).toBe(3)
//         expect(res.body).toHaveLength(3)
//         return null
//       })
//   })
//   test('getAllStudents reject', () => {
//     db.getAllStudents.mockImplementation(() =>
//       Promise.reject(new Error('test error message'))
//     )
//     console.error.mockImplementation(() => {})
//     return request(server)
//       .get('/api/v1/students')
//       .then((res) => {
//         expect(res.status).toBe(500)
//         expect(console.error).toHaveBeenCalledWith('test error message')
//         return null
//       })
//   })
// })
