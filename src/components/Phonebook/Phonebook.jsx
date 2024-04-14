import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Swal from 'sweetalert2';
import { FlexBox } from 'components/Box';
import { StatHeader } from 'components/Feedback/StatSection';
import ContactList from './ContactList/ContactList';
import { SearchBar } from './SearchBar/SearchBar';
import { PhonebookOptions } from './PhonebookOptions';

export default class Phonebook extends Component {
  state = {
    contacts: [],
    filteredContacts: [],
    name: '',
    number: '',
    filter: '',
    isModificated: false,
  };

  componentDidMount() {
    const initialObject = JSON.parse(localStorage.getItem('contacts'));
    // console.log([initialObject]);
    this.setState({ contacts: initialObject });
    this.setState({ filteredContacts: initialObject });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('Prev State');
    console.log(prevState);
    console.log('Current State');
    console.log(this.state);
    if (prevState.isModificated !== this.state.isModificated) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      this.setState({ isModificated: false });
    }
  }

  resetfilter = data => {
    this.setState({
      filteredContacts: data,
      contacts: data,
      filter: '',
      isModificated: true,
    });
  };

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  handleFilter = evt => {
    this.handleChange(evt);
    const { value } = evt.target;
    const { contacts } = this.state;
    const filteredArray = contacts.filter(contact =>
      contact.name.toLowerCase().includes(value.toLowerCase())
    );
    this.setState({ filteredContacts: filteredArray });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { contacts, name, number } = this.state;
    if (contacts.find((element, index) => element.name === name)) {
      Swal.fire({
        title: 'Error!',
        text: 'The name already exists',
        icon: 'error',
      });
      return;
    }

    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    contacts.push(newContact);

    this.resetfilter(contacts);
  };

  handleDelete = (e, contactName) => {
    console.log(e, contactName);
    const { contacts } = this.state;
    const changedArray = contacts.filter(
      contact => contact.name !== contactName
    );

    this.resetfilter(changedArray);
  };
  render() {
    const { filter, filteredContacts } = this.state;
    const { handleChange, handleSubmit, handleFilter, handleDelete } = this;
    return (
      <FlexBox ml="2%" mt={4} display="flex" flexDirection="column">
        <FlexBox display="flex" flexDirection="column" mb={3}>
          <StatHeader> Phonebook</StatHeader>
          <PhonebookOptions
            handleChange={e => handleChange(e)}
            handleSubmit={e => handleSubmit(e)}
          />
        </FlexBox>

        <div>
          <StatHeader> Contacts</StatHeader>
          <SearchBar handleFilter={e => handleFilter(e)} filter={filter} />
          <ContactList
            filteredContacts={filteredContacts}
            handleDelete={handleDelete}
          />
        </div>
      </FlexBox>
    );
  }
}
