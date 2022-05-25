import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AllMerchants,
  fetchMerchants,
} from "../../features/merchants/merchantsSlice";

const MerchantOptions = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (true) {
      dispatch(fetchMerchants());
    }
  }, [dispatch]);
  const merchants = useSelector(AllMerchants);

  return (
    <>
      {merchants.map((merchant) => {
        return (
          <option key={merchant.id} value={merchant.id}>
            {merchant.merchant}
          </option>
        );
      })}
    </>
  );
};

export default MerchantOptions;
