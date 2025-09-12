import { useState } from "react";

function TypeForm({businesstype, setType}) {

  const handleChange = (event) => {
    setType(event.target.value);
  };

  return (
    <div>
      <label htmlFor="type-select">Choose a business type:</label>
      <select id="type-select" value={businesstype} onChange={handleChange}>
        <option value="">--Please choose an option--</option>
        <option value="bar">Bar</option>
        <option value="cafe">Cafe</option>
        <option value="restaurant">Restaurant</option>
      </select>
      <p>Selected type: {businesstype}</p>
    </div>
  );
}

export default TypeForm;