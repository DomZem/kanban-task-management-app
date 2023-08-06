import { Listbox, Transition } from '@headlessui/react';
import { Fragment, type FC } from 'react';
import { HiOutlineChevronDown } from 'react-icons/hi';

interface SelectProps {
  options: string[];
  selected: string;
  onChange: (value: React.SetStateAction<string>) => void;
}

const Select: FC<SelectProps> = ({ options, selected, onChange }) => {
  return (
    <div>
      <Listbox value={selected} onChange={onChange}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-pointer rounded border border-primaryBorder bg-white py-2 pl-3 pr-10 text-left focus:outline-none">
            <span className="block truncate">{selected}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <HiOutlineChevronDown className="text-base text-primaryPurple" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-2 flex max-h-60 w-full flex-col gap-y-2 overflow-auto rounded border border-primaryBorder bg-white p-4 text-base shadow-lg focus:outline-none">
              {options.map((option, optionIdx) => (
                <Listbox.Option
                  key={optionIdx}
                  className={({ active }) =>
                    `relative cursor-pointer select-none font-medium duration-100 ${
                      active ? 'text-primaryBlack' : 'text-primaryMediumGrey'
                    }`
                  }
                  value={option}
                >
                  {option}
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
