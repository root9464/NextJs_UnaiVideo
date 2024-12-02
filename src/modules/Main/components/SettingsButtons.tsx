import { Dispatch, SetStateAction } from "react";

type SettingsButtonsProps = {
  isDownload: boolean;
  openModal: Dispatch<SetStateAction<boolean>>;
};

export const SettingsButtons = ({
  isDownload,
  openModal,
}: SettingsButtonsProps) => {
  const open = () => openModal((prev) => !prev);

  return (
    <div className="flex h-[72px] w-full flex-row items-center justify-between gap-x-2.5">
      <button
        onClick={open}
        className="flex h-full w-full flex-grow flex-row items-center justify-center rounded-lg bg-uiDarkGray"
      >
        SettingsIcon
      </button>
      {isDownload && (
        <div className="flex h-full w-full flex-grow flex-row items-center justify-center rounded-lg bg-uiDarkGray">
          SettingsIcon
        </div>
      )}
    </div>
  );
};
