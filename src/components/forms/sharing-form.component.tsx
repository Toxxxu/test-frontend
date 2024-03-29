import React, { useState } from 'react';
import {
  FacebookShareButton,
  VKShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  VKIcon
} from 'react-share';
import { Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

import './styles/forms.css';
import { Button } from '../buttons/button.component';
import { useCreateUserMutation } from '../../apis/user.api';

const SharingForm: React.FC<{ isSubscribed: boolean; email: string }> = ({ isSubscribed, email }) => {
  const [isShared, setIsShared] = useState({
    facebook: false,
    vk: false,
    twitter: false,
    instagram: false,
  });
  const [sharedConfirmationClicked, setSharedConfirmationClicked] = useState(false);
  const [showError, setShowError] = useState(false);

  const [createUser] = useCreateUserMutation();
  const navigate = useNavigate();

  const shareUrl = 'https://example.com';

  const handleShareButtonClick = (network: keyof typeof isShared) => {
    setIsShared({ ...isShared, [network]: true });
    setShowError(false);
  };

  const handleConfirmButtonClick = async () => {
    const hasSharedAny = Object.values(isShared).some(v => v);

    if (!hasSharedAny) {
      setShowError(true);
      return;
    }

    try {
      const response = await createUser({ email }).unwrap();
      const userId = response._id;

      localStorage.setItem('userId', userId);
      navigate('/success');
    } catch (error) {
      console.error("Failed to create user:", error);
    }

    setSharedConfirmationClicked(true);
  };

  const shareOnInstagram = () => {
    window.open('instagram://user?username=instagram', '_blank');
  };

  return (
    <Container className={`subscription-form-container ${!isSubscribed ? 'disabled' : ''}`}>
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
          {/* <button
            className={`social-button instagram ${isShared.instagram ? 'disabled' : ''}`}
            onClick={shareOnInstagram}
            disabled={isShared.instagram}
          >
            <FontAwesomeIcon icon={faInstagram} size="2x" color="white" />
          </button> */}
        </Form.Group>
        {showError && <span className='error'>Надо все же поделиться</span>}
        <Button
          text='Я поделился'
          type='button'
          onClick={handleConfirmButtonClick}
          disabled={sharedConfirmationClicked}
        />
      </Form>
    </Container>
  );
};

export { SharingForm };
