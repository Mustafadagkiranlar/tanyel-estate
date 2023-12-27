"use client";
import React, { useEffect, useRef, useState } from "react";

function CheckBox({
  id,
  label,
  checked,
  onChange,
}: {
  id?: string;
  label?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="form-control">
    <label className="cursor-pointer label">
      <input type="checkbox" checked={checked} className="checkbox checkbox-accent" />
      <span className="label-text">{label}</span>
    </label>
  </div>
  );
}

function Filters({properties, propertiesList, setPropertiesList}: {properties: Property[], propertiesList: Property[], setPropertiesList: React.Dispatch<React.SetStateAction<Property[]>>}) {
  const [selected, setSelected] = useState(0);
  const [value, setValue] = useState(0);
  const accordionRef = useRef<HTMLDivElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value));
    setPropertiesList(properties.filter(property => property.price <= Number(event.target.value)));
  };

  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (accordionRef.current && !accordionRef.current.contains(event.target as Node)) {
        setSelected(0);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [accordionRef]);
  return (
    <div className="flex justify-center" ref={accordionRef}>
      <div className="lg:ml-14 mt-6">
        <div className="px-3 md:px-0 w-[350px] md:w-96">
          <div className="collapse rounded-custom collapse-arrow bg-card-color border-0.5">
            <input
              type="radio"
              name="my-accordion-3"
              checked={selected === 1}
              onChange={() => setSelected(1)}
            />
            <div className="collapse-title text-lg">Area (Coming Soon)</div>
            <div className="collapse-content">
              <CheckBox label="Famagusta" />
              <CheckBox label="Nicosia" />
              <CheckBox label="Kyrenia" />
            </div>
          </div>
          <div className="collapse rounded-custom collapse-arrow bg-card-color border-0.5">
            <input
              type="radio"
              name="my-accordion-3"
              checked={selected === 2}
              onChange={() => setSelected(2)}
            />
            <div className="collapse-title text-lg">
              Price range
            </div>
            <div className="collapse-content">
              <input
                type="range"
                min={0}
                max={properties.reduce((max, obj) => (max.price > obj.price ? max : obj), properties[0]).price}
                value={value}
                onChange={handleChange}
                className="range range-success"
              />
              ${value}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filters;
