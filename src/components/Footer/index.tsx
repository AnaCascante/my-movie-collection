import Logo from '../../assets/Logo.png';
import { FaArrowUp } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="relative flex items-center justify-between bg-tertiary p-6 text-secondary">
      <div className="relative flex flex-col items-center">
        <img src={Logo} alt="Logo" className="w-20 rounded-full md:w-28" />
        <p className="mt-4 text-center text-sm text-secondary md:text-base">
          &copy; 2021 All rights reserved by <strong>Ana Cascante</strong>
        </p>
      </div>
      <div className="group relative">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="rounded-full bg-secondary p-2 text-2xl text-tertiary hover:bg-yellow-500"
        >
          <FaArrowUp />
        </button>
        <span className="absolute right-10 top-[-2rem] hidden rounded bg-transparent p-1 text-yellow-500 group-hover:block">
          Back to top
        </span>
      </div>
    </footer>
  );
}
