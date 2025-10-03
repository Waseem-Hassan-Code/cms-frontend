import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../redux/store";
import { getFeeTypes } from "../../redux/fee-details/fee-detail-thunk";
import type { FeeDetailsDto } from "../../models/fee-details";

interface FeeTypesContextValue {
  feeTypes: FeeDetailsDto[];
  loading: boolean;
  error: string | null;
  refreshFeeTypes: () => void;
}

const FeeTypesContext = createContext<FeeTypesContextValue | undefined>(
  undefined
);

interface FeeTypesProviderProps {
  children: ReactNode;
}

export const FeeTypesProvider: React.FC<FeeTypesProviderProps> = ({
  children,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { feeDetails, loading, error } = useSelector(
    (state: RootState) => state.feeDetails
  );
  const [isInitialized, setIsInitialized] = useState(false);

  const refreshFeeTypes = () => {
    dispatch(getFeeTypes());
  };

  useEffect(() => {
    if (
      !isInitialized &&
      (!feeDetails || feeDetails.length === 0) &&
      !loading
    ) {
      dispatch(getFeeTypes());
      setIsInitialized(true);
    }
  }, [dispatch, feeDetails, loading, isInitialized]);

  const value: FeeTypesContextValue = {
    feeTypes: feeDetails || [],
    loading,
    error,
    refreshFeeTypes,
  };

  return (
    <FeeTypesContext.Provider value={value}>
      {children}
    </FeeTypesContext.Provider>
  );
};

export const useFeeTypes = (): FeeTypesContextValue => {
  const context = useContext(FeeTypesContext);
  if (context === undefined) {
    throw new Error("useFeeTypes must be used within a FeeTypesProvider");
  }
  return context;
};

export default FeeTypesContext;
