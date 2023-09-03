import ThemeSwitcher from '@/components/molecules/ThemeSwitcher/ThemeSwitcher';
import MenusList from '@/components/organisms/MenusList/MenusList';
import { Dialog } from '@headlessui/react';

const MobileSidebar = () => {
  return (
    <div className="flex min-h-full justify-center p-4">
      <Dialog.Panel
        as="div"
        className="mt-[54px] flex w-full max-w-[264px] flex-col gap-y-4 self-start rounded-md bg-primaryWhite py-4 pr-4 shadow-menu dark:bg-primaryDarkGrey"
      >
        <section className="pr-2">
          <MenusList />
        </section>

        <section className="pl-4">
          <ThemeSwitcher />
        </section>
      </Dialog.Panel>
    </div>
  );
};

export default MobileSidebar;
