import React from 'react';
import logo from './logo.svg';
import './App.css';

const posts = [
  { id: 1, name: 'Primer post', description: 'Esta es la descripción del post' },
  { id: 1, name: 'Segundo post', description: 'Y ahora la del segundo post' }
];

function postsView(posts)
{
  return posts.map(post => (
    <tr key={post.id}>
        <td>{post.name}</td>
        <td>{post.description}</td>
    </tr>
  ));
}

function App() {
  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {postsView(posts)}
        </tbody>
      </table>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
