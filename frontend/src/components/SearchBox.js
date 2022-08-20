import React, { useState } from 'react';

export default function SearchBox(props) {
  const [name, setName] = useState('');
  const submitHandler = (e) => {

    if(e.key=== 'Enter'){
      e.preventDefault();
    props.history.push(`/search/name/${name}`);
    }
    
  };
  return (
    <form className="search" onKeyPress={submitHandler}>
      <div className="row">
        <input
          type="text"
          name="q"
          id="q"
          onChange={(e) => setName(e.target.value)}
         
          placeholder=" recherche..."
          aria-label=" recherche..."
        ></input>
        
      </div>
    </form>
  );
}
