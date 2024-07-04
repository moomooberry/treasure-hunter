import dynamic from "next/dynamic";

const TreasureFormStepPosition = dynamic(
  () => import("./TreasureFormStepPosition"),
  {
    ssr: false,
  }
);
const TreasureFormStepImage = dynamic(() => import("./TreasureFormStepImage"));

const TreasureFormStepInfo = dynamic(() => import("./TreasureFormStepInfo"));

const TreasureFormStepPayment = dynamic(
  () => import("./TreasureFormStepPayment"),
  { ssr: false }
);

interface ITreasureFormStep {
  Position: typeof TreasureFormStepPosition;
  Image: typeof TreasureFormStepImage;
  Info: typeof TreasureFormStepInfo;
  Payment: typeof TreasureFormStepPayment;
}

const TreasureFormStep: ITreasureFormStep = {
  Position: TreasureFormStepPosition,
  Image: TreasureFormStepImage,
  Info: TreasureFormStepInfo,
  Payment: TreasureFormStepPayment,
};

export default TreasureFormStep;
