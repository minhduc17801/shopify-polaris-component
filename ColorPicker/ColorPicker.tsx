import type { HSBColor } from '@shopify/polaris';
import {
  ColorPicker as ColorPickerInput,
  Icon,
  Popover,
  Text,
  Tooltip,
  hexToRgb,
  hsbToHex,
  rgbToHsb,
} from '@shopify/polaris';
import { AlertCircleIcon } from '@shopify/polaris-icons';
import { useCallback, useEffect, useState } from 'react';
import { hexColorRegex } from './constant';

interface IProps {
  activatorWidth?: string;
  activatorHeight?: number;
  color: string;
  onchangeColor: any;
  label?: string;
}

function ColorPicker({
  activatorWidth = '100%',
  activatorHeight = 32,
  color = '#4AEC32',
  onchangeColor,
  label,
}: IProps) {
  const [popoverActive, setPopoverActive] = useState(false);

  const onOpenPopover = useCallback(
    () => setPopoverActive(popoverActive => !popoverActive),
    [],
  );

  const [inputColor, setInputColor] = useState(color);
  const [hsbColor, setHsbColor] = useState(rgbToHsb(hexToRgb(color)));

  useEffect(() => {
    setInputColor(color);
    setHsbColor(rgbToHsb(hexToRgb(color)));
  }, [color]);

  return (
    <div>
      <div
        style={{
          marginBottom: 4,
        }}
      >
        <span>{label}</span>
      </div>
      <Popover
        preferredAlignment="right"
        active={popoverActive}
        activator={
          <div
            className="flex justify-between items-center rounded-md border border-gray-400 cursor-pointer overflow-hidden"
            style={{ width: activatorWidth, height: activatorHeight }}
          >
            <input
              className="w-full h-full px-2.5 appearance-none border-none focus:border-none focus:outline-none"
              value={inputColor.toUpperCase()}
              onChange={e => {
                const value = e.target.value.toUpperCase();
                setInputColor(value);
                if (value && hexColorRegex.test(value)) {
                  onchangeColor(value);
                  setHsbColor(rgbToHsb(hexToRgb(value)));
                }
              }}
            />

            {!hexColorRegex.test(inputColor) && (
              <Tooltip
                content={
                  <Text as="span" variant="bodyMd" tone="caution">
                    Invalid color!
                  </Text>
                }
              >
                <span>
                  <Icon tone="caution" source={AlertCircleIcon} />
                </span>
              </Tooltip>
            )}
            <span
              onClick={onOpenPopover}
              style={{
                backgroundColor: `${color}`,
              }}
              className="rounded-none w-8 h-full border-l border-gray-400"
            ></span>
          </div>
        }
        onClose={onOpenPopover}
      >
        <Popover.Pane sectioned>
          <ColorPickerInput
            color={hsbColor}
            onChange={(hsb: HSBColor) => {
              setHsbColor(hsb);
              const hex = hsbToHex(hsb);
              onchangeColor(hex);
              setInputColor(hex);
            }}
          />
        </Popover.Pane>
      </Popover>
    </div>
  );
}

export { ColorPicker };
