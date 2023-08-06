import logoImage from '@/assets/logo.png';
import Button from '@/components/atoms/Button/Button';
import Modal from '@/components/templates/Modal/Modal';
import useModal from '@/components/templates/Modal/useModal';
import useMediaQuery from '@/hooks/useMediaQuery';
import { transformToPascalCase } from '@/utility';
import { HiDotsVertical } from 'react-icons/hi';
import { MdAdd, MdKeyboardArrowDown } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import CreateTaskModal from '../CreateTaskModal/CreateTaskModal';

const Header = () => {
  const tabletMatches = useMediaQuery('(min-width: 768px)');
  const { pathname } = useLocation();
  const { isOpen, handleOpenModal, handleCloseModal } = useModal();

  return (
    <>
      <header className="flex items-center justify-between border-primaryLinesDark bg-primaryDarkGrey px-4 md:border-b-[1px]">
        <section className="flex h-full">
          {tabletMatches && (
            <div className="flex h-full w-60 items-center border-r-[1px] border-primaryLinesDark">
              <img className="mr-4" src={logoImage} alt="logo" />

              <h1 className="text-2xl font-bold text-primaryWhite">kanban</h1>
            </div>
          )}
          <div className="flex items-center">
            <img className="mr-4 md:hidden" src={logoImage} alt="logo" />

            <h2 className="text-lg font-bold text-primaryWhite md:ml-6 md:text-xl">
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

          <button>
            <HiDotsVertical className="text-xl text-primaryMediumGrey" />
          </button>
        </section>
      </header>
      <Modal isOpen={isOpen} onCloseModal={handleCloseModal}>
        <CreateTaskModal />
      </Modal>
    </>
  );
};

export default Header;
