import { storageService } from './storageService.js'
import { makeId } from './utilService.js'
import axios from 'axios';

export const contactService = {
      query,
      save,
      remove,
      getById,
      getEmptyContact,
}

const STORAGE_KEY = 'contacts'

const gDefaultcontacts = [
      {
            "_id": "5a56640269f443a5d64b32ca",
            "name": "Ochoa Hyde",
            "email": "ochoahyde@renovize.com",
            "phone": "+1 (968) 593-3824",
            "location": "Rivirera state 32/106",
            "company": "Twitter, Inc",
            "address": "paris",
            "position": "Graphics designer",
            "pic": 1,
            "lat": '32.176599',
            "lon": '34.809670'
      },
      {
            "_id": "5a5664025f6ae9aa24a99fde",
            "name": "Hallie Mclean",
            "email": "halliemclean@renovize.com",
            "phone": "+1 (948) 464-2888",
            "location": "Rivirera state 32/106",
            "company": "Twitter, Inc",
            "address": "paris",
            "position": "Graphics designer",
            "pic": 2,
            "lat": '32.176599',
            "lon": '34.809670'
      },
      {
            "_id": "5a56640252d6acddd183d319",
            "name": "Parsons Norris",
            "email": "parsonsnorris@renovize.com",
            "phone": "+1 (958) 502-3495",
            "location": "Rivirera state 32/106",
            "company": "Twitter, Inc",
            "address": "paris",
            "position": "Graphics designer",
            "pic": 3,
            "lat": '32.176599',
            "lon": '34.809670'
      },
      {
            "_id": "5a566402ed1cf349f0b47b4d",
            "name": "Rachel Lowe",
            "email": "rachellowe@renovize.com",
            "phone": "+1 (911) 475-2312",
            "location": "Rivirera state 32/106",
            "company": "Twitter, Inc",
            "address": "paris",
            "position": "Graphics designer",
            "pic": 4,
            "lat": '32.176599',
            "lon": '34.809670'
      },
      {
            "_id": "5a566402abce24c6bfe4699d",
            "name": "Dominique Soto",
            "email": "dominiquesoto@renovize.com",
            "phone": "+1 (807) 551-3258",
            "location": "Rivirera state 32/106",
            "company": "Twitter, Inc",
            "address": "paris",
            "position": "Graphics designer",
            "pic": 5,
            "lat": '32.176599',
            "lon": '34.809670'
      },
      {
            "_id": "5a566402a6499c1d4da9220a",
            "name": "Shana Pope",
            "email": "shanapope@renovize.com",
            "phone": "+1 (970) 527-3082",
            "location": "Rivirera state 32/106",
            "company": "Twitter, Inc",
            "address": "paris",
            "position": "Graphics designer",
            "pic": 6,
            "lat": '32.176599',
            "lon": '34.809670'
      },
      {
            "_id": "5a566402f90ae30e97f990db",
            "name": "Faulkner Flores",
            "email": "faulknerflores@renovize.com",
            "phone": "+1 (952) 501-2678",
            "location": "Rivirera state 32/106",
            "company": "Twitter, Inc",
            "address": "paris",
            "position": "Graphics designer",
            "pic": 7,
            "lat": '32.176599',
            "lon": '34.809670'
      },
      {
            "_id": "5a5664027bae84ef280ffbdf",
            "name": "Holder Bean",
            "email": "holderbean@renovize.com",
            "phone": "+1 (989) 503-2663",
            "location": "Rivirera state 32/106",
            "company": "Twitter, Inc",
            "address": "paris",
            "position": "Graphics designer",
            "pic": 8,
            "lat": '32.176599',
            "lon": '34.809670'
      },
]

var gContacts = _loadContacts()

function query(filterBy) {
      let contactsToReturn = gContacts;

      return Promise.resolve([...contactsToReturn]);
}


//get location from google api
async function getCoordinates(locationAddress) {
      try {
            const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${locationAddress}&key=AIzaSyCqTLAMXMcg6Rji1i4pv4-GMnV85zyuYo4`);
            return response.data;
      } catch (error) {
            console.error('weather service: error while try to fetch current coordinates');
      }
}

function getById(id) {
      const contact = gContacts.find(contact => contact._id === id)
      if (!contact) return Promise.reject()
      return Promise.resolve({ ...contact })
}

function remove(id) {
      const idx = gContacts.findIndex(contact => contact._id === id)
      gContacts.splice(idx, 1)
      if (!gContacts.length) gContacts = gDefaultcontacts.slice()
      storageService.store(STORAGE_KEY, gContacts)
      return Promise.resolve()
}

async function save(contactToSave) {
      if (contactToSave._id) {
            const idx = gContacts.findIndex(contact => contact._id === contactToSave._id)
            gContacts.splice(idx, 1, contactToSave)
      } else {
            contactToSave._id = makeId()
            let coords = await getCoordinates(contactToSave.address)
            console.log('coords got:', coords)
            contactToSave.coords = coords
            gContacts.push(contactToSave)
      }
      storageService.store(STORAGE_KEY, gContacts)
      return Promise.resolve(contactToSave);
}

function getEmptyContact() {
      return {
            name: '',
            email: '',
            phone: '',
            company: '',
            address: '',
            position: '',
            lat: '',
            lon: '',
            pic: 1
      }
}


function _loadContacts() {
      let contacts = storageService.load(STORAGE_KEY)
      if (!contacts || !contacts.length) contacts = gDefaultcontacts
      storageService.store(STORAGE_KEY, contacts)
      return contacts
}

