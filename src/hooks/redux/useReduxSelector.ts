import { RootState } from "@src/libs/redux";
import { useSelector } from "react-redux";

const useReduxSelector = useSelector.withTypes<RootState>();

export default useReduxSelector;
