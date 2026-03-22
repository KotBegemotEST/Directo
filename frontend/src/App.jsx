import { useState,useEffect } from 'react'
import './App.css'

function App() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [comment, setComment] = useState('')
  const [editingId, setEditingId] = useState(null)

  const [requests, setRequests] = useState([])
  
  
  useEffect(() => {
    getRequests()
  }, [])

  
  let daysCount = ''
  

let handleEditRequest = (request) => {
  setEditingId(request.id)
  setStartDate(request.startDate)
  setEndDate(request.endDate)
  setComment(request.comment)



  
}



  if (startDate && endDate) {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const difference = end - start
    const days = difference / (1000 * 60 * 60 * 24) + 1

    if (days > 0) {
      daysCount = days
    }
  }

let hadleDeleteRequest = async (id) => {

const response = await fetch(`https://localhost:7154/api/vacationrequests/${id}/delete`, {
  method: 'POST',
})


  if (!response.ok) {
    alert('Failed to delete request')
    return
  }

  await getRequests()
  alert('Request deleted')

}

let getRequests = async () => {

    const response = await fetch('https://localhost:7154/api/vacationrequests')

    if (!response.ok) {
      alert('Failed to fetch requests')
      return
    }

    const data = await response.json()
    setRequests(data)
}

let handleSaveRequest = async () => {
  const request = {
    userId: 1,
    startDate: startDate,
    endDate: endDate,
    comment: comment,
  }

  let response

  if (editingId === null) {
    response = await fetch('https://localhost:7154/api/vacationrequests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    })
  } else {
    response = await fetch(`https://localhost:7154/api/vacationrequests/${editingId}/edit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    })
  }

  if (!response.ok) {
    alert('Failed to save request')
    return
  }

  setEditingId(null)
  setStartDate('')
  setEndDate('')
  setComment('')

  await getRequests()

  alert('Request saved')
}

  return (
    <main className="page">
      <header className="page-header">
        <h1>Vacation Requests</h1>
      </header>

      <section className="form-section">
        <h2>Create request</h2>

        <div className="form-grid">
          <div className="field">
            <label htmlFor="startDate">Start date</label>
            <input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="endDate">End date</label>
            <input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="comment">Comment</label>
            <input
              id="comment"
              type="text"
              placeholder="Vacation comment"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="daysCount">Days</label>
            <input id="daysCount" type="text" value={daysCount} readOnly />
          </div>
        </div>

        <button className="primary-button" type="button" onClick={handleSaveRequest}>
          Save request
        </button>
      </section>

      <section className="table-section">
        <h2>Requests</h2>

        <table className="requests-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>User</th>
              <th>Start date</th>
              <th>End date</th>
              <th>Comment</th>
              <th>Actions</th>
            </tr>
          </thead>
<tbody>
  {requests.length === 0 ? (
    <tr>
      <td colSpan="6" className="empty-row">
        No requests found
      </td>
    </tr>
  ) : (
    requests.map((request) => (
      <tr key={request.id}>
        <td>{request.id}</td>
        <td>{request.userId}</td>
        <td>{request.startDate}</td>
        <td>{request.endDate}</td>
        <td>{request.comment}</td>
        <td>
          <button className="delete-button" type="button" onClick={() => hadleDeleteRequest(request.id)}>
            Delete
          </button>
          <button className="edit-button" type="button" onClick={() => handleEditRequest(request)}>
            Edit
          </button>
        </td>
      </tr>
    ))
  )}
</tbody>

        </table>
      </section>
    </main>
  )
}

export default App
