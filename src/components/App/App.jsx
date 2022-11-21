import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { Form } from '../Form/Form';
import { Filter } from '../Filter/Filter';
import { ContactList } from '../ContactList/ContactList';

import {
  Container,
  Section,
  PageTitle,
  SectionTitle,
  Notification,
} from './App.styled';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleFormSubmit = contactData => {
    const contact = {
      id: nanoid(),
      ...contactData,
    };

    const contactNames = contacts.map(item => item.name.toLowerCase());

    if (contactNames.includes(contact.name.toLowerCase())) {
      window.alert(`${contact.name} is already in your Phonebook`);
      return;
    }

    setContacts(contacts => [...contacts, contact]);
  };

  const handleFilterInputChange = e => {
    setFilter(e.currentTarget.value.toLowerCase().trim());
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const filterContacts = contacts.filter(item => {
    return item.name.toLowerCase().includes(filter);
  });

  return (
    <Container>
      <Section>
        <PageTitle>Phonebook</PageTitle>
        <SectionTitle>Adding contact</SectionTitle>
        <Form onFormSubmit={handleFormSubmit} />
      </Section>
      {contacts.length > 0 ? (
        <Section>
          <SectionTitle>Your noted contacts</SectionTitle>
          <Filter filter={filter} onListFilter={handleFilterInputChange} />
          <ContactList
            contacts={filterContacts}
            onContactDelete={deleteContact}
          />
        </Section>
      ) : (
        <Notification>There are no contacts. Please add some.</Notification>
      )}
    </Container>
  );
};
