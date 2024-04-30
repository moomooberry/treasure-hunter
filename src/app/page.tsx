"use client";

import Link from "next/link";
import { FC } from "react";

const MainPage: FC = () => (
  <div>
    <Link href="/treasure">go to treasure</Link>
    <br />
    <Link href="/map">go to map</Link>
  </div>
);

export default MainPage;
