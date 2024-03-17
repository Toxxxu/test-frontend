import { Col, Container, Row } from "react-bootstrap"
import { Button } from "../components/buttons/button.component";
import { useNavigate } from "react-router-dom";

import logo from '../assets/images/logo.png';
import './styles/pages.css';

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <Container>
        <Row>
          <Col md={6} className="text-container">
            <img src={logo} className='logo' />
            <p className="main-subtitle">КЛАСС! ТЕПЕРЬ ТЫ
            <p className='colored-text'>УЧАСТВУЕШЬ В КОНКУРСЕ</p></p>
            <p className="main-description">
              Ты прошел все наши карты, но ты всегда можешь вызвать inDriver по-настоящему, для этого переходи по ссылке!
            </p>
            <Button 
              text='Пройти игру заново'
              type='submit'
              onClick={() => {
                localStorage.removeItem('userId');
                navigate('/');
              }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export { SuccessPage };
