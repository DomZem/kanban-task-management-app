import { Menu, Transition } from '@headlessui/react';
import { Fragment, type FC } from 'react';
import { HiDotsVertical } from 'react-icons/hi';

export interface EllipsisMenuItem {
  name: string;
  action: () => void;
  version?: 'default' | 'red';
}

interface EllipsisMenuProps {
  items: EllipsisMenuItem[];
}

const EllipsisMenu: FC<EllipsisMenuProps> = ({ items }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className="flex h-full w-full items-center justify-center">
        <Menu.Button className="outline-none">
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
        <Menu.Items className="absolute right-0 z-10 mt-6 flex w-48 origin-top-right flex-col gap-y-4 rounded-md bg-white p-4 shadow-menu focus:outline-none dark:bg-primaryVeryDarkGrey">
          {items.map((item) => (
            <div key={item.name}>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`body-l text-primaryMediumGrey duration-200 ${
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

export default EllipsisMenu;
