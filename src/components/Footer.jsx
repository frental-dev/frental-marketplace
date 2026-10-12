export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Frental Marketplace. Find your next home.
        <span className="ml-2 text-gray-300">·</span>
        <span className="ml-2 text-xs text-gray-400">v{__APP_VERSION__}</span>
      </div>
    </footer>
  );
}
