export default function Navbar() {
     return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <nav
        aria-label="Main navigation"
        className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4"
      >
        <ul className="flex flex-row items-center justify-between space-x-6">
            <li>Home</li>
            <li>About</li>
            <li>Discover</li>
            <li>Messages</li>
            <li>My Profile</li>
            <li>My Account</li>
        </ul>
      </nav>
    </header>
  );
}