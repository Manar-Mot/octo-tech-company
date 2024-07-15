import { useState } from "react";
import Link from "next/link";
import ClickOutside from "../Sidebar/ClickOutside";
import { HiOutlineBell } from "react-icons/hi2";

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <li>
        <Link
          onClick={() => {
            setNotifying(false);
            setDropdownOpen(!dropdownOpen);
          }}
          href="#"
          className="relative flex p-1 bg-slate-100 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-accent "
        >
          <span
            className={`absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1 ${
              notifying === false ? "hidden" : "inline"
            }`}
          >
            <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
          </span>

          <HiOutlineBell size={24} className="text-secoundary " />
        </Link>

        {dropdownOpen && (
          <div
            className={`absolute left-0 top-11 mt-2.5 flex max-h-90 w-[350px] flex-col rounded-sm border border-slate-200 bg-white shadow-md p-6`}
          >
            <div className="px-4.5 py-3">
              <h5 className="text-sm font-medium text-bodydark2">الإشعارات</h5>
            </div>

            <ul className="flex h-auto flex-col overflow-y-auto">
              <li>
                <Link
                  className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 "
                  href="#"
                >
                  <p className="text-sm">
                    <span className="text-title ">
                      Edit your information in a swipe
                    </span>{" "}
                    Sint occaecat cupidatat non proident, sunt in culpa qui
                    officia deserunt mollit anim.
                  </p>

                  <p className="text-xs">12 May, 2025</p>
                </Link>
              </li>
              <li>
                <Link
                  className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2  "
                  href="#"
                >
                  <p className="text-sm">
                    <span className="text-title ">
                      It is a long established fact
                    </span>{" "}
                    that a reader will be distracted by the readable.
                  </p>

                  <p className="text-xs">24 Feb, 2025</p>
                </Link>
              </li>
              <li>
                <Link
                  className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 "
                  href="#"
                >
                  <p className="text-sm">
                    <span className="text-title ">
                      There are many variations
                    </span>{" "}
                    of passages of Lorem Ipsum available, but the majority have
                    suffered
                  </p>

                  <p className="text-xs">04 Jan, 2025</p>
                </Link>
              </li>
              <li>
                <Link
                  className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 "
                  href="#"
                >
                  <p className="text-sm">
                    <span className="text-title ">
                      There are many variations
                    </span>{" "}
                    of passages of Lorem Ipsum available, but the majority have
                    suffered
                  </p>

                  <p className="text-xs">01 Dec, 2024</p>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </li>
    </ClickOutside>
  );
};

export default DropdownNotification;
