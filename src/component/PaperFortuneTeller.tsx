import React, { useState } from 'react';
import clsx from 'clsx';

/**
 * PaperFortuneTeller:
 * - En kvadrat i bakgrunden som roterar (SquareWithCorners).
 * - En triangel i toppen som är statisk (TriangleFlap), men texten uppdateras utifrån klick.
 */
const PaperFortuneTeller: React.FC = () => {
  // Vilken hörn/flik är öppen? (null = ingen)
  const [openFlap, setOpenFlap] = useState<string | null>(null);

  // Klick på ett hörn
  const handleFlapClick = (flap: string) => {
    // Klickar man på samma igen -> stäng
    setOpenFlap((prev) => (prev === flap ? null : flap));
  };

  return (
    <div className="w-full flex justify-center items-center py-16">
      {/* Container */}
      <div className="fortune-container relative w-[400px] h-[400px] md:w-[500px] md:h-[500px]">
        {/* 1) Kvadraten som roterar i 3D */}
        <SquareWithCorners openFlap={openFlap} onFlapClick={handleFlapClick} />

        {/* 2) Triangel "på toppen" - fast position, byter bara innehåll */}
        <TriangleFlap openFlap={openFlap} />
      </div>
    </div>
  );
};

export default PaperFortuneTeller;

/**
 * SquareWithCorners:
 *  - Innehåller den vita kvadraten.
 *  - Roterar i Y-led beroende på vilken flik som är vald,
 *    så rätt hörn hamnar "överst".
 */
interface SquareProps {
  openFlap: string | null;
  onFlapClick: (flap: string) => void;
}

const SquareWithCorners: React.FC<SquareProps> = ({ openFlap, onFlapClick }) => {
  // Exempel: rotera runt Y-axeln så rätt sida kommer fram
  // (adjusta dessa värden om du vill ha annan ordning)
  const rotationClasses: Record<string, string> = {
    // Ingen flik = ingen rotation
    null: 'rotate-y-0 scale-100',
    // mission: top → ingen extra rotate-y
    mission: 'rotate-y-0 scale-110',
    // founder: höger → rotera -90
    founder: 'rotate-y-[-90deg] scale-110',
    // charity: botten → rotera 180
    charity: 'rotate-y-[180deg] scale-110',
    // follow: vänster → rotera 90
    follow: 'rotate-y-[90deg] scale-110',
  };

  return (
    <div
      className={clsx(
        `
          absolute
          inset-0
          transform-style-3d
          transition-transform duration-700
          shadow-2xl
          bg-white
          rounded
          overflow-hidden
        `,
        rotationClasses[openFlap || 'null']
      )}
      style={{
        transformOrigin: 'center center',
      }}
    >
      {/* Dekor i mitten: två diagonala streck */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute w-full h-1 bg-pink-800 transform rotate-45"></div>
        <div className="absolute w-full h-1 bg-pink-800 transform -rotate-45"></div>
      </div>

      {/* Fyra hörnord */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Our Mission (top) */}
        <FlapWord
          label="Our Mission"
          top="10%"
          left="50%"
          transform="translateX(-50%)"
          onClick={() => onFlapClick('mission')}
        />
        {/* Founder (höger) */}
        <FlapWord
          label="Founder"
          top="50%"
          right="10%"
          transform="translateY(-50%) rotate(90deg)"
          onClick={() => onFlapClick('founder')}
        />
        {/* Charity (botten) */}
        <FlapWord
          label="Charity"
          bottom="10%"
          left="50%"
          transform="translateX(-50%) rotate(180deg)"
          onClick={() => onFlapClick('charity')}
        />
        {/* Follow Us (vänster) */}
        <FlapWord
          label="Follow Us"
          top="50%"
          left="10%"
          transform="translateY(-50%) rotate(-90deg)"
          onClick={() => onFlapClick('follow')}
        />
      </div>
    </div>
  );
};

/**
 * FlapWord: en klickbar text i ett hörn.
 */
interface FlapWordProps {
  label: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  transform?: string;
  onClick: () => void;
}

const FlapWord: React.FC<FlapWordProps> = ({
  label,
  top,
  bottom,
  left,
  right,
  transform,
  onClick,
}) => {
  return (
    <div
      className="
        absolute
        z-30
        text-pink-800 
        font-bold 
        text-base 
        md:text-xl 
        cursor-pointer 
        hover:underline
      "
      style={{ top, bottom, left, right, transform }}
      onClick={onClick}
    >
      {label}
    </div>
  );
};

/**
 * TriangleFlap: Triangeln i toppen (stannar på samma position).
 * Visar text beroende på vilken flik som är vald, men rör sig INTE.
 */
interface TriangleFlapProps {
  openFlap: string | null;
}

const TriangleFlap: React.FC<TriangleFlapProps> = ({ openFlap }) => {
  // Innehåll per flik
  const flapInfo: Record<string, { title: string; text: string }> = {
    mission: {
      title: 'Our Mission',
      text: 'We make slow fashion the first choice for consumers...',
    },
    founder: {
      title: 'Founder',
      text: 'Saga Nord, the founder of ReLoveYarn, has been...',
    },
    charity: {
      title: 'Charity',
      text: 'We donate 10% of all proceeds to charity...',
    },
    follow: {
      title: 'Follow Us',
      text: 'Join us on Instagram for the latest in slow fashion...',
    },
  };

  // Om ingen flik är vald → dold
  const isOpen = openFlap !== null;
  // Hämta texten för vald flik
  const currentFlap = openFlap && flapInfo[openFlap] ? flapInfo[openFlap] : null;

  return (
    <div
      className={clsx(
        'absolute z-50 transition-opacity duration-500 pointer-events-none',
        {
          'opacity-100 pointer-events-auto': isOpen,
          'opacity-0': !isOpen,
        }
      )}
      style={{
        // FIXED TRIANGLE-POSITION: ex. Top center i containern
        top: '0%',
        left: '50%',
        transform: 'translate(-50%, -20%)', 
        // flytta upp triangeln lite 
        width: '200px',
        height: 'auto',
      }}
    >
      {currentFlap && (
        <div
          className="
            relative
            bg-pink-100
            p-4
            text-center
            shadow-lg
          "
          style={{
            clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
          }}
        >
          <h2 className="font-bold text-lg mb-2">{currentFlap.title}</h2>
          <p className="text-sm md:text-base px-2 py-1">{currentFlap.text}</p>
        </div>
      )}
    </div>
  );
};
