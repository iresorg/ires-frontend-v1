/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { UseFormRegisterReturn, useWatch } from "react-hook-form";

interface Option {
    value: string;
    label: string;
}

interface CustomSelectProps {
    options: Option[];
    placeholder?: string;
    register: UseFormRegisterReturn;
    error?: string;
    className?: string;
    label?: string;
    labelClassName?: string;
    control?: any;
}

export default function CustomSelect({
    options,
    placeholder = "Select an option",
    register,
    error,
    className = "",
    label,
    labelClassName = "",
    control,
}: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Watch the form value to keep it in sync
    // Always call useWatch (hooks must be called unconditionally)
    // Always call useWatch unconditionally; pass undefined control if not provided
    const watchedValue = useWatch({ control, name: register.name });
    const [selectedValue, setSelectedValue] = useState<string>(
        watchedValue ? String(watchedValue) : ""
    );

    // Sync with form value when it changes externally
    useEffect(() => {
        if (watchedValue !== undefined) {
            setSelectedValue(watchedValue || "");
        }
    }, [watchedValue]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const handleSelect = (value: string) => {
        setSelectedValue(value);
        register.onChange({ target: { value, name: register.name } });
        setIsOpen(false);
    };

    const selectedOption = options.find((opt) => opt.value === selectedValue);

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            {label && (
                <label
                    className={`block text-gray-500 text-[10px] mt-2 mb-2 ${labelClassName}`}
                >
                    {label}
                </label>
            )}
            <div
                className="w-full bg-gray-700/40 text-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer flex items-center justify-between"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={selectedValue ? "text-gray-200" : "text-gray-500"}>
                    {selectedOption?.label || placeholder}
                </span>
                <Image
                    src="/images/drop_down.svg"
                    alt="Arrow Dropdown"
                    width={20}
                    height={20}
                    className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
            </div>
            <input type="hidden" {...register} value={selectedValue} />
            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-gray-700 rounded-lg overflow-hidden z-20 max-h-48 overflow-y-auto border border-gray-600">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            onClick={() => handleSelect(option.value)}
                            className={`px-4 py-2 hover:bg-gray-600 cursor-pointer text-sm ${selectedValue === option.value ? "bg-gray-600" : ""
                                } ${option.value ? "text-gray-200" : "text-gray-500"}`}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
            {error && (
                <p className="text-red-500 text-[10px] mt-1">{error}</p>
            )}
        </div>
    );
}

