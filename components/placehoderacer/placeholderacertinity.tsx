"use client";

import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";

const PlaceholdersAndVanishInputDemo= () => {
  const placeholders = [
    "What's Codu",
    "learn using gemini",
    "fix bug and upskill",
    "lesgoo",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <div className="h-[40rem] flex flex-col justify-center  items-center px-4">
      <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
        Learn coding Faster
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}
export default PlaceholdersAndVanishInputDemo;