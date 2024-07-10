import { FC, useCallback, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import Lottie from "@src/components/lottie/Lottie";
import deleteTreasure from "@src/api/treasure/deleteTreasure";
import ModalCheck from "@src/components/modal/ModalCheck";
import shakingTrashcanSrc from "@src/assets/lottie/shaking_trashcan.json";
import TrashcanIcon from "@src/components/icons/TrashcanIcon";

import STYLE from "./treasure.detail.header.option.module.scss";

const TreasureDetailHeaderOptionDeleteButton: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const { replace } = useRouter();

  const { treasure_id } = useParams();

  const { mutate } = useMutation({
    mutationFn: deleteTreasure,
    onSuccess: () => {
      closeModal();
      replace("/treasure");
    },
  });

  const onConfirmClick = useCallback(() => {
    if (typeof treasure_id !== "string") return;
    mutate({ treasure_id });
  }, [mutate, treasure_id]);

  return (
    <>
      <button className={STYLE.__header_option_button} onClick={openModal}>
        <TrashcanIcon width="16px" height="16px" />
      </button>

      <ModalCheck
        isOpen={isModalOpen}
        onClose={closeModal}
        title="보물을 정말 삭제하시겠어요?"
        noticeText="삭제하셔도 현상금은 돌려받기 어려워요."
        buttons={[
          { text: "네", variant: "common", onClick: onConfirmClick },
          { text: "아니요", variant: "cancel", onClick: closeModal },
        ]}
      >
        <Lottie animationData={shakingTrashcanSrc} width="80px" height="80px" />
      </ModalCheck>
    </>
  );
};

export default TreasureDetailHeaderOptionDeleteButton;
