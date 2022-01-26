import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { OPEN, CONFIRMED, FALSE_POSITIVE, FIXED } from '../../constants/lists';

export interface IProps {
  show: boolean;
  list: string;
  cardId: string;
  text?: string;
  note?: string;
  onSubmit: (text: string, note: string, newList?: string) => void;
  onClose: () => void;
}

const NEW = 'New';

// Open to either Confirmed, False Positive, and Fixed.
// Confirmed to Fixed.
// Vulnerability Cards in False Positive and Fixed lists can't be moved to any other state.
const cardsSelectOptions: { [unit: string]: string[] } = {
  [OPEN]: [OPEN, CONFIRMED, FALSE_POSITIVE, FIXED],
  [CONFIRMED]: [CONFIRMED, FIXED],
};

function CardInfoModal(props: IProps) {
  const { show, onSubmit, onClose } = props;
  const showChangeList = props.cardId !== NEW;

  const [text, setText] = useState(props.text ?? '');
  const [note, setNote] = useState(props.note ?? '');
  const [list, setList] = useState(props.list);

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.currentTarget.value);
  const handleChangeNote = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNote(e.currentTarget.value);
  const handleSelectList = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setList(e.target.value);

  const handleSubmit = () => {
    let newList: string | undefined;
    if (props.list !== list) {
      newList = list;
    }
    onSubmit(text, note, newList);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Vulnerability card information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="text">
            <Form.Label>Vulnerability Card content</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter card content"
              onChange={handleChangeText}
              data-testid="card-text"
              value={text}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="text">
            <Form.Label>Vulnerability Card note</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter card note"
              onChange={handleChangeNote}
              data-testid="card-note"
              value={note}
            />
          </Form.Group>
          {showChangeList && ![FALSE_POSITIVE, FIXED].includes(props.list) && (
            <Form.Group controlId="select">
              <Form.Select
                value={list}
                onChange={handleSelectList}
                data-testid="select-state"
              >
                {cardsSelectOptions[props.list]?.map((v: string) => (
                  <option value={v} key={v}>
                    {v}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          data-testid="submit-btn"
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CardInfoModal;
