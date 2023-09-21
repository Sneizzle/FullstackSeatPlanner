"use client";

import React from "react";
import { RecoilRoot } from "recoil";

interface recoilRootWrapperPropInterface {
  children: React.ReactNode;
}

function RecoilRootWrapper({ children }: recoilRootWrapperPropInterface) {
  return <RecoilRoot>{children}</RecoilRoot>;
}

export default RecoilRootWrapper;
