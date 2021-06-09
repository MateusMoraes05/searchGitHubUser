import { useRef } from 'react'

import {useRouter} from 'next/router'

import Input from '../../components/input'

import { Form } from '@unform/web'

export default function Home() {
  const router = useRouter()

  const formRef = useRef()

  function logData(a) {
    router.push(`/users/${a.username}`)
  }

  return (
    <Form onSubmit={logData} ref={formRef}>
      <Input name="username" placeholder="Nome de Usuário"/>
      <button type="submit">Consultar</button>
    </Form>
  )
}
