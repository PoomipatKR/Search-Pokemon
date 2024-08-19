// pages/index.tsx
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import SearchComponent from '../components/SearchComponent';

const HomePage: NextPage = () => {
  const router = useRouter();

  return (
    <div>
      <SearchComponent />
    </div>
  );
};

export default HomePage;
