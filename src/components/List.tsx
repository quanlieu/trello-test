import Card from 'react-bootstrap/Card';
import { ICard } from '../types/card';

export interface IProps {
  listName: string;
  vulnerabilityCards: ICard[];
}

function List(props: IProps) {
  const { listName, vulnerabilityCards } = props;

  return (
    <div className="border p-2">
      <h4 className="text-center">{listName}</h4>
      {vulnerabilityCards.map((card) => (
        <Card className="mt-2" key={card.id}>
          <Card.Body className="text-center">{card.text}</Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default List;
