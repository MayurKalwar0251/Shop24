import React from "react";

const Form = ({ name, setName, handleSubmit }) => {
  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Enter Category Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default Form;
