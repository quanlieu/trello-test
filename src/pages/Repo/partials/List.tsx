import { useState, useMemo, useCallback } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import CardInfoModal from '../../../components/modals/CardInfoModal';
import { IList } from '../../../types/list';
import { useAppDispatch } from '../../../app/hooks';
import { actions } from '../actions';

const NEW = 'New';

export interface IProps {
  list: IList
}

function List(props: IProps) {
  const dispatch = useAppDispatch();
  const { list } = props;

  const [selectedCardId, setSelectedCardId] = useState('');
  const selectedCard = useMemo(
    () => list.cards.find((e) => e.id === selectedCardId),
    [list.cards, selectedCardId]
  );

  const handleClose = useCallback(() => setSelectedCardId(''), []);

  const handleNewCardClick = useCallback(() => setSelectedCardId(NEW), []);

  const handleUpdateCardClick = (id: string) => setSelectedCardId(id);

  const handleDeleteClick = async (id: string) => {
    dispatch(actions.deleteCardStart({ id }));
  };

  const handleModalSubmit = (text: string, note: string, newList?: string) => {
    if (selectedCardId === NEW) {
      dispatch(actions.createNewCardStart({ listId: list.id, text, note }));
    } else {
      if (newList) {
        dispatch(
          actions.updateCardStateStart({
            text,
            note,
            newList,
            id: selectedCardId,
          })
        );
      } else {
        dispatch(
          actions.updateCardInfoStart({
            id: selectedCardId,
            text,
            note,
          })
        );
      }
    }
  };

  return (
    <div className="border p-2 bg-light">
      {!!selectedCardId && (
        <CardInfoModal
          show
          onClose={handleClose}
          onSubmit={handleModalSubmit}
          list={list.title}
          cardId={selectedCardId}
          text={selectedCard?.text}
          note={selectedCard?.note}
        />
      )}
      <h4 className="text-center">{list.title}</h4>
      <div className="m-2 text-center">
        <Button
          variant="primary"
          onClick={handleNewCardClick}
          data-testid="new-card-btn"
        >
          New Card
        </Button>
      </div>
      {!list.cards.length && (
        <h6 className="text-center">No Card</h6>
      )}
      {list.cards.map((card) => (
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
