
import './ContactEdit.scss'
import { contactService } from '../../services/contactService';
import { useEffect, useState } from 'react';


export const ContactEdit = (props) => {

    const [contact, setContact] = useState(null)

    useEffect(async () => {
        const { id } = props.match.params;
        try {
            const contact = id ? await contactService.getById(id) : contactService.getEmptyContact()
            setContact(contact)
        } catch (err) {
            console.log('contact not found')
        }
    }, [])

    const handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        setContact({...contact, [field]: value })
    }

    const onSaveContact = async (ev) => {
        ev.preventDefault()
        console.log(contact);
        await contactService.save({ ...contact })
        props.history.push('/')
    }

    if (!contact) return <h1> 'Loading'</h1>
    return (

        <section className="contact-edit">
            <h1>contact add /  edit work</h1>
            
            <form className='contact-form' onSubmit={onSaveContact}>
                <label htmlFor="model">Name</label>
                <input required type="text" id="name" value={contact.name} onChange={handleChange} name="name" />

                <label htmlFor="type">Email</label>
                <input required type="text" id="email" value={contact.email} onChange={handleChange} name="email" />

                <label htmlFor="type">Phone</label>
                <input required type="number" id="phone" value={contact.phone} onChange={handleChange} name="phone" />

                <label htmlFor="type">company</label>
                <input required type="text" id="company" value={contact.company} onChange={handleChange} name="company" />


                <label htmlFor="type">address</label>
                <input required type="text" id="address" value={contact.address} onChange={handleChange} name="address" />


                <label htmlFor="type">position</label>
                <input required type="text" id="position" value={contact.position} onChange={handleChange} name="position" />

                <button onClick={onSaveContact} className="save-contact">Save Contact</button>
            </form>

        </section>
    )
}







