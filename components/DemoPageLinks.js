import React from "react";
import Link from "next/link";

const styles = {
  content: {
    padding: "4px 32px 32px 32px",
    background: "#eeeeee",
    display: "inline-block",
  },
  linkAnchor: {
    color: "teal",
    lineHeight: "160%",
  },
};

const DemoPageLinks = () => (
  <nav style={styles.content}>
    <h2>Pages</h2>
    <ul>
      <li>
        <Link href="/login">
          <a style={styles.linkAnchor}>Login page</a>
        </Link>
        : static, no auth required. All pages will redirect unauthenticated
        users there.
      </li>
      <li>
        <Link href="/">
          <a style={styles.linkAnchor}>Overview</a>
        </Link>
        : auth required.
      </li>
      <li>More pages coming soon... 🏗</li>
    </ul>
  </nav>
);

DemoPageLinks.displayName = "DemoPageLinks";

export default DemoPageLinks;
