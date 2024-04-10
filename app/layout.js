
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from "./components/AuthProvider";
import "./../assets/styles/globals.css";
import GlobalProvider from "./../context/GlobalContext";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Properties | Find the perfect rentals",
  description: "Find your dream rental Properties",
  keywords: "rentals, Find Rentals, Find Properties"
};

export default function RootLayout({ children }) {
  return (

    <AuthProvider>
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col `}>
      <GlobalProvider>
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
        <ToastContainer />
      </GlobalProvider>
      </body>
    </html>
    </AuthProvider>
  );
}
