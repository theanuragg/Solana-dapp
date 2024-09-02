import React, { FC } from "react";

interface InputViewProps {
  placeholder: string;
  name: string;
  Clickhandle: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputView: FC<InputViewProps> = ({ placeholder, name, Clickhandle }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={name.toLowerCase().replace(" ", "-")} // Dynamically setting the htmlFor attribute based on the name
        className="text-base/normal text-default-200 mb-2 block font-semibold"
      >
        {name}
      </label>
      <input
        type="text"
        id={name.toLowerCase().replace(" ", "-")}
        onChange={Clickhandle}
        placeholder={placeholder}
        className="border-default-200 block w-full rounded border-white/10 bg-transparent py-1.5 px-3 text-white/80 focus:border-white/25 focus:ring-transparent"
      />
    </div>
  );
};
