import logoImage from '@/assets/logo.png';
import Button from '@/components/atoms/Button/Button';
import useMediaQuery from '@/hooks/useMediaQuery';
import { HiDotsVertical } from 'react-icons/hi';
import { MdAdd, MdKeyboardArrowDown } from 'react-icons/md';

const Header = () => {
  const tabletMatches = useMediaQuery('(min-width: 768px)');

  return (
    <header className="flex items-center justify-between bg-primaryDarkGrey px-4">
      <section className="flex items-center">
        {!tabletMatches && <img className="mr-4" src={logoImage} alt="logo" />}

        <h1 className="text-lg font-medium text-primaryWhite">
          Platform lunch
        </h1>

        {!tabletMatches && (
          <button>
            <MdKeyboardArrowDown className="p-1 text-3xl text-primaryPurple" />
          </button>
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
