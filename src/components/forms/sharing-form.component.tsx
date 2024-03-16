import React, { useState } from 'react';
import './styles/forms.css';
import { Button } from '../buttons/button.component';
import {
  FacebookShareButton,
  VKShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  VKIcon
} from 'react-share';
import { Container, Form } from 'react-bootstrap';

const SharingForm: React.FC = () => {
  const [isShared, setIsShared] = useState({
    facebook: false,
    vk: false,
    twitter: false,
    instagram: false,
  });
  const shareUrl = 'https://example.com';

  const handleShareButtonClick = (network: keyof typeof isShared) => {
    setIsShared({ ...isShared, [network]: true });
  };

  return (
    <Container className="subscription-form-container">
      <Form className="form">
        <span className="form-label">Поделись с друзьями</span>
        <Form.Group>
          <FacebookShareButton
            url={shareUrl}
            onShareWindowClose={() => handleShareButtonClick('facebook')}
            disabled={isShared.facebook}
            className='social-button'
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <VKShareButton
            url={shareUrl}
            onShareWindowClose={() => handleShareButtonClick('vk')}
            disabled={isShared.vk}
            className='social-button'
          >
            <VKIcon size={32} round />
          </VKShareButton>
          <TwitterShareButton
            url={shareUrl}
            onShareWindowClose={() => handleShareButtonClick('twitter')}
            disabled={isShared.twitter}
            className='social-button'
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </Form.Group>
        <Button
          text='Я поделился'
          type='button'
          onClick={() => alert('Thank you for sharing!')}
          disabled={Object.values(isShared).every(v => !v)}
        />
      </Form>
    </Container>
  );
};

export { SharingForm };
