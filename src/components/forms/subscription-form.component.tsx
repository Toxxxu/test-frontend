import React, { useEffect, useState } from 'react';
import { Form, Container } from 'react-bootstrap';

import { validateEmail } from '../../validations/emailValidation';
import './styles/forms.css';
import { Button } from '../buttons/button.component';
import { useEmailsQuery } from '../../apis/user.api';

const SubscriptionForm: React.FC<{ onSubscriptionSuccess: (email: string) => void }> = ({ onSubscriptionSuccess }) => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const { data: emails, isLoading: isEmailsLoading, refetch, isSuccess } = useEmailsQuery();

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(false);
    setError('');

    if (!validateEmail(email)) {
      setError('Неверный формат почты');
      return;
    }

    const emailExists = emails?.some(user => user.email === email);
    if (emailExists) {
      setError('Почта уже зарегестрирована');
      return;
    }

    onSubscriptionSuccess(email);
    setIsSubmitted(true);
  };

  const disableForm = isEmailsLoading || isSubmitted;

  return (
    <Container className={`subscription-form-container ${isSubmitted ? 'disabled' : ''}`}>
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
        </Form.Group>
        {error && <p className='error'>{error}</p>}
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
