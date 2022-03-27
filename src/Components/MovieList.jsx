import React, { useEffect, useState } from 'react';
import Debounce from './Debounce';
import axios from 'axios';
import '../App.css';
import Review from './Review';
import Ratings from './Rating';

export default function MovieList() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const dQuery = Debounce(query, 1000);

  const searchHandler = (e) => {
    const { value } = e.target;
    if (value !== '') {
      setLoading(true);
      setQuery(value);
    }
  };

  useEffect(() => {
    const fetchMovies = async (q) => {
      try {
        const { data } = await axios.get(
          'https://api.tvmaze.com/search/shows',
          {
            params: {
              q,
            },
          }
        );
        console.log('data', { data });
        const formatArr = data.map((item) => {
          return {
            id: item.show.id,
            title: item.show.title,
            image: item.show.image,
          };
        });
        setLoading(false);
        setResults(formatArr);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };
    if (dQuery) {
      fetchMovies(dQuery);
      console.log(`api call for ${dQuery}`);
    }
  }, [dQuery]);

  return (
    <div className="App">
      <h1 style={{ textAlign: 'center' }}>Featured Movies</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Movies..."
          style={{ margin: '1rem' }}
          onChange={searchHandler}
          className="search-input"
        />
      </div>
      {loading ? (
        <h3 style={{ textAlign: 'center' }}>Loading...</h3>
      ) : (
        results.map((item) => (
          <div className="search-container" key={item.id}>
            <h3>{item.title}</h3>
            <img
              src={item.image?.medium}
              alt={item.title}
              style={{ width: '250px' }}
            />
            <Review />
            <Ratings />
          </div>
        ))
      )}
    </div>
  );
}
