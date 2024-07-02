"use server";

import postImageTmp from "./postImageTmp";

const postImagesTmp = async ({
  formDataList,
}: {
  formDataList: FormData[];
}) => {
  const fnList = formDataList.map((formData) => postImageTmp({ formData }));

  const res = await Promise.all(fnList);

  return res;
};

export default postImagesTmp;
