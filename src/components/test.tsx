import React from 'react';

export default function Dashboard() {
  return (
    <div>
      <div className="header">
        <h2>Dashboard <span style={{ fontWeight: 400, fontSize: 18, color: '#b0b8d8' }}>The Lucky One</span></h2>
        <input
          type="search"
          placeholder="Search Dashboard"
          style={{
            background: '#20254a',
            border: 'none',
            borderRadius: 8,
            color: '#e0e6f6',
            padding: '0.5rem 1rem',
            width: 220
          }}
        />
      </div>
      <div className="card">
        <h4>Map Statistics</h4>
        <p>Status: <span style={{ color: '#3b7ddd' }}>Live</span></p>
        <div style={{ margin: '1rem 0' }}>
          <div>Foreign Visits <span style={{ float: 'right' }}>75%</span></div>
          <div style={{ background: '#20254a', borderRadius: 4, height: 8, marginBottom: 8 }}>
            <div style={{ width: '75%', height: 8, background: '#3b7ddd', borderRadius: 4 }}></div>
          </div>
          <div>Local Visits <span style={{ float: 'right' }}>84%</span></div>
          <div style={{ background: '#20254a', borderRadius: 4, height: 8, marginBottom: 8 }}>
            <div style={{ width: '84%', height: 8, background: '#4dd784', borderRadius: 4 }}></div>
          </div>
          <div>Sound Frequencies <span style={{ float: 'right' }}>92%</span></div>
          <div style={{ background: '#20254a', borderRadius: 4, height: 8 }}>
            <div style={{ width: '92%', height: 8, background: '#e74c3c', borderRadius: 4 }}></div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 24 }}>
        <div className="card" style={{ flex: 1 }}>
          <h5>Userbase Growth</h5>
          <p>Overall Growth: <b>76.38%</b></p>
          <div style={{ background: '#20254a', borderRadius: 4, height: 8 }}>
            <div style={{ width: '76%', height: 8, background: '#4dd784', borderRadius: 4 }}></div>
          </div>
          <small style={{ color: '#4dd784' }}>17% higher than last month</small>
        </div>
        <div className="card" style={{ flex: 1 }}>
          <h5>Traffic Values</h5>
          <p>Overall Values: <b>17,567,318</b></p>
          <div style={{ background: '#20254a', borderRadius: 4, height: 8 }}>
            <div style={{ width: '60%', height: 8, background: '#e74c3c', borderRadius: 4 }}></div>
          </div>
          <small style={{ color: '#e74c3c' }}>8% lower than last month</small>
        </div>
      </div>
    </div>
  );
}