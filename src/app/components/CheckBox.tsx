import React from "react";

export default function CheckBox({
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
