"use client"

import React, { useEffect } from 'react';
import { useState } from 'react';
import "./HeaderStyle.css"; // Import the new CSS file

function Header() {
  const [expanded, setExpanded] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [game , setGame] = useState([])

  const handleChange = (e) => console.log(e.target.value);
  const handleClick1 = () => setExpanded(!expanded);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email, 'Password:', password);
  };
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);


  useEffect(() =>{
    fetch(`https://game.tbg95.com/api/game-list?`)
    .then(res => res.json())
    .then(data => {
        setGame(data.data)
    })
  })

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredGames = game.filter(game =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  

  return (
    <>
      <header className="header">
        <div className="container">
                <input
              type="text"
              placeholder="Search for a game..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          <div>
          {searchQuery && (filteredGames.length > 0 ? (
              <ul>
                {filteredGames.map((game) => (
                  <button 
                  style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}
                  onClick={() => window.location.href = `/games/${game.slug}/${game.game_id}`} 
                >
                <img src={`${game.img_path}${game.assets[0].name}`}  style={{ width: '50px', height: 'auto', marginRight: '10px' }} alt="Game" />
                {game.title}
              </button>
                ))}
              </ul>
            ) : (
              <p>No games found</p>
            ))}
          </div>
          <button className="login-button" onClick={() => window.location.href = `/games`} >
            Games</button>
          <a href="/games" className="hamburgerIcon">
          </a>
        </div>
      </header>
    </>
  );
}

export default Header;