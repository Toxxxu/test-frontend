import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { SubscriptionForm } from '../components/forms/subscription-form.component';
import { SharingForm } from '../components/forms/sharing-form.component';
import logo from '../assets/images/logo.png';
import './styles/home.page.css';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <Container>
        <Row>
          <Col md={6} className="text-container">
            <img src={logo} className='logo' />
            <p className="main-subtitle">ВСЕ КРУТО! ТЕПЕРЬ <span className='colored-text'>ВЫИГРЫВАЙ ПУТЕШЕСТВИЕ</span></p>
            <p className="main-description">
              Чтобы участвовать в розыгрыше путешествия, оставь актуальную почту и поделись с друзьями
            </p>
            <Row className='forms-row'>
              <Col>
                <SubscriptionForm />
              </Col>
              <Col>
                <SharingForm />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export { HomePage };
