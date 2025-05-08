export default function Header() {
  const handleNavClick = (e: MouseEvent, path: string) => {
    e.preventDefault();
    // Update URL without page reload
    window.history.pushState({}, '', path);
    // Dispatch event to notify router
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return <header style={{
    'background-color': '#121225',
    'color': 'white',
    'padding': '10px',
    'width': '100%',
    'height': '50px'
  }}>
    <nav style={{
      'display': 'flex',
      'gap': '20px'
    }}>
      <a href="/"
         onClick={(e: MouseEvent) => handleNavClick(e, '/')}
         style={{ 'color': 'white', 'text-decoration': 'none' }}>
        ホーム
      </a>
      <a href="/about"
         onClick={(e: MouseEvent) => handleNavClick(e, '/about')}
         style={{ 'color': 'white', 'text-decoration': 'none' }}>
        アバウト
      </a>
      <a href="/login"
         onClick={(e: MouseEvent) => handleNavClick(e, '/login')}
         style={{ 'color': 'white', 'text-decoration': 'none' }}>
        ログイン
      </a>
    </nav>
  </header>
}
