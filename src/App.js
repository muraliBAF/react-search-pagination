import React from 'react';
import './style.css';
import axios from 'axios';
import _debounce from 'lodash/debounce';
import _throttle from 'lodash/throttle';

export default function App() {
  const [data, setData] = React.useState({
    next: null,
    previous: null,
    results: [],
  });

  const onSearchApireq = (url) => {
    axios.get(url).then((res) => {
      setData({
        next: res.data.next,
        previous: res.data.previous,
        results: res.data.results,
      });
    });
  };

  const onSearchHandler = (e) => {
    const { value } = e.target;
    if (value === '') {
      setData({
        next: null,
        previous: null,
        results: [],
      });
      return;
    }
    const url = `https://swapi.dev/api/people?search=${value}`;
    const debounceReq = _debounce(() => onSearchApireq(url), 500);
    debounceReq();
  };

  return (
    <div>
      <input type="text" onChange={onSearchHandler} />
      {data.results &&
        data.results.map((data) => {
          return <p className="result_p">{data.name}</p>;
        })}
      {data.previous && (
        <button onClick={() => onSearchApireq(data.previous)}>Previous</button>
      )}
      {data.next && (
        <button onClick={() => onSearchApireq(data.next)}>Next</button>
      )}
    </div>
  );
}
