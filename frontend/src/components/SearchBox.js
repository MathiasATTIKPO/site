import React, { useState } from 'react';

export default function SearchBox(props) {
  const [name, setName] = useState('');
  const submitHandler1 = (e) => {

    if(e.key=== 'Enter'){
      e.preventDefault();
    props.history.push(`/search/name/${name}`);
    }
    
  };
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
  };
  return (
    <form className="search" onKeyPress={submitHandler1} onSubmit={submitHandler}>
      <div className="row">
        <input
          type="text"
          name="q"
          id="q" 
          onChange={(e) => setName(e.target.value)}
        ></input>
        <button className="primary" type="submit">
          <i className="fa fa-search"></i>
        </button>        
      </div>
    </form>
  );
}
