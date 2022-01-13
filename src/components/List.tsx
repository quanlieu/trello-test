import { useState, useMemo, useCallback } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import CardInfoModal from '../modals/CardInfoModal';
import { ICard } from '../types/card';
import { postCard, putCard } from '../apis/card';

const NEW = 'New';

export interface IProps {
  listId: string;
  listName: string;
  vulnerabilityCards: ICard[];
  onReload: () => void;
}

function List(props: IProps) {
  const { listId, listName, vulnerabilityCards, onReload } = props;

  const [selectedCardId, setSelectedCardId] = useState('');
  const selectedCard = useMemo(
    () => vulnerabilityCards.find((e) => e.id === selectedCardId),
    [vulnerabilityCards, selectedCardId]
  );

  const handleClose = useCallback(() => setSelectedCardId(''), []);

  const handleNewCardClick = useCallback(() => setSelectedCardId(NEW), []);

  const handleUpdateCardClick = (id: string) => setSelectedCardId(id);

  const handleModalSubmit = (text: string, note: string) => {
    if (selectedCardId === NEW) {
      createNewCard(listId, text, note);
    } else {
      updateCardInfo(selectedCardId, text, note);
    }
  };

  const createNewCard = async (listId: string, text: string, note: string) => {
    try {
      await postCard(listId, text, note);
      onReload();
    } catch (error) {
      console.error(error);
    }
  };

  const updateCardInfo = async (cardId: string, text: string, note: string) => {
    try {
      await putCard(cardId, text, note);
      onReload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="border p-2">
      {!!selectedCardId && (
        <CardInfoModal
          show
          onClose={handleClose}
          onSubmit={handleModalSubmit}
          text={selectedCard?.text}
          note={selectedCard?.note}
        />
      )}
      <h4 className="text-center">{listName}</h4>
      <div className="m-2 text-center">
        <Button variant="primary" onClick={handleNewCardClick}>
          New Vulnerability Card
        </Button>
      </div>
      {!vulnerabilityCards.length && (
        <h6 className="text-center">No vulnerability card</h6>
      )}
      {vulnerabilityCards.map((card) => (
        <Card className="mt-2" key={card.id}>
          <Card.Body className="text-center">
            <Card.Title>{card.text}</Card.Title>
            <Card.Text>{card.note || 'No note'}</Card.Text>
            <Button
              variant="outline-primary"
              onClick={() => handleUpdateCardClick(card.id)}
            >
              Change content
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default List;
