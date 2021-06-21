
import { ContactList } from '../../cmps/ContactList';
import { contactService } from '../../services/contactService';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import './ContactApp.scss'

export const ContactApp = (props) => {

    const [contacts, setContacts] = useState(null)

    useEffect(() => {
        loadContacts()
    }, [])

    const loadContacts = async () => {
        const contacts = await contactService.query()
        setContacts(contacts)
    }

    const onDeleteContact = async (contactId) => {
        await contactService.remove(contactId)
        loadContacts()
    }

    const onAddContact = async (contactId) => {
       
    }

    return (
        <div className="contact-app">
            <Link to="/contact/edit"> + Add Contact</Link>
            {contacts && <ContactList contacts={contacts} onDeleteContact={onDeleteContact}  />}
        </div>
    )
}

