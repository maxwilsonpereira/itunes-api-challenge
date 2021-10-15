import React, { useState, useEffect } from 'react';
import './App.css';
import classes from './app.styles.module.css';

function App() {
  const [songs, setSongs] = useState(['A', 'B', 'C', 'D', 'E']);
  const [albuns, setAlbuns] = useState([]);
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setSongs([]);
      setSongs(updateSongsHandler(albuns));
    }, 1000);
    return () => clearInterval(interval);
  }, [albuns]);

  const updateSongsHandler = () => {
    let aux = [];
    if (albuns.length > 0) aux = albuns;
    else aux = songs;
    aux.push(aux.shift());
    return aux;
  };

  useEffect(() => {
    if (searchString.length > 2) {
      fetch(`https://itunes.apple.com/search?term=${searchString}`)
        .then((res) => {
          res.json().then(({ results }) => {
            console.log('results: ', results);
            const albuns = results
              .sort((a, b) => (a.collectionName < b.collectionName ? -1 : 1))
              .map((item) => {
                return item.collectionName;
              });
            setAlbuns([albuns[0], albuns[1], albuns[2], albuns[3], albuns[4]]);
          });
        })
        .catch((err) => {
          console.log('ERROR: ', err);
        });
    }
  }, [searchString]);

  return (
    <div className={classes.root}>
      <input
        className={classes.inputClass}
        type="text"
        placeholder="Search Band"
        onChange={(e) => setSearchString(e.target.value)}
      />
      <div className={classes.container}>
        {songs.map((item, index) => (
          <div key={item + index} className={classes.itemContainer}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
