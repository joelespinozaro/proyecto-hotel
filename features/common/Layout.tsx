import React from 'react';
import NavbarComponent from './NavbarComponent';
import { Col, Container, Row } from 'react-bootstrap';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div>
      <NavbarComponent />
      <Container>{children}</Container>
    </div>
  );
}
