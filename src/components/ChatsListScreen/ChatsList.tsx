import React from 'react';
import moment from 'moment';
import { List, ListItem } from '@material-ui/core';
import styled from 'styled-components';
import { useCallback } from 'react';
import { History } from 'history';
import { useQuery } from '@apollo/react-hooks';
import * as queries from '../../graphql/queries';

const Container = styled.div`
  height: calc(100% - 56px);
  overflow-y: overlay;
`;
const StyledList = styled(List)`
  padding: 0 !important;
`;
const StyledListItem = styled(ListItem)`
  height: 76px;
  padding: 0 15px;
  display: flex;
`;
const ChatPicture = styled.img`
  height: 50px;
  width: 50px;
  object-fit: cover;
  border-radius: 50%;
`;
const ChatInfo = styled.div`
  width: calc(100% - 60px);
  height: 46px;
  padding: 15px 0;
  margin-left: 10px;
  border-bottom: 0.5px solid silver;
  position: relative;
`;
const ChatName = styled.div`
  margin-top: 5px;
`;
const MessageContent = styled.div`
  color: gray;
  font-size: 15px;
  margin-top: 5px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
const MessageDate = styled.div`
  position: absolute;
  color: gray;
  top: 20px;
  right: 0;
  font-size: 13px;
`;

interface ChatsListProps {
  history: History;
}

const ChatsList: React.FC<ChatsListProps> = ({ history }) => {
  const { data } = useQuery<any>(queries.chats);

  const navToChat = useCallback(
    chat => {
      history.push(`chats/${chat.id}`);
    },
    [history]
  );

  if (data === undefined || data.chats === undefined) {
    return null;
  }
  let chats = data.chats;

  return (
    <Container>
      <StyledList>
        {chats.map((chat: any) => (
          <StyledListItem
            key={chat.id}
            data-testid="chat"
            button
            onClick={navToChat.bind(null, chat)}>
            <ChatPicture
              data-testid="picture"
              src={chat.picture}
              alt="Profile"
            />
            <ChatInfo>
              <ChatName data-testid="name">{chat.name}</ChatName>
              {chat.lastMessage && (
                <React.Fragment>
                  <MessageContent data-testid="content">
                    {chat.lastMessage.content}
                  </MessageContent>
                  <MessageDate data-testid="date">
                    {moment(chat.lastMessage.createdAt).format('HH:mm')}
                  </MessageDate>
                </React.Fragment>
              )}
            </ChatInfo>
          </StyledListItem>
        ))}
      </StyledList>
    </Container>
  );
};

export default ChatsList;
