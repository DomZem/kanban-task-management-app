import { Menu, Transition } from '@headlessui/react';
import { Fragment, type FC } from 'react';
import { HiDotsVertical } from 'react-icons/hi';

export interface ElipsisMenuItem {
  name: string;
  action: () => void;
  version?: 'default' | 'red';
}

interface ElipsisMenuProps {
  items: ElipsisMenuItem[];
}

const ElipsisMenu: FC<ElipsisMenuProps> = ({ items }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center">
          <HiDotsVertical className="text-xl text-primaryMediumGrey" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-6 flex w-48 origin-top-right flex-col gap-y-4 rounded-md bg-white p-4 text-sm text-primaryMediumGrey shadow-elipsisMenu focus:outline-none dark:bg-primaryVeryDarkGrey">
          {items.map((item) => (
            <div key={item.name}>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`duration-200 ${
                      item.version === 'red' && active
                        ? 'text-primaryRedHover dark:text-primaryRedHover'
                        : item.version === 'red'
                        ? 'text-primaryRed'
                        : ''
                    } ${active && 'text-primaryBlack dark:text-primaryWhite'}`}
                    onClick={item.action}
                  >
                    {item.name}
                  </button>
                )}
              </Menu.Item>
            </div>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ElipsisMenu;
