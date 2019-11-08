import React, { useEffect } from "react";
import { useRouter } from "next/router";

export default () => {
  const router = useRouter();
  useEffect(() => {
    console.log(router);
  });
  return <div>test</div>;
};
