"use server";

import postImageTreasure from "./postImageTreasure";

const postImagesTreasure = async ({
  formDataList,
}: {
  formDataList: FormData[];
}) => {
  const fnList = formDataList.map((formData) =>
    postImageTreasure({ formData })
  );

  const res = await Promise.all(fnList);

  return res;
};

export default postImagesTreasure;
