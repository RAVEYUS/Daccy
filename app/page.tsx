import React from 'react';
import Link from 'next/link';

const Page = () => {
  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-no-repeat bg-black"
      style={{
        // backgroundImage: `url("https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTMwYmR1NHQxcnA3M29jODUwN3V6cXgwa252Z2N5c25rdjRlb2dyZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9bTjZrytydVRK/giphy.webp")`,
      }}
    >
      <div className="flex flex-col space-y-2 items-center text-white">
        <img
          src="https://media1.tenor.com/m/BelPRtxDqxQAAAAC/spaceinvaders-videogames.gif"
          alt="Space Invaders GIF"
          className="w-[400px] h-auto"
        />
        
        <Link href="/pages/home" passHref>
          <img
            src="https://media1.tenor.com/m/fcQE0xInZG8AAAAC/game-start.gif"
            alt="Game Start GIF"
            className="rounded-lg w-[280px] cursor-pointer"
          />
        </Link>
      </div>
    </div>
  );
};

export default Page;
