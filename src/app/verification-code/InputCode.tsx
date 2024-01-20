import React, { useState, useRef, ChangeEvent, KeyboardEvent } from "react";

interface InputCodeProps {
  length: number;
  loading: boolean;
  onComplete: (code: string) => void;
}

const InputCode = (props: InputCodeProps) => {
  const { length, loading, onComplete } = props;
  const [code, setCode] = useState([...Array(length)].map(() => ""));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const processInput = (e: ChangeEvent<HTMLInputElement>, slot: number) => {
    const num = e.target.value;
    if (/[^0-9]/.test(num)) return;
    const newCode = [...code];
    newCode[slot] = num;
    setCode(newCode);
    if (slot !== length - 1) {
      inputs.current[slot + 1]?.focus();
    }
    if (newCode.every((num) => num !== "")) {
      onComplete(newCode.join(""));
    }
  };

  const onKeyUp = (e: KeyboardEvent<HTMLInputElement>, slot: number) => {
    if (e.keyCode === 8 && !code[slot] && slot !== 0) {
      const newCode = [...code];
      newCode[slot - 1] = "";
      setCode(newCode);
      inputs.current[slot - 1]?.focus();
    }
  };

  return (
    <div className="flex flex-col items-center code-inputs">
      <label className="mb-4">Introducir código</label>
      <div className="flex justify-start items-center">
        {code.map((num, idx) => (
          <input
            key={idx}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={num}
            autoFocus={!code[0].length && idx === 0}
            readOnly={loading}
            onChange={(e) => processInput(e, idx)}
            onKeyUp={(e) => onKeyUp(e, idx)}
            ref={(ref) => inputs.current.push(ref)}
            className="mr-4 bg-transparent text-center h-16 w-16 border-2 border-gray-400 rounded-md mx-1"
          />
        ))}
      </div>
    </div>
  );
};

export default InputCode;
