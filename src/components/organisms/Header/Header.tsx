import logoImage from '@/assets/logo.png';
import Button from '@/components/atoms/Button/Button';
import useMediaQuery from '@/hooks/useMediaQuery';
import { HiDotsVertical } from 'react-icons/hi';
import { MdAdd, MdKeyboardArrowDown } from 'react-icons/md';

const Header = () => {
  const tabletMatches = useMediaQuery('(min-width: 768px)');

  return (
    <header className="flex items-center justify-between border-primaryLinesDark bg-primaryDarkGrey px-4 md:border-b-[1px]">
      <section className="flex h-full">
        {tabletMatches ? (
          <div className="flex h-full w-60 items-center border-r-[1px] border-primaryLinesDark">
            <img className="mr-4" src={logoImage} alt="logo" />

            <h1 className="text-2xl font-bold text-primaryWhite">kanban</h1>
          </div>
        ) : (
          <div className="flex items-center">
            <img className="mr-4" src={logoImage} alt="logo" />

            <h2 className="text-lg font-medium text-primaryWhite">
              Platform lunch
            </h2>

            <button>
              <MdKeyboardArrowDown className="p-1 text-3xl text-primaryPurple" />
            </button>
          </div>
        )}
      </section>

      <section className="flex items-center gap-x-4">
        {!tabletMatches ? (
          <button className="rounded-3xl bg-primaryPurple px-4 py-2 duration-200 hover:bg-primaryPurpleHover">
            <MdAdd className="text-xl text-primaryWhite" />
          </button>
        ) : (
          <Button>
            <MdAdd className="text-xl text-primaryWhite" />
            Add New Task
          </Button>
        )}

        <button>
          <HiDotsVertical className="text-xl text-primaryMediumGrey" />
        </button>
      </section>
    </header>
  );
};

export default Header;
