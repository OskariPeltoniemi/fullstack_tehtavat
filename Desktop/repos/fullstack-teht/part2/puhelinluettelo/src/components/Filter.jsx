const Filter = ({ filterText, handleFilterChange }) => {
  return (
    <div>
      Name: <input value={filterText} onChange={handleFilterChange} />
    </div>
  )
}

export default Filter