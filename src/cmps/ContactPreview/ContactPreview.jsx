import './ContactPreview.scss';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'
import bin from '../../assets/bin.png'
import edit from '../../assets/edit.png'

export const ContactPreview = ({ contact, deleteContact }) => {

    return (
        <article className="contact-preview">

            <Card className="main-card">

                <CardActions className="card-image">
                    <img className="img-contact" src={`https://randomuser.me/api/portraits/men/${contact.pic}.jpg`} alt="" />
                    <Typography className="card-typography" color="textSecondary">
                        {contact.position}
                    </Typography>
                </CardActions>

                <CardContent>
                    <Typography className="card-typography-title" variant="h5" component="h2">
                        {contact.name}
                    </Typography>

                    <Typography className="card-typography" color="textSecondary" gutterBottom>
                        {contact.location}
                    </Typography>

                    <Typography className="card-typography" color="textSecondary" gutterBottom>
                      GeoLocation:  {contact.lat}  {contact.lon}
                    </Typography>

                    <Typography className="card-typography-title" variant="h6" component="h2">
                        {contact.company}
                    </Typography>

                    <Typography className="card-typography" color="textSecondary">
                        {contact.address}
                    </Typography>

                    <Typography className="card-typography" color="textSecondary">
                        {contact.phone}
                    </Typography>
                </CardContent>

                <CardActions className="card-action">
                    <Button size="small">
                        <Link to={'/contact/edit/' + contact._id}>
                            <img className="img-edit" src={edit} alt="" />
                        </Link>
                    </Button>
                    <Button onClick={() => deleteContact(contact._id)} size="small">
                        <img className="img-bin" src={bin} alt="delete-icon" />
                    </Button>
                </CardActions>

            </Card>
        </article>
    )
}




// "email": "holderbean@renovize.com",
// "phone": "+1 (989) 503-2663",
// "location": "Rivirera state 32/106",
// "company" : "Twitter, Inc",
// "address": "795 Folsom ave, suite 600 san francisco ca 941107",
// "position": "Graphics designer",

{/* <article className="contact-preview">
<img src={`https://randomuser.me/api/portraits/men/${contact.pic}.jpg`} alt="" />
<p>{contact.name}</p>
<small>bkk</small>
</article> */}