import { AppDispatch } from "@src/libs/redux";
import { useDispatch } from "react-redux";

const useReduxDispatch = useDispatch.withTypes<AppDispatch>();

export default useReduxDispatch;
