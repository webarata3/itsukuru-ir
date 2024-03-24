// type Props = {
//   handleMenu: () => void;
// };

const Header = () => {
  return (
    <header className="flex flex-row flex-nowrap justify-start bg-header text-2xl p-4">
      <button type="button" className="w-6 h-6">
        <svg className="w-6 h-6 text-white hover:text-sky-200">
          <use xlinkHref="image/bars.svg#bars"></use>
        </svg>
      </button>
      <h1 className="text-xl flex-auto text-center">いつくるJR</h1>
      <a href="/" className="w-6 h-6 text">
        <svg className="w-6 h-6 text-white hover:text-sky-s00">
          <use xlinkHref="image/rotate-right.svg#rotate-right"></use>
        </svg>
      </a>
    </header>
  );
};

export default Header;
