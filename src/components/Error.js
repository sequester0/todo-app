import React from "react";

function Error({ error }) {
  return (
    <div style={{ padding: 15, fontSize: 18 }}>Error: {error.message}</div>
  );
}

export default Error;
