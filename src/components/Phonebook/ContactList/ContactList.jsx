import React, { Component } from 'react';

import styled from 'styled-components';
import { Button, Flex, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

export const ContactsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 30px;
`;

export default class ContactList extends Component {
  render() {
    const { filteredContacts, handleDelete } = this.props;
    return (
      <div>
        {filteredContacts.length >= 1 ? (
          <ContactsList>
            {filteredContacts.map(contact => {
              return (
                <li key={contact.id}>
                  <Flex wrap="wrap" gap="small" align="center">
                    <p>
                      {contact.name}: {contact.number}
                    </p>
                    <Tooltip title="delete">
                      <Button
                        type="danger"
                        shape="circle"
                        icon={<DeleteOutlined />}
                        style={{ color: 'red', backgroundColor: 'white' }}
                        onClick={e => handleDelete(e, contact.name)}
                      />
                    </Tooltip>
                  </Flex>
                </li>
              );
            })}
          </ContactsList>
        ) : (
          <h2>No data</h2>
        )}
      </div>
    );
  }
}
