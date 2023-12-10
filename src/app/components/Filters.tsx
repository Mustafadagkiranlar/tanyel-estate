"use client";
import React, { useState } from "react";
import CheckBox from "./CheckBox";

function Filters({ filterVisibility }: { filterVisibility: boolean }) {
  const [selected, setSelected] = useState(0);
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value));
  };

  return (
    <>
      {filterVisibility ? (
        <div className="ml-14">
          <div className="w-96">
            <div className="collapse rounded-custom collapse-plus bg-card-color border-0.5">
              <input
                type="radio"
                name="my-accordion-3"
                checked={selected === 1}
                onChange={() => setSelected(1)}
              />
              <div className="collapse-title text-lg">Area (Comming Soon)</div>
              <div className="collapse-content">
                <CheckBox label="Famagusta" />
                <CheckBox label="Nicosia" />
                <CheckBox label="Kyrenia" />
              </div>
            </div>
            <div className="collapse rounded-custom collapse-plus bg-card-color border-0.5">
              <input
                type="radio"
                name="my-accordion-3"
                checked={selected === 2}
                onChange={() => setSelected(2)}
              />
              <div className="collapse-title text-lg">
                Price range (Comming Soon)
              </div>
              <div className="collapse-content">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={value}
                  onChange={handleChange}
                  className="range range-success"
                />
                ${value}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Filters;
