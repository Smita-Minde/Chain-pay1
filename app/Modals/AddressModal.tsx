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
    <div className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative bg-white/75 border border-white/50 rounded-[28px] shadow-2xl p-6 md:p-8 w-full max-w-2xl text-slate-800 backdrop-blur-xl animate-in fade-in zoom-in duration-200">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 h-8 w-8 flex items-center justify-center text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition duration-200 cursor-pointer border-none text-lg font-semibold"
          title="Close"
        >
          &times;
        </button>
        <h2 className="text-xl font-extrabold text-slate-900 mb-2">
          Setting Up Address {singleNetwork?.name}
        </h2>
        <p className="text-slate-500 text-sm font-medium mb-6 leading-relaxed">
          ⓘ This must be the wallet address where you wish to receive your
          customers payments.
        </p>
        <div className="max-h-[250px] overflow-y-auto mb-6 pr-1 space-y-3">
          {addresses.map((item, index) => (
            <React.Fragment key={item.id}>
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder={`Address ${index + 1}`}
                      value={item.address}
                      onChange={(e) =>
                        handleChange(index, 'address', e.target.value)
                      }
                      className="w-full h-11 bg-white/80 border border-slate-200 rounded-xl px-4 text-sm text-slate-800 outline-none focus:border-blue-500 focus:bg-white transition duration-200"
                    />
                  </div>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="h-11 px-3 flex items-center justify-center bg-rose-50 hover:bg-rose-100 text-rose-600 disabled:bg-slate-100 disabled:text-slate-400 rounded-xl cursor-pointer border border-rose-100/30 disabled:border-slate-200/50 transition duration-200"
                    title="Remove"
                    disabled={addresses.length === 1}
                  >
                    {reactIcons?.delete || 'Delete'}
                  </button>
                  <div className="w-[85px]">
                    <input
                      type="number"
                      value={item.percent}
                      onChange={(e) =>
                        handleChange(index, 'percent', e.target.value)
                      }
                      className="w-full h-11 bg-white/80 border border-slate-200 rounded-xl px-3 text-sm text-slate-800 outline-none focus:border-blue-500 focus:bg-white text-right font-semibold transition duration-200"
                    />
                  </div>
                </div>
              </div>
              {errors[index]?.address && (
                <p className="text-rose-500 text-xs font-semibold mt-1 px-1">
                  {errors[index].address}
                </p>
              )}
              {errors[index]?.percent && (
                <p className="text-rose-500 text-xs font-semibold mt-1 px-1">
                  {errors[index].percent}
                </p>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm font-semibold mb-6">
          <button
            onClick={handleAdd}
            type="button"
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition duration-200 cursor-pointer border-none"
          >
            + Add Another
          </button>
          <span
            className={`text-sm font-bold ${totalPercent === 100 ? 'text-green-600' : 'text-rose-600'}`}
          >
            Total: {totalPercent.toFixed(2)}%
          </span>
        </div>

        <button
          onClick={validateAndSubmitForm}
          type="button"
          className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition duration-200 cursor-pointer border-none shadow-md shadow-blue-500/10 text-sm uppercase tracking-wider"
        >
          Save
        </button>

        <div className="text-rose-600 text-xs bg-rose-50/50 border border-rose-100/50 rounded-2xl p-4 mt-6 leading-relaxed">
          <p className="font-semibold text-rose-700 mb-1">Important Notice</p>
          <p>
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
