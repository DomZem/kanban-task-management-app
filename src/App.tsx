import { MdAdd } from 'react-icons/md';
import Button from './components/atoms/Button/Button';
import Header from './components/organisms/Header/Header';

const App = () => (
  <div className="grid h-screen grid-rows-[64px_1fr] md:grid-rows-[80px_1fr] lg:grid-rows-[97px_1fr]">
    <Header />
    <div>
      {/* Sidebar */}
      <main className="flex h-full items-center justify-center bg-primaryVeryDarkGrey p-4 text-primaryMediumGrey">
        <div className="flex flex-col items-center gap-y-6">
          <h3 className="text-center text-lg font-medium">
            This board is empty. Create a new column to get started.
          </h3>
          <Button>
            <MdAdd className="text-xl text-primaryWhite" />
            Add New Column
          </Button>
        </div>
      </main>
    </div>
  </div>
);

export default App;
