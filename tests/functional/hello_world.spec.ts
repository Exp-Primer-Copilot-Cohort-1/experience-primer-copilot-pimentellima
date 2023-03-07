import { test } from '@japa/runner'

test.group('Hello World', () => {
  test('display welcome page', async ({ client }) => {
    const response = await client.get('/')
    response.assertStatus(200)
    response.assertBodyContains({ hello: 'world' })
  })

  test('display get unities admin', async ({ client }) => {
    const response = await client.get('/admin/unities')

    response.assertStatus(200)
    response.assertBodyContains({ hello: 'world' })
  })
})
