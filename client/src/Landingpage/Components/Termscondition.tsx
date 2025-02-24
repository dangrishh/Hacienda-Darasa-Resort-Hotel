import { useState } from "react";
import "../Components/Termsmodal.css";

const TermsModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal">
            <div className="modal-header">
              <div className="text-2xl">Notice!</div>
            </div>
            <div className="p-4">
              <p className="font-bold">Terms & Condition</p>
              <div className="terms-box relative">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                <button
                  className="absolute bottom-1 right-1 bg-white border p-1 text-xs cursor-pointer"
                  onClick={() => setIsFullscreen(true)}
                >
                  ⛶
                </button>
              </div>
              <div className="flex items-center justify-center mt-4">
                <input
                  type="checkbox"
                  className="w-5 h-5 mr-2"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                />
                <label>Accept terms & Condition</label>
              </div>
              <p className="text-red-600 font-bold my-2">NO REFUND</p>
              <div className="buttons">
                <button className="proceed" disabled={!isChecked}>
                  PROCEED
                </button>
                <button className="cancel" onClick={() => setIsOpen(false)}>
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isFullscreen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center">
          <div className="bg-white w-4/5 h-4/5 p-6 overflow-y-auto relative">
            <button
              className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1"
              onClick={() => setIsFullscreen(false)}
            >
              ✖
            </button>
            <p className="font-bold">Terms & Condition</p>
            <p className="mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default TermsModal;
