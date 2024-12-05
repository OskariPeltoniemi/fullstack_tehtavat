import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Contacts from './components/Contacts'
import Adder from './components/Adder'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')
  const [confMessage, setConfMessage] = useState({ message: null, type: null })

  useEffect(() => {
      personService
        .getAll()
          .then(initialPersons => {
          setPersons(initialPersons)
      })
    }, [])

  const confirmation = (message, type) => {
    setConfMessage({ message, type })
    setTimeout(() => {
      setConfMessage({ message: null, type: null })
    }, 5000)
  }

  const addName = (event) => {
    event.preventDefault()

    const duplicateContact = persons.find(person => person.name === newName)

    if (duplicateContact) {
      if (window.confirm(`${newName} has already been added to phonebook. Do you want to update the number?`)) {
        const updatedContact = { ...duplicateContact, number: newNumber }
  
        personService
          .update(duplicateContact.id, updatedContact)
          .then(returnedContact => {
            setPersons(
              persons.map(person =>
                person.id !== duplicateContact.id ? person : returnedContact
              )
            )
            setNewName('')
            setNewNumber('')
            confirmation(`Updated ${returnedContact.name}'s number`, 'success')
          })
          .catch(error => {
            if (error.response && error.response.status === 404) {
              confirmation(`Error: ${duplicateContact.name} has already been deleted`, 'error')
              setPersons(persons.filter(person => person.id !== duplicateContact.id))
            } else {
              confirmation(`Error: Couldn't update contact`, 'error')
            }
          })
      }
      return
    }

    const nameObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1)
    }

    personService
      .create(nameObject)
      .then(returnedName => {
        setPersons(persons.concat(returnedName))
        setNewName('')
        setNewNumber('')
        confirmation(`Added ${returnedName.name}`, 'success')
      })
      .catch(error => {
        confirmation(`Error: Couldn't add contact`, 'error')
      })
  }

  const deleteContact = id => {
    const personToDelete = persons.find(person => person.id === id)
  
    if (window.confirm(`Do you really want to delete ${personToDelete.name}?`)) {
      personService
        .destroy(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          confirmation(`Deleted ${personToDelete.name}`, 'success')
        })
        .catch(error => {
          confirmation(`Error: Couldn't delete ${personToDelete.name}`, 'error')
          setPersons(persons.filter((person) => person.id !== id))
        })
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterText(event.target.value)
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filterText.toLowerCase())
  )

  return (
    <div>
      <h1>Phonebook</h1>

      <h2>Filter contacts</h2>
      <Filter
        filterText={filterText}
        handleFilterChange={handleFilterChange}
      />

      <h2>New contact</h2>
      <Adder
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <div className="notificationBlock">
        <Notification message={confMessage.message} type={confMessage.type} />
      </div>

      <h2>Contacts</h2>
      <Contacts
        personsToShow={personsToShow}
        handleDelete={deleteContact}
      />
      
    </div>
  )
}

export default App