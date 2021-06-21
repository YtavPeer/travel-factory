import { ContactPreview } from '../ContactPreview';

import './ContactList.scss'

export const ContactList = ({ contacts, onDeleteContact }) => {


    return (
        <section className="contact-list">
            {
                contacts && contacts.map((contact, idx) => <ContactPreview key={idx} contact={contact} deleteContact={onDeleteContact} />)
            }
        </section>
    )
}

