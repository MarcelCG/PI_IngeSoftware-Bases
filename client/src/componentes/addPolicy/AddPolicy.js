import React from "react";

function AddPolicy() {
  return (
    <div>
      <form>
        <label>
            Nombre:
            <input type="text" required></input>
        </label>
        <input type="submit" />
      </form>
    </div>
  );
}

export default AddPolicy;