import { type IStatus } from '@/types';
import { Listbox, Transition } from '@headlessui/react';
import { Fragment, type FC } from 'react';
import { HiOutlineChevronDown } from 'react-icons/hi';

interface SelectProps {
  options: IStatus[];
  selected: IStatus;
  onChange: (value: React.SetStateAction<IStatus>) => void;
  onCustomAction?: () => void;
}

const Select: FC<SelectProps> = ({
  options,
  selected,
  onChange,
  onCustomAction,
}) => {
  const handleSelectChange = (value: IStatus) => {
    onChange(value);
    onCustomAction?.();
  };

  return (
    <div>
      <Listbox value={selected} onChange={handleSelectChange}>
        <div className="body-l relative mt-2">
          <Listbox.Button className="relative w-full cursor-pointer rounded border border-primaryBorder bg-white py-2 pl-4 pr-10 text-left transition-[border] duration-200 hover:border-primaryPurple focus:border-primaryPurple focus:outline-none dark:bg-primaryDarkGrey dark:text-primaryWhite">
            <span className="block truncate">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <HiOutlineChevronDown className="text-base text-primaryPurple" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-2 flex max-h-60 w-full flex-col gap-y-2 overflow-auto rounded bg-white p-4 shadow-menu focus:outline-none dark:border-none dark:bg-primaryVeryDarkGrey">
              {options.map((option) => (
                <Listbox.Option
                  key={option.statusID}
                  className={({ active }) =>
                    `relative cursor-pointer select-none font-medium duration-100 ${
                      active
                        ? 'text-primaryBlack dark:text-primaryWhite'
                        : 'text-primaryMediumGrey'
                    }`
                  }
                  value={option}
                >
                  {option.name}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default Select;
