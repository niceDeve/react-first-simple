import React, { useState } from 'react';
import { Modal, ModalContentAction, TextArea } from '../common';
import { MessageService } from '../services';

const CreateMessageModal = ({ active, setActive, toUser }) => {
  const [content, setContent] = useState('');

  const createMessage = async () => {
    await MessageService.createMessage({
      content,
      to_user: toUser,
    });
    setActive(false);
  };

  return (
    <Modal heading="Create Message" active={active} setActive={setActive}>
      <form>
        <TextArea
          label="Type your Message"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></TextArea>
      </form>
      <ModalContentAction confirmLabel="Send" setActive={setActive} successAction={createMessage} />
    </Modal>
  );
};
export default CreateMessageModal;
