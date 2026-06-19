import React, { useEffect, useState } from 'react';
import { reactIcons } from '@utils/icons';
import {
  WalletAddressTronwithPercentValidation,
  WalletAddresswithPercentValidation,
  WalletvalidateData,
} from '@utils/validation';
import { toast } from 'sonner';
import { postReq, showErrorMessage } from '@utils/apiHandlers';


interface AddressItem {
  id: number;
  address: string;
  percent: number;
}

interface AddressModalProps {
  setOpen: (open: boolean) => void;
  singleNetwork: {
    addresses?: Array<{ networkId?: string; address: string; percent: number }>;
    type?: string;
    id?: string | number;
    name?: string;
  };
  setSingleNetwork: React.Dispatch<React.SetStateAction<any>>;
  refreshFunction: () => void;
}

const AddressModal: React.FC<AddressModalProps> = ({
  setOpen,
  singleNetwork,
  setSingleNetwork,
  refreshFunction,
}) => {
  const [addresses, setAddresses] = useState<AddressItem[]>([
    { id: Date.now(), address: '', percent: 100 },
  ]);
  const [errors, setErrors] = useState<any[]>([]);

  useEffect(() => {
    if (singleNetwork?.addresses && singleNetwork.addresses.length > 0) {
      const updatedAddresses = singleNetwork.addresses.map((item, index) => {
        const { networkId, ...rest } = item;
        return {
          ...rest,
          id: index + 1,
        };
      }) as AddressItem[];
      setAddresses(updatedAddresses);
      setSingleNetwork((prev: any) => ({
        ...prev,
        addresses: updatedAddresses,
      }));
    }
    //eslint-disable-next-line
  }, []);

  const handleChange = (index: number, field: 'address' | 'percent', newValue: any) => {
    const updated = [...addresses];
    updated[index] = {
      ...updated[index],
      [field]: field === 'percent' ? parseFloat(newValue) : newValue,
    };
    setAddresses(updated);
    setErrors((prevErrors) => {
      const newErrors = [...(prevErrors || [])];
      if (newErrors[index]) {
        newErrors[index] = { ...newErrors[index], [field]: undefined };
        if (!newErrors[index].address && !newErrors[index].percent) {
          newErrors[index] = undefined;
        }
      }
      return newErrors;
    });
  };

  const handleAdd = () => {
    setAddresses([...addresses, { id: Date.now(), address: '', percent: 0 }]);
  };

  const handleRemove = (id: number) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  const totalPercent = addresses.reduce(
    (sum, addr) => sum + Number(addr.percent || 0),
    0,
  );

  const validateAndSubmitForm = async () => {
    const data = { addresses };
    const [valid, error] = await WalletvalidateData(
      singleNetwork?.type === 'Tron'
        ? WalletAddressTronwithPercentValidation
        : WalletAddresswithPercentValidation,
      data,
    );
    if (error) {
      console.log(error, 'error');
      if (Array.isArray(error)) {
        setErrors(error);
        return;
      }
      const newErrors: any[] = [];
      if (error.inner && Array.isArray(error.inner)) {
        error.inner.forEach((e: any) => {
          const match = e.path?.match(/addresses\[(\d+)\]\.(\w+)/);
          if (match) {
            const [, idx, field] = match;
            const index = parseInt(idx);
            newErrors[index] = {
              ...(newErrors[index] || {}),
              [field]: e.message,
            };
          }
        });
        setErrors(newErrors);
      } else {
        showErrorMessage(error.message || 'Validation failed');
      }
      return;
    }
    if (valid) {
      const total = addresses.reduce(
        (sum, a) => sum + Number(a.percent || 0),
        0,
      );
      if (total !== 100) {
        toast.error(`Total percentage must be 100%, currently ${total}%`);
        return;
      }
      const payload = {
        networkId: singleNetwork?.id,
        wallets: addresses.map(({ id, ...rest }) => rest),
      };
      const response = await postReq('/merchant/me/wallets', payload);
      if (response.status) {
        refreshFunction();
        toast.success('Wallets added successfully !');
        setAddresses([{ id: Date.now(), address: '', percent: 100 }]);
        setOpen(false);
      } else {
        showErrorMessage(response?.error?.message);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center overflow-auto">
      <div className="relative bg-[#1e1e1e] border border-[#333] rounded-lg shadow-lg p-6 w-[95%] max-w-2xl text-white">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-[-12px] right-[-12px] h-7 w-7 flex items-center justify-center text-lg border border-[#EE0000] rounded-full bg-primary-100 font-bold hover:bg-red-700 transition cursor-pointer"
        >
          ×
        </button>
        <h2 className="text-lg font-bold mb-4">
          Setting Up Address {singleNetwork?.name}
        </h2>
        <p className="text-sm font-semibold mb-6 text-gray-300">
          ⓘ This must be the wallet address where you wish to receive your
          customers payments.
        </p>
        <div className="max-h-[250px] overflow-x-auto mb-4">
          {addresses.map((item, index) => (
            <React.Fragment key={item.id}>
              <div className="mt-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder={`Address ${index + 1}`}
                      value={item.address}
                      onChange={(e) =>
                        handleChange(index, 'address', e.target.value)
                      }
                      className="w-full bg-black text-white p-2 rounded border border-gray-600"
                    />
                  </div>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="bg-red-600 hover:bg-red-700 disabled:bg-gray-500 p-2 rounded cursor-pointer border-none text-white"
                    title="Remove"
                    disabled={addresses.length === 1}
                  >
                    {reactIcons?.delete || 'Delete'}
                  </button>
                  <div className="w-[70px]">
                    <input
                      type="number"
                      value={item.percent}
                      onChange={(e) =>
                        handleChange(index, 'percent', e.target.value)
                      }
                      className="w-full bg-black text-white p-2 rounded border border-gray-600 text-right"
                    />
                  </div>
                </div>
              </div>
              {errors[index]?.address && (
                <p className="text-red-600 text-14 mt-1">
                  {errors[index].address}
                </p>
              )}
              {errors[index]?.percent && (
                <p className="text-red-600 text-14 mt-1">
                  {errors[index].percent}
                </p>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm font-semibold mb-4">
          <button
            onClick={handleAdd}
            type="button"
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded cursor-pointer border-none text-white"
          >
            + Add Another
          </button>
          <span
            className={`${totalPercent === 100 ? 'text-green-500' : 'text-[#EE0000]'}`}
          >
            Total: {totalPercent.toFixed(2)}%
          </span>
        </div>

        <button
          onClick={validateAndSubmitForm}
          type="button"
          className="w-full bg-[#EE0000] text-white font-bold py-2 rounded cursor-pointer border-none"
        >
          Save
        </button>

        <div className="text-[#EE0000] text-xs mt-6 leading-4">
          <p className="mb-2 text-14 ">
            Please be aware if you set more than one address, the minimum
            transaction amount will grow according to the number of addresses
            set.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
