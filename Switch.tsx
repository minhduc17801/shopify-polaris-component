import React, { useEffect, useState } from 'react';

interface IProps {
  switchWidth?: number;
  switchHeight?: number;
  handleDiameter?: number;
  switchOffset?: number;
  containerCheckedColor?: string;
  containerUncheckedColor?: string;
  handleCheckedColor?: string;
  handleUncheckedColor?: string;
  checked: boolean;
  onChange: (value: boolean | React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Switch({
  containerCheckedColor = '#29845A29',
  containerUncheckedColor = '#d3d3d3',
  handleCheckedColor = '#29845A',
  handleUncheckedColor = '#808080',
  switchWidth = 34,
  switchHeight = 16,
  handleDiameter = 20,
  switchOffset = -5,
  checked,
  onChange,
}: IProps) {
  const [localChecked, setLocalChecked] = useState(checked);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLocalChecked(checked);
    setLoading(false);
  }, [checked]);

  return (
    <div
      style={{
        width: switchWidth,
        height: switchHeight,
        borderRadius: handleDiameter,
        background: checked ? containerCheckedColor : containerUncheckedColor,
        pointerEvents: loading ? 'none' : 'auto',
      }}
      onClick={() => {
        setLocalChecked(!localChecked);
        setLoading(true);
        onChange(!checked);
      }}
      className="transition duration-300 cursor-pointer relative m-1.25"
    >
      <div
        style={{
          zIndex: '100',
          background: checked ? handleCheckedColor : handleUncheckedColor,
          height: handleDiameter,
          width: handleDiameter,
          left: localChecked
            ? switchWidth - handleDiameter - switchOffset
            : switchOffset,
        }}
        className="hover:animate-pulse rounded-full absolute transition-['left']  duration-300 top-1/2 transform -translate-y-1/2 overflow-visible"
      ></div>
    </div>
  );
}
