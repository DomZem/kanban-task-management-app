import logoImage from '@/assets/logo.png';
import Button from '@/components/atoms/Button/Button';
import ElapsisMenu, {
  type ElipsisMenuItem,
} from '@/components/molecules/ElapsisMenu/ElapsisMenu';
import Modal from '@/components/templates/Modal/Modal';
import useModal from '@/components/templates/Modal/useModal';
import useMediaQuery from '@/hooks/useMediaQuery';
import { transformToPascalCase } from '@/utility';
import { MdAdd, MdKeyboardArrowDown } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import CreateTaskModal from '../CreateTaskModal/CreateTaskModal';

const Header = () => {
  const tabletMatches = useMediaQuery('(min-width: 768px)');
  const { pathname } = useLocation();
  const { isOpen, handleOpenModal, handleCloseModal } = useModal();

  const elipsisMenuList: ElipsisMenuItem[] = [
    {
      name: 'Edit Board',
      action: () => console.log('Edit board modal'),
    },
    {
      name: 'Delete Board',
      action: () => console.log('Delete board modal'),
      version: 'red',
    },
  ];

  return (
    <>
      <header className="flex items-center justify-between border-primaryLinesLight bg-primaryWhite px-4 dark:border-primaryLinesDark dark:bg-primaryDarkGrey">
        <section className="flex h-full">
          {tabletMatches && (
            <div className="flex h-full w-60 items-center border-r-[1px] border-primaryLinesLight dark:border-primaryLinesDark">
              <img className="mr-4" src={logoImage} alt="logo" />

              <h1 className="text-2xl font-bold text-primaryBlack dark:text-primaryWhite">
                kanban
              </h1>
            </div>
          )}
          <div className="flex items-center">
            <img className="mr-4 md:hidden" src={logoImage} alt="logo" />

            <h2 className="text-lg font-bold text-primaryBlack dark:text-primaryWhite md:ml-6 md:text-xl">
              {transformToPascalCase(pathname)}
            </h2>

            <button className="md:hidden">
              <MdKeyboardArrowDown className="p-1 text-3xl text-primaryPurple" />
            </button>
          </div>
        </section>

        <section className="flex items-center gap-x-4">
          {!tabletMatches ? (
            <button className="rounded-3xl bg-primaryPurple px-4 py-2 duration-200 hover:bg-primaryPurpleHover">
              <MdAdd className="text-xl text-primaryWhite" />
            </button>
          ) : (
            <Button onClick={handleOpenModal}>
              <MdAdd className="text-xl text-primaryWhite" />
              Add New Task
            </Button>
          )}

          <ElapsisMenu items={elipsisMenuList} />
        </section>
      </header>
      <Modal isOpen={isOpen} onCloseModal={handleCloseModal}>
        <CreateTaskModal />
      </Modal>
    </>
  );
};

export default Header;
