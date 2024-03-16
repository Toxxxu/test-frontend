import React, { useState } from 'react';
import { Form, Container, Alert } from 'react-bootstrap';

import { validateEmail } from '../../validations/emailValidation';
import './styles/forms.css';
import { Button } from '../buttons/button.component';
import { useCreateUserMutation } from '../../apis/user.api';

const SubscriptionForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const [createUser, { isSuccess, isError, isLoading }] = useCreateUserMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError('');

    if (!validateEmail(email)) {
      setError('Неверный формат почты');
      return;
    }

    try {
      setIsSubmitted(true);
      await createUser({ email }).unwrap();
    } catch (apiError) {
      setError('Ошибка при отправке. Почта уже зарегистрирована или другая ошибка сервера.');
      setIsSubmitted(false);
    }
  };

  const disableForm = isLoading || isSuccess;

  return (
    <Container className="subscription-form-container">
      <Form className="form" onSubmit={handleSubmit}>
        <span className="form-label">Оставь актуальный email</span>
        <Form.Group>
        <input
            type="email"
            placeholder="Ввести email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError('');
            }}
            disabled={disableForm}
            className={`input-custom ${error ? 'is-invalid' : ''}`}
          />
          {error && <Alert variant="danger">{error}</Alert>}
        </Form.Group>
        <Button
          text='Я оставил'
          type='submit'
          onClick={() => {}}
          disabled={disableForm}
        />
      </Form>
    </Container>
  );
}

export { SubscriptionForm };
