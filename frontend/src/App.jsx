import { useState } from 'react'
import './App.css'

function App() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [comment, setComment] = useState('')

  let daysCount = ''

  if (startDate && endDate) {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const difference = end - start
    const days = difference / (1000 * 60 * 60 * 24) + 1

    if (days > 0) {
      daysCount = days
    }
  }

  return (
    <main className="page">
      <header className="page-header">
        <h1>Vacation Requests</h1>
        <p className="page-text">
          Simple CRUD app for employee vacation requests.
        </p>
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

        <button className="primary-button" type="button">
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
            <tr>
              <td colSpan="6" className="empty-row">
                No requests yet
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  )
}

export default App
