import { ApiClient } from '@japa/api-client'
import { test } from '@japa/runner'

import { assert } from 'chai'

type CredentialsSuceess = {
  token: {
    type: string
    token: string
  }
  user: {
    [key: string]: any
    _id: string
  }
}

async function loginAndGetToken(client: ApiClient): Promise<CredentialsSuceess> {
  const login = await client.post('/sessions').json({
    email: 'rmmorais2@gmail.com',
    password: '123456',
  })

  login.assertStatus(200)

  return login.body() as CredentialsSuceess
}

test.group('Sessions', () => {
  test('display get unities admin', async ({ client }) => {
    const response = await client.get('/admin/unities')
    response.assertStatus(200)
  })

  test('display get clients', async ({ client }) => {
    const { token } = await loginAndGetToken(client)
    const response = await client
      .get('users/secs')
      .headers({ Authorization: `Bearer ${token.token}` })

    response.assertStatus(200)
  })

  test('display post session', async ({ client }) => {
    const { token, user } = await loginAndGetToken(client)

    // Verificar se token.type é uma string e igual a 'bearer'
    assert.isString(token.type)

    assert.equal(token.type, 'bearer')

    // Verificar se token.token é uma string
    assert.isString(token.token)

    // Verificar se user é um objeto
    assert.isObject(user)
  })
})
