import React from "react";

function Button({ name, aFunction }: { name: string , aFunction: any}) {
  return (
    <button className="bg-card-color p-3 rounded-custom border-border-color border-0.5" onClick={aFunction}>
      {name}
    </button>
  );
}

export default Button;
