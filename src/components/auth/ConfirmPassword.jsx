import React from 'react'
import { Container } from '../Container'
import { Title } from '../form/Title'
import { FormInput } from '../form/FormInput'
import { SubmitButton } from '../form/SubmitButton'

export const ConfirmPassword = () => {
  return (
    <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
      <Container>
        <form className="bg-secondary rounded p-6 w-96 space-y-6">
          <Title>Confirm Password</Title>
          <FormInput label="New Password" placeholder="******" name="newpass" />
          <FormInput label="Confirm Password" placeholder="******" name="confirmpass" />
          <SubmitButton value="Confirm" />

          <div className="flex justify-end">
            <a
              href="/login"
              className="text-sm text-dark-subtle hover:text-white transition"
            >
              Sign In
            </a>
          </div>
        </form>
      </Container>
    </div>
  )
}
