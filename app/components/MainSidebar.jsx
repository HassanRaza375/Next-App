import { Sidebar } from "primereact/sidebar";

export default function MainSidebar({ isOpen, setIsOpen }) {
  return (
    <>
      {/* Sidebar */}
      <Sidebar visible={isOpen} position="left" onHide={() => setIsOpen(false)}>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ margin: "10px 0" }}>
            <a href="/">Home</a>
          </li>
          <li style={{ margin: "10px 0" }}>
            <a href="/about">About</a>
          </li>
          <li style={{ margin: "10px 0" }}>
            <a href="/services">Services</a>
          </li>
          <li style={{ margin: "10px 0" }}>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </Sidebar>
    </>
  );
}
