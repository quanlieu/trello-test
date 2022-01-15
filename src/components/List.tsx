import { useState, useMemo, useCallback } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import CardInfoModal from '../modals/CardInfoModal';
import { ICard } from '../types/card';
import { postCard, putCard, deleteCard } from '../apis/card';

const NEW = 'New';

export interface IProps {
  listId: string;
  listName: string;
  vulnerabilityCards: ICard[];
  onReload: () => void;
  onChangeCardState: (params: {
    text: string;
    note: string;
    newList: string;
    id: string;
  }) => void;
}

function List(props: IProps) {
  const { listId, listName, vulnerabilityCards, onReload, onChangeCardState } =
    props;

  const [selectedCardId, setSelectedCardId] = useState('');
  const selectedCard = useMemo(
    () => vulnerabilityCards.find((e) => e.id === selectedCardId),
    [vulnerabilityCards, selectedCardId]
  );

  const handleClose = useCallback(() => setSelectedCardId(''), []);

  const handleNewCardClick = useCallback(() => setSelectedCardId(NEW), []);

  const handleUpdateCardClick = (id: string) => setSelectedCardId(id);

  const handleModalSubmit = (text: string, note: string, newList?: string) => {
    if (selectedCardId === NEW) {
      createNewCard(listId, text, note);
    } else {
      if (newList) {
        // Change card to another list is actually delete the card and create a new one
        //   so it need the parent component to handle it
        onChangeCardState({ text, note, newList, id: selectedCardId });
      } else {
        updateCardInfo(selectedCardId, text, note);
      }
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

  const handleDeleteClick = async (cardId: string) => {
    try {
      await deleteCard(cardId);
      onReload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="border p-2 bg-light">
      {!!selectedCardId && (
        <CardInfoModal
          show
          onClose={handleClose}
          onSubmit={handleModalSubmit}
          list={listName}
          cardId={selectedCardId}
          text={selectedCard?.text}
          note={selectedCard?.note}
        />
      )}
      <h4 className="text-center">{listName}</h4>
      <div className="m-2 text-center">
        <Button
          variant="primary"
          onClick={handleNewCardClick}
          data-testid="new-card-btn"
        >
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
              className="m-2"
              variant="outline-primary"
              onClick={() => handleUpdateCardClick(card.id)}
              data-testid={`edit-card-btn-${card.id}`}
            >
              Edit card
            </Button>
            <Button
              className="m-2"
              variant="danger"
              onClick={() => handleDeleteClick(card.id)}
              data-testid={`delete-card-btn-${card.id}`}
            >
              Delete card
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default List;
