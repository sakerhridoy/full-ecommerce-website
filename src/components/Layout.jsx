import Header from './Header.jsx';
import Footer from './Footer.jsx';

function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
