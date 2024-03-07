import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";
import { Icon } from "@iconify/react";
export default function Modal({
  isOpen,
  closeModal,
  staticBackdrop,
  children,
  title,
  className,
}: {
  isOpen: boolean;
  title?: string;
  closeModal: () => void;
  staticBackdrop?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className={`relative z-20`}
        onClose={!staticBackdrop ? closeModal : () => {}}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          leave="ease-out duration-50"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          enterTo="opacity-100"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div
            className={`flex min-h-full items-center justify-center ${className} text-center`}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              leave="none"
              enterTo="opacity-100 scale-100"
            >
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white px-4 py-2 text-left align-middle shadow-xl transition-all">
                {title && (
                  <Dialog.Title className="text-xl w-full font-medium leading-6 text-slate-800 py-4 border-bottom-1 flex justify-between items-center">
                    {title}
                    <Icon
                      icon="heroicons:x-circle-solid"
                      className="text-3xl text-slate-500 justify-self-end self-end cursor-pointer"
                      onClick={closeModal}
                    />
                  </Dialog.Title>
                )}
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
