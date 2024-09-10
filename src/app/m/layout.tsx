import AuthCheck from "../auth/AuthCheck";

function Layout({ children }: { children: React.ReactNode }) {
  return <AuthCheck>{children}</AuthCheck>;
}

export default Layout;
