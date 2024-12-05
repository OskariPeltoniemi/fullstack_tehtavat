const Contacts = ({ personsToShow, handleDelete }) => {
    return (
        <ul>
            {personsToShow.map(person => (
                <li key={person.id}>
                    {person.name} {person.number}  
                    <button key={person.id} onClick={() => handleDelete(person.id)}>
                        delete
                    </button>
                </li>
            ))}
        </ul>
    )
}

export default Contacts