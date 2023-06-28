import React from "react";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';

export default function Header() {
  return (
    <div className="header">
      <h1>
        <Link to="/">홈으로</Link>
      </h1>
    </div>
  );
}