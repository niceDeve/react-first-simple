import React, { useEffect } from 'react';
import { useState } from 'react';
import { MessageService } from '../services';
import { Page } from '../components';
import { AuthorBox } from '../common';
import mailbox from '../assets/images/mailbox.svg';
import { getImageUrl } from '../utilities/getImageUrl';
import '../styles/components/InboxPage.css';

const InboxPage = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    MessageService.getMessages().then(setMessages);
  }, []);

  return (
    <Page>
      <section>
        <h1>Your Inbox</h1>
        {messages.length === 0 && (
          <div className="empty-mailbox">
            <img alt="empty-mailbox" className="empty-mailbox__image" src={mailbox} />
            <h3>You have no messages</h3>
          </div>
        )}
        {messages.map((message) => (
          <div key={message.id} className="card">
            <div className="card__body">
              <div className="searchItem">
                <div className="searchItem__top">
                  <AuthorBox
                    avatarSrc={getImageUrl(message.created_by.profile_pic)}
                    url={`/profile/${message.created_by.username}`}
                    name={message.created_by.name}
                    handle={message.created_by.username}
                    size="md"
                  />
                </div>
                <p className="searchItem__bottom">{message.content}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section></section>
    </Page>
  );
};

export default InboxPage;
