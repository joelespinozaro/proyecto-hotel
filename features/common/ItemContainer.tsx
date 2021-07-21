import { ListGroup, Row } from 'react-bootstrap';

export default function ItemContainer({ children }) {
  return (
    <ListGroup.Item>
      <Row className="d-flex align-items-center">{children}</Row>
    </ListGroup.Item>
  );
}
