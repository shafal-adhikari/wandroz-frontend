import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";

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
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className={`relative z-10 ${className}`}
          onClose={!staticBackdrop ? closeModal : () => {}}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            leave="none"
            enterTo="opacity-100"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                leave="none"
                enterTo="opacity-100 scale-100"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  {title && (
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-medium leading-6 text-slate-800 py-4"
                    >
                      {title}
                    </Dialog.Title>
                  )}
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
