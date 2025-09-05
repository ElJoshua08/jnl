export const Footer = () => {
  return (
    <footer className="w-full flex items-center justify-between py-6 px-16 border-t  bg-background/50 backdrop-blur-2xl">
        <span className="font-bold font-header text-xl">J&L {new Date().getFullYear()}</span>

        <span>
          Hecho con 💗 por tu monito.
        </span>
    </footer>
  );
};
