import React, { useState, useEffect } from 'react';
import './App.css';
import classes from './app.styles.module.css';

function App() {
  const [songs, setSongs] = useState(['A', 'B', 'C', 'D', 'E']);
  const [albuns, setAlbuns] = useState([]);
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    setSongs(updateSongsHandler(albuns));
  }, [albuns]);

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
    fetch(`https://itunes.apple.com/search?term=${searchString}`, {
      mode: 'no-cors',
    })
      .then((res) => {
        res.json().then(({ results }) => {
          const albuns = results
            .sort((a, b) => (a.collectionName < b.collectionName ? -1 : 1))
            .map((item) => {
              return item.collectionName;
            });
          setAlbuns([
            albuns[0] || 'A',
            albuns[1] || 'B',
            albuns[2] || 'C',
            albuns[3] || 'D',
            albuns[4] || 'E',
          ]);
        });
      })
      .catch((err) => {
        console.log('ERROR: ', err);
      });
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
