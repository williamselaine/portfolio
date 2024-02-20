import { useState, useEffect } from "react";

/**
 * Simulates a typewriter effect by adding a new letter every n ms.
 * With random fluctuations between 50 - 100% of the maximum.
 *
 * @param {*} text - the text to type
 * @param {*} speed - the max speed for a letter in ms
 */

const useTypewriter = (text, speed, delay) => {
  const [name, setName] = useState("");

  useEffect(() => {
    const writeText = () => {
      let prev = 0;
      [...text].forEach((char, index) => {
        let rFactor = Math.floor(Math.random() * 0.5) + 0.5;
        let next = prev + speed * index * rFactor;
        setTimeout(() => {
          setName(text.substring(0, index + 1));
        }, next);
        prev = next;
      });
    };

    if (text) {
      setTimeout(() => {
        writeText();
      }, delay);
    }
  }, [text, speed, delay]);

  return name;
};

export default useTypewriter;
