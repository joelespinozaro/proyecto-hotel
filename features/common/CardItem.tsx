import { Card } from "react-bootstrap";

export default function CardItem({ title, value }) {
  return (
    <>
      <Card.Title as="h6" className="mb-0">
        {title}
      </Card.Title>
      <Card.Subtitle as="span" className="mb-2 text-muted">
        {value}
      </Card.Subtitle>
    </>
  );
}
